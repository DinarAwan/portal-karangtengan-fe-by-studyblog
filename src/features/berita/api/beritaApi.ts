import api, { isApiReady } from '../../../api/axios';
import { fallbackBerita } from '../data/fallbackBerita';
import type {
  BeritaHomepagePlacement,
  BeritaItem,
  BeritaStatus,
} from '../types/berita';

const publicBeritaEndpoint =
  import.meta.env.VITE_PUBLIC_NEWS_ENDPOINT || '/public/berita';
const adminBeritaEndpoint =
  import.meta.env.VITE_ADMIN_NEWS_ENDPOINT || '/admin/berita';

type RawBerita = Record<string, unknown>;

const statusMap: Record<string, BeritaStatus> = {
  arsip: 'archived',
  archived: 'archived',
  draft: 'draft',
  published: 'published',
  review: 'review',
  terbit: 'published',
};

const placementMap: Record<string, BeritaHomepagePlacement> = {
  featured: 'featured',
  headline: 'featured',
  none: 'none',
  normal: 'none',
  pendukung: 'supporting',
  sorotan: 'featured',
  supporting: 'supporting',
};

const getString = (
  item: RawBerita,
  keys: string[],
  fallback = '',
): string => {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (typeof value === 'number') {
      return String(value);
    }
  }

  return fallback;
};

const getNumber = (item: RawBerita, keys: string[], fallback = 0): number => {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number(value.replace(/\./g, '').replace(',', '.'));

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return fallback;
};

const normalizeStatus = (value: string): BeritaStatus =>
  statusMap[value.toLowerCase()] ?? 'draft';

const normalizePlacement = (value: string): BeritaHomepagePlacement =>
  placementMap[value.toLowerCase()] ?? 'none';

const createSlug = (title: string, id: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || id;

const normalizeBerita = (item: RawBerita, index: number): BeritaItem => {
  const id = getString(item, ['id', 'uuid', '_id'], `berita-${index + 1}`);
  const title = getString(item, ['title', 'judul'], 'Berita Desa');
  const coverImageUrl = getString(item, [
    'coverImageUrl',
    'cover_image_url',
    'imageUrl',
    'image_url',
    'thumbnailUrl',
    'thumbnail_url',
  ]);

  return {
    id,
    title,
    slug: getString(item, ['slug'], createSlug(title, id)),
    summary: getString(item, ['summary', 'ringkasan', 'excerpt', 'description']),
    category: getString(item, ['category', 'kategori'], 'Berita'),
    author: getString(item, ['author', 'penulis'], 'Admin Desa'),
    publishedAt: getString(item, [
      'publishedAt',
      'published_at',
      'date',
      'tanggal',
      'createdAt',
      'created_at',
    ]),
    status: normalizeStatus(getString(item, ['status'], 'draft')),
    views: getNumber(item, ['views', 'view_count', 'dilihat']),
    coverImageUrl,
    coverImageAlt: getString(
      item,
      ['coverImageAlt', 'cover_image_alt', 'imageAlt', 'image_alt', 'alt'],
      title,
    ),
    homepagePlacement: normalizePlacement(
      getString(
        item,
        ['homepagePlacement', 'homepage_placement', 'placement'],
        'none',
      ),
    ),
    homepageOrder: getNumber(
      item,
      ['homepageOrder', 'homepage_order', 'sortOrder', 'sort_order', 'order'],
      index + 1,
    ),
  };
};

const unwrapBeritaList = (payload: unknown): RawBerita[] => {
  if (Array.isArray(payload)) {
    return payload.filter((item): item is RawBerita => Boolean(item));
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const objectPayload = payload as Record<string, unknown>;
  const candidates = [
    objectPayload.data,
    objectPayload.items,
    objectPayload.berita,
    objectPayload.news,
    objectPayload.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.filter((item): item is RawBerita => Boolean(item));
    }
  }

  return [];
};

const sortByPublishDate = (items: BeritaItem[]) =>
  [...items].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime(),
  );

const fetchBerita = async (endpoint: string) => {
  if (!isApiReady) {
    return sortByPublishDate(fallbackBerita);
  }

  try {
    const response = await api.get(endpoint);
    const normalized = unwrapBeritaList(response.data).map(normalizeBerita);

    return sortByPublishDate(normalized);
  } catch (error) {
    console.warn('Gagal memuat berita dari API, memakai fallback dev.', error);

    return sortByPublishDate(fallbackBerita);
  }
};

export const fetchPublicBerita = async () => {
  const berita = await fetchBerita(publicBeritaEndpoint);

  return berita.filter(
    (item) => item.status === 'published' && Boolean(item.coverImageUrl),
  );
};

export const fetchAdminBerita = () => fetchBerita(adminBeritaEndpoint);

export const selectHomepageBerita = (items: BeritaItem[]) => {
  const published = items
    .filter((item) => item.status === 'published' && Boolean(item.coverImageUrl))
    .sort((first, second) => {
      if (first.homepageOrder !== second.homepageOrder) {
        return first.homepageOrder - second.homepageOrder;
      }

      return (
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime()
      );
    });
  const featured =
    published.find((item) => item.homepagePlacement === 'featured') ??
    published[0];

  if (!featured) {
    return [];
  }

  const supporting = published
    .filter(
      (item) =>
        item.id !== featured.id && item.homepagePlacement !== 'none',
    )
    .slice(0, 4);

  return [featured, ...supporting];
};


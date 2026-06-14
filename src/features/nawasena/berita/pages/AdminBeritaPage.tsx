import type { ReactElement } from 'react';
import {
  IconCalendarEvent,
  IconChecks,
  IconClock,
  IconEdit,
  IconEye,
  IconHomeStats,
  IconNews,
  IconPencilPlus,
  IconPhoto,
  IconSearch,
  IconStar,
  IconTag,
  IconTrash,
} from '@tabler/icons-react';

import { useAdminBerita } from '../../../berita/hooks/useBerita';
import type {
  BeritaHomepagePlacement,
  BeritaStatus,
} from '../../../berita/types/berita';
import {
  formatBeritaDate,
  formatViews,
  getHomepagePlacementLabel,
  getStatusLabel,
} from '../../../berita/utils/formatBerita';

const getStatusClass = (status: BeritaStatus) => {
  if (status === 'published') {
    return 'bg-emerald-100 text-emerald-700';
  }

  if (status === 'review') {
    return 'bg-amber-100 text-amber-700';
  }

  if (status === 'archived') {
    return 'bg-neutral-200 text-neutral-600';
  }

  return 'bg-neutral-100 text-neutral-600';
};

const getPlacementClass = (placement: BeritaHomepagePlacement) => {
  if (placement === 'featured') {
    return 'border-[#f8cd24]/50 bg-[#fff8d8] text-[#8a6500]';
  }

  if (placement === 'supporting') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }

  return 'border-neutral-200 bg-neutral-50 text-neutral-500';
};

export const AdminBeritaPage = (): ReactElement => {
  const { data: articles, isLoading } = useAdminBerita();
  const publishedCount = articles.filter(
    (article) => article.status === 'published',
  ).length;
  const reviewCount = articles.filter(
    (article) => article.status === 'review',
  ).length;
  const featuredArticle = articles.find(
    (article) => article.homepagePlacement === 'featured',
  );
  const categoryCounts = articles.reduce<Record<string, number>>(
    (counts, article) => ({
      ...counts,
      [article.category]: (counts[article.category] ?? 0) + 1,
    }),
    {},
  );
  const summary = [
    {
      label: 'Total Berita',
      value: articles.length,
      icon: IconNews,
      accent: 'bg-emerald-100 text-emerald-700',
    },
    {
      label: 'Sudah Terbit',
      value: publishedCount,
      icon: IconChecks,
      accent: 'bg-lime-100 text-lime-700',
    },
    {
      label: 'Menunggu Review',
      value: reviewCount,
      icon: IconClock,
      accent: 'bg-amber-100 text-amber-700',
    },
    {
      label: 'Sorotan Beranda',
      value: featuredArticle ? 1 : 0,
      icon: IconStar,
      accent: 'bg-yellow-100 text-yellow-700',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Manajemen Konten
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-neutral-950">
              Berita Desa
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Kelola artikel, gambar cover dari API, status publikasi, dan
              kurasi card berita yang tampil di portal publik.
            </p>
          </div>

          <button
            className="inline-flex h-10 w-fit items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            type="button"
          >
            <IconPencilPlus size={18} />
            Tambah Berita
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <article
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
            key={item.label}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-neutral-950">
                  {item.value}
                </p>
              </div>
              <div
                className={`grid h-11 w-11 place-items-center rounded-md ${item.accent}`}
              >
                <item.icon size={22} />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-semibold text-neutral-950">
                Daftar Berita
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Placement menentukan artikel mana yang menjadi card lebar di
                beranda dan mana yang tampil sebagai pendukung.
              </p>
            </div>

            <label className="flex h-10 w-full items-center gap-2 rounded-md border border-neutral-200 px-3 text-sm text-neutral-500 lg:w-72">
              <IconSearch size={18} />
              <input
                className="w-full bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400"
                placeholder="Cari berita..."
                type="search"
              />
            </label>
          </div>

          {isLoading ? (
            <div className="grid gap-4 p-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="h-32 animate-pulse rounded-lg bg-neutral-100"
                  key={`admin-berita-skeleton-${index}`}
                />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {articles.map((article) => (
                <article
                  className="grid gap-4 p-5 lg:grid-cols-[168px_1fr_auto] lg:items-center"
                  key={article.id}
                >
                  {article.coverImageUrl ? (
                    <img
                      alt={article.coverImageAlt}
                      className="h-36 w-full rounded-lg object-cover lg:h-28"
                      src={article.coverImageUrl}
                    />
                  ) : (
                    <div className="grid h-36 w-full place-items-center rounded-lg bg-neutral-100 text-neutral-400 lg:h-28">
                      <IconPhoto size={26} />
                    </div>
                  )}

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <IconTag size={14} />
                        {article.category}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(article.status)}`}
                      >
                        {getStatusLabel(article.status)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${getPlacementClass(article.homepagePlacement)}`}
                      >
                        <IconHomeStats size={14} />
                        {getHomepagePlacementLabel(article.homepagePlacement)}
                      </span>
                    </div>
                    <h4 className="mt-3 max-w-2xl text-base font-semibold leading-snug text-neutral-950">
                      {article.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-neutral-600">
                      {article.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
                      <p>{article.author}</p>
                      <p className="inline-flex items-center gap-1.5">
                        <IconCalendarEvent size={16} />
                        {formatBeritaDate(article.publishedAt)}
                      </p>
                      <p className="inline-flex items-center gap-1.5">
                        <IconEye size={16} />
                        {formatViews(article.views)} dilihat
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 lg:justify-end">
                    <button
                      aria-label={`Edit ${article.title}`}
                      className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
                      type="button"
                    >
                      <IconEdit size={18} />
                    </button>
                    <button
                      aria-label={`Hapus ${article.title}`}
                      className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-red-600 transition hover:bg-red-50"
                      type="button"
                    >
                      <IconTrash size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm font-medium text-neutral-500">
              Belum ada berita dari API.
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-neutral-950">Kurasi Beranda</h3>
            {featuredArticle ? (
              <div className="mt-4 overflow-hidden rounded-lg border border-yellow-200 bg-yellow-50">
                {featuredArticle.coverImageUrl ? (
                  <img
                    alt={featuredArticle.coverImageAlt}
                    className="aspect-[16/9] w-full object-cover"
                    src={featuredArticle.coverImageUrl}
                  />
                ) : null}
                <div className="p-4">
                  <p className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-yellow-700">
                    <IconStar size={14} />
                    Card lebar beranda
                  </p>
                  <h4 className="mt-3 text-sm font-semibold leading-6 text-neutral-950">
                    {featuredArticle.title}
                  </h4>
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-lg bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
                Belum ada artikel dengan placement Sorotan Utama.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-neutral-950">Kategori Aktif</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div
                  className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2 text-neutral-700"
                  key={category}
                >
                  <span>{category}</span>
                  <span className="font-semibold text-emerald-700">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-[#101708] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#F8CD24]">
              Aturan Portal
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Beranda memakai satu Sorotan Utama untuk card lebar dan maksimal
              empat berita pendukung. Semua gambar cover berasal dari URL API.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};


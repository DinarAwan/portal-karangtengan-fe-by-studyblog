import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowRight,
  IconCalendarEvent,
  IconCategory,
  IconEye,
  IconFileCheck,
  IconLayoutGrid,
  IconPlant2,
  IconSearch,
  IconUsers,
  IconBuildingStore,
} from '@tabler/icons-react';

import { usePublicBerita } from '../hooks/useBerita';
import { formatBeritaDate, formatViews } from '../utils/formatBerita';
import { PublicBeritaCard } from '../components/PublicBeritaCard'; // Import komponen baru

const allCategory = 'Semua';

const getCategoryIcon = (category: string) => {
  const normalizedCategory = category.toLowerCase();
  if (normalizedCategory.includes('pertanian')) return IconPlant2;
  if (normalizedCategory.includes('umkm')) return IconBuildingStore;
  if (normalizedCategory.includes('kegiatan')) return IconUsers;
  if (normalizedCategory.includes('layanan')) return IconFileCheck;
  if (normalizedCategory === allCategory.toLowerCase()) return IconLayoutGrid;
  return IconCategory;
};

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x450/e9f1e2/72b841?text=Desa+Karangtengah';

export const BeritaPage = () => {
  const { data: beritaItems, isLoading } = usePublicBerita();
  const [activeCategory, setActiveCategory] = useState(allCategory);
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () => [
      allCategory,
      ...Array.from(new Set(beritaItems.map((item) => item.category || 'Umum'))),
    ],
    [beritaItems],
  );

  const filteredBerita = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return beritaItems.filter((item) => {
      const itemCategory = item.category || 'Umum';
      const itemAuthor = item.author || 'Admin';

      const matchesCategory =
        activeCategory === allCategory || itemCategory === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.excerpt, itemCategory, itemAuthor]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, beritaItems, query]);

  const featuredBerita = filteredBerita[0];
  const regularBerita = featuredBerita ? filteredBerita.slice(1) : [];

  return (
    <div className="overflow-hidden bg-[#fbfcf8] px-4 pb-20 pt-6 text-[#101708] sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_0%_24%,rgba(114,184,65,0.10)_0,rgba(114,184,65,0)_26%),radial-gradient(circle_at_100%_18%,rgba(26,58,104,0.08)_0,rgba(26,58,104,0)_24%)]" />
      <div className="mx-auto max-w-[1440px]">
        {isLoading ? (
          <div className="min-h-[430px] animate-pulse rounded-[28px] bg-[#e9f1e2] shadow-[0_18px_46px_rgba(16,23,8,0.08)]" />
        ) : featuredBerita ? (
          <section className="relative min-h-[430px] overflow-hidden rounded-[28px] bg-[#102112] shadow-[0_22px_58px_rgba(16,23,8,0.18)]">
            <img
              alt={featuredBerita.title}
              className="absolute inset-0 h-full w-full object-cover"
              src={featuredBerita.coverUrl || PLACEHOLDER_IMAGE}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,46,19,0.86)_0%,rgba(11,46,19,0.58)_44%,rgba(11,46,19,0.10)_62%,rgba(11,46,19,0.18)_100%)]" />
            <div className="absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(7,18,5,0)_0%,rgba(7,18,5,0.88)_70%,rgba(7,18,5,0.94)_100%)] lg:w-[44%]" />

            <div className="relative grid min-h-[430px] gap-8 p-6 sm:p-9 lg:grid-cols-[0.6fr_0.4fr] lg:items-center lg:p-12 xl:p-16">
              <div className="max-w-[640px] text-white">
                <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8ee70]">
                  <span className="h-7 w-1 rounded-full bg-[#72b841]" />
                  Berita Desa
                </p>
                <h1 className="mt-7 text-4xl font-extrabold leading-[1.05] tracking-[0px] text-white sm:text-5xl lg:text-[58px]">
                  Kabar terbaru
                  <br />
                  Karang Tengah
                </h1>
                <p className="mt-5 max-w-[560px] text-sm font-medium leading-7 text-white/86 sm:text-base">
                  Informasi resmi seputar pemerintahan, layanan warga,
                  pertanian, UMKM, dan kegiatan desa yang sudah dipublikasikan.
                </p>

                <label className="mt-7 flex h-14 w-full max-w-[460px] items-center gap-3 rounded-full border border-white/70 bg-white px-5 text-sm text-[#687063] shadow-[0_18px_34px_rgba(16,23,8,0.16)] focus-within:ring-4 focus-within:ring-[#72b841]/24">
                  <IconSearch className="shrink-0 text-[#72b841]" size={21} />
                  <input
                    className="h-full w-full bg-transparent text-[#212529] outline-none placeholder:text-[#87907f]"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Cari judul, kategori, atau penulis"
                    type="search"
                    value={query}
                  />
                </label>
              </div>

              <article className="relative overflow-hidden rounded-[24px] border border-white/16 bg-white/[0.13] p-6 text-white shadow-[0_20px_54px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">
                <span className="absolute bottom-8 left-0 top-16 w-1 rounded-r-full bg-[#72b841]" />
                <p className="w-fit rounded-full bg-[#72b841]/78 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#efffdc]">
                  {featuredBerita.category || 'Umum'}
                </p>
                <h2 className="mt-5 text-2xl font-extrabold leading-tight sm:text-[30px]">
                  {featuredBerita.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/82">
                  {featuredBerita.excerpt || 'Belum ada ringkasan.'}
                </p>

                <div className="mt-5 h-px bg-white/14" />

                <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium text-white/84">
                  <span className="inline-flex items-center gap-2">
                    <IconCalendarEvent size={18} />
                    {formatBeritaDate(featuredBerita.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <IconEye size={18} />
                    {formatViews(featuredBerita.views || 0)} dilihat
                  </span>
                </div>

                {/* Diubah menjadi komponen Link yang mengarah ke slug */}
                <Link
                  to={`/berita/${featuredBerita.slug}`}
                  className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#72b841] px-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(114,184,65,0.26)] transition hover:bg-[#62a23a]"
                >
                  Baca Berita
                  <IconArrowRight size={18} />
                </Link>
              </article>
            </div>
          </section>
        ) : (
          <section className="rounded-[28px] border border-dashed border-[#bdd9a8] bg-white px-6 py-16 text-center shadow-[0_16px_40px_rgba(16,23,8,0.06)]">
            <p className="text-sm font-semibold text-[#4f842f]">
              Belum ada berita yang cocok dengan pencarian ini.
            </p>
          </section>
        )}

        <div className="mt-7 flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            const CategoryIcon = getCategoryIcon(category);

            return (
              <button
                className={[
                  'inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-bold shadow-[0_8px_18px_rgba(16,23,8,0.05)] transition',
                  isActive
                    ? 'border-[#72b841] bg-[#72b841] text-white'
                    : 'border-[#e1e8dc] bg-white text-[#3d453b] hover:border-[#72b841] hover:text-[#4f842f]',
                ].join(' ')}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                <CategoryIcon size={18} stroke={1.9} />
                {category}
              </button>
            );
          })}
        </div>

        <section className="mt-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="inline-flex items-center gap-2 text-xl font-extrabold text-[#101708]">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#72b841] text-white">
                <IconCategory size={17} stroke={2} />
              </span>
              Berita terbaru
            </h2>

            <button
              className="inline-flex h-10 w-fit items-center gap-2 rounded-full border border-[#dce9d4] bg-white px-4 text-sm font-bold text-[#4f842f] shadow-[0_8px_18px_rgba(16,23,8,0.04)] transition hover:border-[#72b841]"
              onClick={() => {
                setActiveCategory(allCategory);
                setQuery('');
              }}
              type="button"
            >
              Lihat semua berita
              <IconArrowRight size={17} />
            </button>
          </div>

          {isLoading ? (
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="min-h-[340px] animate-pulse rounded-[22px] bg-[#eef3e8]"
                  key={`berita-page-skeleton-${index}`}
                />
              ))}
            </div>
          ) : regularBerita.length > 0 ? (
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* Mapping diubah jadi memanggil PublicBeritaCard */}
              {regularBerita.map((item) => (
                <PublicBeritaCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[18px] border border-dashed border-[#bdd9a8] bg-white px-6 py-12 text-center">
              <p className="text-sm font-semibold text-[#4f842f]">
                Belum ada berita terbaru untuk filter ini.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
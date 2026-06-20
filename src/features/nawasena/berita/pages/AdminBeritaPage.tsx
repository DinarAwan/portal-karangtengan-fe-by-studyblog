import { useRef, useState, type ReactElement } from 'react';
import { IconChecks, IconClock, IconNews, IconPencilPlus, IconSearch, IconStar } from '@tabler/icons-react';

import { useAdminBerita } from '../hooks/useBerita';
import { BeritaCard } from '../components/BeritaCard';
import { BeritaModal } from '../components/BeritaModal';
import { uploadBeritaCover } from '../api/beritaApi';
import type { BeritaItem, BeritaPayload } from '../types/berita';

export const AdminBeritaPage = (): ReactElement => {
  const { 
    data: articles, 
    isLoading, 
    isMutating,
    error, 
    refetch, 
    handleCreate, 
    handleUpdate, 
    handleDelete, 
    handleTogglePublish 
  } = useAdminBerita();

  // State untuk Kontrol Modal Form Mantine
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BeritaItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadId = useRef<string | null>(null);

  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const reviewCount = articles.filter((a) => a.status === 'review').length;
  const featuredArticle = articles.find((a) => (a.homepagePlacement ?? 'none') === 'featured');

  const categoryCounts = articles.reduce<Record<string, number>>((counts, article) => {
    const cat = article.category || 'Umum';
    return { ...counts, [cat]: (counts[cat] ?? 0) + 1 };
  }, {});

  const summary = [
    { label: 'Total Berita', value: articles.length, icon: IconNews, accent: 'bg-emerald-100 text-emerald-700' },
    { label: 'Sudah Terbit', value: publishedCount, icon: IconChecks, accent: 'bg-lime-100 text-lime-700' },
    { label: 'Menunggu Review', value: reviewCount, icon: IconClock, accent: 'bg-amber-100 text-amber-700' },
    { label: 'Sorotan Beranda', value: featuredArticle ? 1 : 0, icon: IconStar, accent: 'bg-yellow-100 text-yellow-700' },
  ];

  // Handler Buka Modal untuk Tambah Data Baru
  const handleOpenCreateModal = () => {
    setEditingArticle(null); // Pastikan null agar modenya CREATE
    setIsModalOpen(true);
  };

  // Handler Buka Modal untuk Edit Data Lama
  const handleOpenEditModal = (article: BeritaItem) => {
    setEditingArticle(article); // Masukkan object artikel agar modenya EDIT
    setIsModalOpen(true);
  };

// Handler Submit Gabungan (Create / Update) dari Modal
  const handleModalSubmit = async (payload: BeritaPayload, file: File | null) => {
    if (editingArticle) {
      await handleUpdate(editingArticle.id, payload, file);
    } else {
      await handleCreate(payload, file);
    }
  };
  // Handler Upload Gambar Cover
  const triggerUploadCover = (id: string) => {
    activeUploadId.current = id;
    fileInputRef.current?.click();
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = activeUploadId.current;
    if (!file || !id) return;

    try {
      await uploadBeritaCover(id, file);
      refetch();
    } catch (error) {
      alert('Gagal upload gambar cover');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input untuk Upload Cover */}
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileSelected} />

      {/* Komponen Modal Mantine */}
      <BeritaModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingArticle}
        isSubmitting={isMutating}
      />

      {/* Header Dashboard */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Manajemen Konten</p>
            <h2 className="mt-3 text-2xl font-semibold text-neutral-950">Berita Desa</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Kelola artikel, gambar cover dari API, status publikasi, dan kurasi card berita yang tampil di portal publik.
            </p>
          </div>
          <button 
            onClick={handleOpenCreateModal}
            className="inline-flex h-10 w-fit items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <IconPencilPlus size={18} /> Tambah Berita
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" key={item.label}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-600">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-neutral-950">{item.value}</p>
              </div>
              <div className={`grid h-11 w-11 place-items-center rounded-md ${item.accent}`}><item.icon size={22} /></div>
            </div>
          </article>
        ))}
      </section>

      {/* Main Content Layout */}
      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-semibold text-neutral-950">Daftar Berita</h3>
              <p className="mt-1 text-sm text-neutral-600">Placement menentukan artikel mana yang tampil di beranda.</p>
            </div>
            <label className="flex h-10 w-full items-center gap-2 rounded-md border border-neutral-200 px-3 text-sm text-neutral-500 lg:w-72">
              <IconSearch size={18} />
              <input className="w-full bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400" placeholder="Cari berita..." type="search" />
            </label>
          </div>

          {isLoading ? (
            <div className="grid gap-4 p-5">
              {Array.from({ length: 4 }).map((_, idx) => <div className="h-32 animate-pulse rounded-lg bg-neutral-100" key={idx} />)}
            </div>
          ) : error ? (
            <div className="p-8 text-center text-sm font-medium text-red-500">{error}</div>
          ) : articles.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {articles.map((article) => (
                <BeritaCard 
                  key={article.id} 
                  article={article} 
                  onDelete={handleDelete}
                  onEdit={handleOpenEditModal}
                  onTogglePublish={handleTogglePublish}
                  onUploadCover={triggerUploadCover}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm font-medium text-neutral-500">Belum ada berita dari API.</div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-neutral-950">Kurasi Beranda</h3>
            {featuredArticle ? (
              <div className="mt-4 overflow-hidden rounded-lg border border-yellow-200 bg-yellow-50">
                {featuredArticle.coverUrl && <img alt={featuredArticle.title} className="aspect-[16/9] w-full object-cover" src={featuredArticle.coverUrl} />}
                <div className="p-4">
                  <p className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-yellow-700"><IconStar size={14} /> Sorotan Utama</p>
                  <h4 className="mt-3 text-sm font-semibold leading-6 text-neutral-950">{featuredArticle.title}</h4>
                </div>
              </div>
            ) : <p className="mt-4 rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">Belum ada Sorotan Utama.</p>}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-neutral-950">Kategori Aktif</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2 text-neutral-700" key={category}>
                  <span>{category}</span>
                  <span className="font-semibold text-emerald-700">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
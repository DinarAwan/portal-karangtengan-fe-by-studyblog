import { useRef, useState, type ReactElement } from 'react';
import { IconBuildingStore, IconPencilPlus, IconSearch, IconShoppingCart } from '@tabler/icons-react';

import { useAdminUmkm } from '../hooks/useUmkm';
import { UmkmCard } from '../components/UmkmCard';
import { UmkmModal } from '../components/UmkmModal';
import { uploadUmkmCover } from '../api/umkmApi';
import type { UmkmItem, UmkmPayload } from '../types/umkm';

export const AdminUmkmPage = (): ReactElement => {
  const { data: umkms, isLoading, isMutating, error, refetch, handleCreate, handleUpdate, handleDelete, handleTogglePublish } = useAdminUmkm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UmkmItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadId = useRef<string | null>(null);

  const publishedCount = umkms.filter((u) => u.status === 'published').length;
  const foodCount = umkms.filter((u) => u.category.toLowerCase() === 'makanan').length;
  
  // Total semua produk dari seluruh UMKM
  const totalProducts = umkms.reduce((sum, umkm) => sum + (umkm.products?.length || 0), 0);

  const summary = [
    { label: 'Total UMKM', value: umkms.length, icon: IconBuildingStore, accent: 'bg-emerald-100 text-emerald-700' },
    { label: 'Aktif / Published', value: publishedCount, icon: IconBuildingStore, accent: 'bg-blue-100 text-blue-700' },
    { label: 'Total Produk', value: totalProducts, icon: IconShoppingCart, accent: 'bg-amber-100 text-amber-700' },
    { label: 'UMKM Makanan', value: foodCount, icon: IconBuildingStore, accent: 'bg-orange-100 text-orange-700' },
  ];

  const handleOpenCreateModal = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleOpenEditModal = (item: UmkmItem) => { setEditingItem(item); setIsModalOpen(true); };

  const handleModalSubmit = async (payload: UmkmPayload, file: File | null) => {
    if (editingItem) await handleUpdate(editingItem.id, payload, file);
    else await handleCreate(payload, file);
  };

  const triggerUploadCover = (id: string) => {
    activeUploadId.current = id;
    fileInputRef.current?.click();
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = activeUploadId.current;
    if (!file || !id) return;
    try {
      await uploadUmkmCover(id, file);
      refetch();
    } catch (error) { alert('Gagal upload gambar'); } 
    finally { if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileSelected} />

      <UmkmModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} initialData={editingItem} isSubmitting={isMutating} />

      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Potensi Desa</p>
            <h2 className="mt-3 text-2xl font-semibold text-neutral-950">Data UMKM</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Kelola direktori UMKM lokal beserta katalog produk yang ditawarkan untuk dipromosikan di portal publik.
            </p>
          </div>
          <button onClick={handleOpenCreateModal} className="inline-flex h-10 w-fit items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800">
            <IconPencilPlus size={18} /> Daftar UMKM Baru
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" key={item.label}>
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-sm font-medium text-neutral-600">{item.label}</p><p className="mt-2 text-3xl font-semibold text-neutral-950">{item.value}</p></div>
              <div className={`grid h-11 w-11 place-items-center rounded-md ${item.accent}`}><item.icon size={22} /></div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold text-neutral-950">Direktori UMKM</h3>
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-md border border-neutral-200 px-3 text-sm text-neutral-500 lg:w-72">
            <IconSearch size={18} />
            <input className="w-full bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400" placeholder="Cari nama UMKM..." type="search" />
          </label>
        </div>

        {isLoading ? (
          <div className="grid gap-4 p-5">
            {Array.from({ length: 3 }).map((_, idx) => <div className="h-32 animate-pulse rounded-lg bg-neutral-100" key={idx} />)}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-sm font-medium text-red-500">{error}</div>
        ) : umkms.length > 0 ? (
          <div className="divide-y divide-neutral-200">
            {umkms.map((item) => (
              <UmkmCard key={item.id} item={item} onDelete={handleDelete} onEdit={handleOpenEditModal} onTogglePublish={handleTogglePublish} onUploadCover={triggerUploadCover} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm font-medium text-neutral-500">Belum ada UMKM yang terdaftar.</div>
        )}
      </section>
    </div>
  );
};
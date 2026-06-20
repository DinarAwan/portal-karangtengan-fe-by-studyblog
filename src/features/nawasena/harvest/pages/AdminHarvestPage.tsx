import { useState, type ReactElement } from 'react';
import { IconLeaf, IconPencilPlus, IconReportAnalytics, IconScale, IconSearch } from '@tabler/icons-react';

import { useAdminHarvest } from '../hooks/useHarvest';
import { HarvestTable } from '../components/HarvestTable';
import { HarvestModal } from '../components/HarvestModal';
import type { HarvestItem, HarvestPayload } from '../types/harvest';
import { formatDecimal } from '../utils/formatHarvest';

export const AdminHarvestPage = (): ReactElement => {
  const { data: harvests, isLoading, isMutating, error, handleCreate, handleUpdate, handleDelete } = useAdminHarvest();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HarvestItem | null>(null);

  // Kalkulasi Summary
  const totalArea = harvests.reduce((sum, item) => sum + item.areaHa, 0);
  const totalEstimatedHarvest = harvests.reduce((sum, item) => sum + item.estimatedKg, 0);

  const summary = [
    { label: 'Total Laporan', value: harvests.length, icon: IconReportAnalytics, accent: 'bg-blue-100 text-blue-700' },
    { label: 'Total Lahan Panen', value: `${formatDecimal(totalArea)} Ha`, icon: IconLeaf, accent: 'bg-emerald-100 text-emerald-700' },
    { label: 'Total Estimasi Panen', value: `${formatDecimal(totalEstimatedHarvest)} Kg`, icon: IconScale, accent: 'bg-amber-100 text-amber-700' },
  ];

  const handleOpenCreateModal = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleOpenEditModal = (item: HarvestItem) => { setEditingItem(item); setIsModalOpen(true); };

  const handleModalSubmit = async (payload: HarvestPayload) => {
    if (editingItem) await handleUpdate(editingItem.id, payload);
    else await handleCreate(payload);
  };

  return (
    <div className="space-y-6">
      <HarvestModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} initialData={editingItem} isSubmitting={isMutating} />

      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Pertanian Desa</p>
            <h2 className="mt-3 text-2xl font-semibold text-neutral-950">Laporan Panen (Harvest)</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Catat data hasil ubinan, kalkulasi hasil panen riil, dan tingkat kerugian akibat hama untuk bahan evaluasi ketahanan pangan.
            </p>
          </div>
          <button onClick={handleOpenCreateModal} className="inline-flex h-10 w-fit items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800">
            <IconPencilPlus size={18} /> Input Data Panen
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summary.map((item) => (
          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" key={item.label}>
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-sm font-medium text-neutral-600">{item.label}</p><p className="mt-2 text-3xl font-semibold text-neutral-950">{item.value}</p></div>
              <div className={`grid h-11 w-11 place-items-center rounded-md ${item.accent}`}><item.icon size={22} /></div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold text-neutral-950">Data Pengukuran Panen</h3>
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-md border border-neutral-200 px-3 text-sm text-neutral-500 lg:w-72">
            <IconSearch size={18} />
            <input className="w-full bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400" placeholder="Cari laporan..." type="search" />
          </label>
        </div>

        <div className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm font-medium text-neutral-500">Memuat data panen...</div>
          ) : error ? (
            <div className="p-8 text-center text-sm font-medium text-red-500">{error}</div>
          ) : harvests.length > 0 ? (
            <HarvestTable items={harvests} onDelete={handleDelete} onEdit={handleOpenEditModal} />
          ) : (
            <div className="p-8 text-center text-sm font-medium text-neutral-500">Belum ada laporan panen yang tercatat.</div>
          )}
        </div>
      </section>
    </div>
  );
};
import { useState, type ReactElement } from 'react';
import { IconBuildingCommunity, IconPhotoPlus, IconTrash } from '@tabler/icons-react';

import { useAdminVillage } from '../hooks/useVillage';
import { VillageProfileForm } from '../components/VillageProfileForm';
import { GalleryModal } from '../components/GalleryModal';

export const AdminVillagePage = (): ReactElement => {
  const { data, isLoading, isMutating, error, handleUpdateProfile, handleAddGallery, handleDeleteGallery } = useAdminVillage();
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center text-emerald-700 font-medium animate-pulse">Memuat profil desa...</div>;
  }

  if (error || !data) {
    return <div className="p-8 text-center text-sm font-medium text-red-500">{error || 'Data profil desa tidak ditemukan.'}</div>;
  }

  return (
    <div className="space-y-6">
      <GalleryModal 
        opened={isGalleryModalOpen} 
        onClose={() => setIsGalleryModalOpen(false)} 
        onSubmit={handleAddGallery} 
        isSubmitting={isMutating} 
      />

      {/* Header */}
      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
            <IconBuildingCommunity size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-neutral-950">Profil Desa Utama</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Ubah visi, misi, deskripsi, hingga potensi yang akan ditampilkan ke publik.
            </p>
          </div>
        </div>
      </section>

      {/* Form Profil Utama */}
      <section className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
          <h3 className="font-semibold text-neutral-900">Form Informasi Profil</h3>
        </div>
        <VillageProfileForm 
          initialData={data} 
          onSubmit={handleUpdateProfile} 
          isSubmitting={isMutating} 
        />
      </section>

      {/* Bagian Galeri */}
      <section className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-4 gap-4">
          <div>
            <h3 className="font-semibold text-neutral-900">Galeri Foto Desa</h3>
            <p className="text-sm text-neutral-500 mt-1">Kelola foto-foto yang akan muncul di *slider* atau dokumentasi halaman utama.</p>
          </div>
          <button 
            onClick={() => setIsGalleryModalOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-neutral-900 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <IconPhotoPlus size={18} /> Tambah Foto
          </button>
        </div>
        
        <div className="p-6">
          {data.gallery && data.gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery
                .sort((a, b) => a.orderIndex - b.orderIndex) // Urutkan sesuai index
                .map((img) => (
                <div key={img.id} className="group relative rounded-lg border border-neutral-200 overflow-hidden bg-white shadow-sm transition hover:shadow-md">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <img src={img.imageUrl} alt={img.caption} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-3 flex justify-between items-start gap-3">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 line-clamp-2">{img.caption}</p>
                      <p className="text-xs text-neutral-500 mt-1">Urutan Tampil: {img.orderIndex}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteGallery(img.id)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-red-500 hover:bg-red-50 transition"
                      title="Hapus Foto"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-500 text-sm bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
              Belum ada foto galeri. Silakan tambahkan.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
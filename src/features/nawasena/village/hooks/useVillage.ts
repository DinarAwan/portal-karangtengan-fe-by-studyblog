import { useCallback, useEffect, useState } from 'react';
import { 
  fetchVillageProfile, updateVillageProfile, 
  uploadGalleryImage, addGalleryItem, deleteGalleryItem 
} from '../api/villageApi';
import type { VillageItem, VillagePayload } from '../types/village';

export const useAdminVillage = () => {
  const [data, setData] = useState<VillageItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getVillage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchVillageProfile();
      if (response.success) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil data profil desa.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getVillage();
  }, [getVillage]);

  // Update Profil Desa
  const handleUpdateProfile = async (payload: VillagePayload) => {
    try {
      setIsMutating(true);
      await updateVillageProfile(payload);
      await getVillage();
      alert('Profil desa berhasil diperbarui!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal memperbarui profil.');
    } finally {
      setIsMutating(false);
    }
  };

  // Tambah Galeri (2 Step: Upload File -> Create Record)
  const handleAddGallery = async (file: File, caption: string, orderIndex: number) => {
    try {
      setIsMutating(true);
      // Step 1: Upload File
      const uploadRes = await uploadGalleryImage(file);
      
      // Asumsi backend mereturn URL gambar dari endpoint upload (misal: uploadRes.data.url)
      // Jika strukturnya berbeda, sesuaikan properti aksesnya di sini.
      const imageUrl = uploadRes.data?.url || uploadRes.imageUrl || uploadRes.url || '';

      if (!imageUrl) throw new Error('Gagal mendapatkan URL gambar dari server.');

      // Step 2: Simpan Data Galeri
      await addGalleryItem({ imageUrl, caption, orderIndex });
      await getVillage();
    } catch (err: any) {
      alert(err.message || err.response?.data?.message || 'Gagal menambahkan galeri.');
    } finally {
      setIsMutating(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Hapus foto ini dari galeri?')) return;
    try {
      setIsMutating(true);
      await deleteGalleryItem(id);
      await getVillage();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal menghapus foto galeri.');
    } finally {
      setIsMutating(false);
    }
  };

  return { 
    data, isLoading, isMutating, error, 
    handleUpdateProfile, handleAddGallery, handleDeleteGallery 
  };
};
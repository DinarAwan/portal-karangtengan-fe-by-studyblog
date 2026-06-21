import { useCallback, useEffect, useState } from 'react';
import { fetchAdminBerita, deleteAdminBerita, publishAdminBerita, createAdminBerita, updateAdminBerita, uploadBeritaCover } from '../api/beritaApi';
import type { BeritaItem, BeritaPayload } from '../types/berita';

export const useAdminBerita = () => {
  const [data, setData] = useState<BeritaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBerita = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchAdminBerita();
      if (response.success) {
        setData(response.data.items);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil data berita dari API.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getBerita();
  }, [getBerita]);

const handleCreate = async (payload: BeritaPayload, file: File | null) => {
    try {
      setIsMutating(true);
      const response = await createAdminBerita(payload);
      
      if (response.success && file) {
        const newBeritaId = response.data.id;
        await uploadBeritaCover(newBeritaId, file);
      }
      
      await getBerita();
    } catch (err: any) {
      const apiError = err.response?.data?.error;
      if (apiError && Array.isArray(apiError.message)) {
        alert('Gagal:\n- ' + apiError.message.join('\n- '));
      } else {
        alert(apiError?.message || 'Gagal membuat berita baru.');
      }
    } finally {
      setIsMutating(false);
    }
  };

  const handleUpdate = async (id: string, payload: BeritaPayload, file: File | null) => {
    try {
      setIsMutating(true);
      await updateAdminBerita(id, payload);
      
      if (file) {
        await uploadBeritaCover(id, file);
      }
      
      await getBerita();
    } catch (err: any) {
      const apiError = err.response?.data?.error;
      if (apiError && Array.isArray(apiError.message)) {
        alert('Gagal:\n- ' + apiError.message.join('\n- '));
      } else {
        alert(apiError?.message || 'Gagal memperbarui berita.');
      }
    } finally {
      setIsMutating(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    try {
      await deleteAdminBerita(id);
      await getBerita();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal menghapus berita.');
    }
  };

 const handleTogglePublish = async (id: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin mempublikasikan / mengubah status berita ini?`)) return;
    try {
      await publishAdminBerita(id);
      await getBerita();
    } catch (err: any) {
      const apiError = err.response?.data?.error;
      alert(apiError?.message || 'Gagal mengubah status berita.');
    }
  };

  return { 
    data, 
    isLoading, 
    isMutating,
    error, 
    refetch: getBerita,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleTogglePublish
  };
};

export const usePublicBerita = () => {
  const [data, setData] = useState<BeritaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBerita = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAdminBerita();
        if (response.success) {
          setData(response.data.items.filter((a) => a.status === 'published'));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Gagal mengambil data berita.');
      } finally {
        setIsLoading(false);
      }
    };
    getBerita();
  }, []);

  return { data, isLoading, error };
};
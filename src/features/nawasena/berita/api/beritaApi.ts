import api from '../../../../api/axios';
import type { BeritaItem, BeritaPayload, BeritaResponse, SingleBeritaResponse } from '../types/berita';

// 1. GET /v1/cms/news (Get All)
export const fetchAdminBerita = async (): Promise<BeritaResponse> => {
  const response = await api.get('/v1/cms/news');
  return response.data;
};

// 2. POST /v1/cms/news (Create)
export const createAdminBerita = async (payload: BeritaPayload): Promise<SingleBeritaResponse> => {
  const response = await api.post('/v1/cms/news', payload);
  return response.data;
};

// 3. GET /v1/cms/news/{id} (Get One)
export const getAdminBeritaById = async (id: string): Promise<SingleBeritaResponse> => {
  const response = await api.get(`/v1/cms/news/${id}`);
  return response.data;
};

// 4. PUT /v1/cms/news/{id} (Update)
export const updateAdminBerita = async (id: string, payload: BeritaPayload): Promise<SingleBeritaResponse> => {
  const response = await api.put(`/v1/cms/news/${id}`, payload);
  return response.data;
};

// 5. DELETE /v1/cms/news/{id} (Delete)
export const deleteAdminBerita = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/v1/cms/news/${id}`);
  return response.data;
};

// 6. POST /v1/cms/news/{id}/cover (Upload Cover)

export const uploadBeritaCover = async (id: string, file: File): Promise<SingleBeritaResponse> => {
  const formData = new FormData();
  
  // PERHATIAN: Jika 'file' masih error "Unexpected field", 
  // coba ganti kata 'file' di bawah ini menjadi 'image', 'cover', atau 'coverImage' 
  // sesuai dengan parameter yang tertulis di dokumentasi backend-mu.
  formData.append('file', file); 

  const response = await api.post(`/v1/cms/news/${id}/cover`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// 7. PATCH /v1/cms/news/{id}/publish (Update Publish Status)
// Kita hilangkan pengiriman request body karena API hanya butuh {id} di URL
export const publishAdminBerita = async (id: string): Promise<SingleBeritaResponse> => {
  const response = await api.patch(`/v1/cms/news/${id}/publish`);
  return response.data;
};

// Fungsi untuk Public (dipakai di BeritaPage.tsx / DashboardPage.tsx)
export const selectHomepageBerita = async () => {
  const response = await fetchAdminBerita();
  const allArticles = response.data.items;
  const publishedArticles = allArticles.filter(article => article.status === 'published');

  return {
    featured: publishedArticles.find(a => a.homepagePlacement === 'featured'),
    supporting: publishedArticles.filter(a => a.homepagePlacement === 'supporting').slice(0, 4),
    allPublished: publishedArticles,
  };
};
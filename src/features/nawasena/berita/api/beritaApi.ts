import api from '../../../../api/axios';
import type { BeritaPayload, BeritaResponse, SingleBeritaResponse } from '../types/berita';

export const fetchAdminBerita = async (): Promise<BeritaResponse> => {
  const response = await api.get('/v1/cms/news');
  return response.data;
};

export const createAdminBerita = async (payload: BeritaPayload): Promise<SingleBeritaResponse> => {
  const response = await api.post('/v1/cms/news', payload);
  return response.data;
};

export const getAdminBeritaById = async (id: string): Promise<SingleBeritaResponse> => {
  const response = await api.get(`/v1/cms/news/${id}`);
  return response.data;
};

export const updateAdminBerita = async (id: string, payload: BeritaPayload): Promise<SingleBeritaResponse> => {
  const response = await api.put(`/v1/cms/news/${id}`, payload);
  return response.data;
};

export const deleteAdminBerita = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/v1/cms/news/${id}`);
  return response.data;
};


export const uploadBeritaCover = async (id: string, file: File): Promise<SingleBeritaResponse> => {
  const formData = new FormData();
  formData.append('file', file); 

  const response = await api.post(`/v1/cms/news/${id}/cover`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};


export const publishAdminBerita = async (id: string): Promise<SingleBeritaResponse> => {
  const response = await api.patch(`/v1/cms/news/${id}/publish`);
  return response.data;
};

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
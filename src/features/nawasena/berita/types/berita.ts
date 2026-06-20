export type BeritaStatus = 'draft' | 'published' | 'review' | 'archived';
export type BeritaHomepagePlacement = 'featured' | 'supporting' | 'none';

export type BeritaItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverUrl: string | null;
  status: BeritaStatus;
  publishedAt: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
  category?: string;
  homepagePlacement?: BeritaHomepagePlacement;
  views?: number;
};

export type BeritaResponse = {
  success: boolean;
  data: {
    items: BeritaItem[];
    total: number;
    page: number;
    limit: number;
  };
};

export type SingleBeritaResponse = {
  success: boolean;
  data: BeritaItem;
};

// Payload untuk POST dan PUT
export type BeritaPayload = {
  title: string;
  content: string;
  excerpt?: string;
  coverUrl?: string; // Tambahan jika backend menerima URL cover secara langsung
};
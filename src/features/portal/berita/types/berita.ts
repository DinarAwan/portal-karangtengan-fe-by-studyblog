export type PublicBeritaItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverUrl: string | null;
  publishedAt: string;
  
  // Optional fallback properties
  category?: string;
  views?: number;
  author?: string;
};

export type PublicBeritaResponse = {
  success: boolean;
  // Menangani kemungkinan response berupa array langsung atau object { items: [] }
  data: PublicBeritaItem[] | { items: PublicBeritaItem[] };
};

export type SinglePublicBeritaResponse = {
  success: boolean;
  data: PublicBeritaItem;
};
export type BeritaStatus = 'draft' | 'review' | 'published' | 'archived';

export type BeritaHomepagePlacement = 'none' | 'featured' | 'supporting';

export type BeritaItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  status: BeritaStatus;
  views: number;
  coverImageUrl: string;
  coverImageAlt: string;
  homepagePlacement: BeritaHomepagePlacement;
  homepageOrder: number;
};


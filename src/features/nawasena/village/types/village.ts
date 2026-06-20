export type VillagePotency = {
  title: string;
  desc: string;
};

export type VillageStats = {
  area_ha: number;
  families: number;
  population: number;
  farmer_families?: number; // dari GET
};

export type VillageGalleryItem = {
  id: string;
  imageUrl: string;
  caption: string;
  orderIndex: number;
  createdAt: string;
};

export type VillageItem = {
  id: string;
  vision: string;
  mission: string;
  description: string;
  potency: VillagePotency[];
  stats: VillageStats;
  updatedAt: string;
  gallery: VillageGalleryItem[];
};

export type VillageResponse = {
  success: boolean;
  data: VillageItem;
};

export type VillagePayload = {
  vision: string;
  mission: string;
  description: string;
  potency: VillagePotency[];
  stats: Omit<VillageStats, 'farmer_families'>;
};

export type GalleryPayload = {
  imageUrl: string;
  caption: string;
  orderIndex: number;
};
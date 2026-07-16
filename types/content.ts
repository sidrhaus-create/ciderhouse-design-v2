export type BrandSlug =
  "double-tree" | "white-phoenix" | "mister-bee" | "zero" | "other";

export type ContentStatus = "draft" | "published" | "archived";

export type SeoFields = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: BrandSlug;
  category: "cider" | "mead" | "non-alcoholic" | "lemonade" | "other";
  flavor: string;
  shortDescription: string;
  fullDescription?: string;
  alcoholPercent?: number;
  isNonAlcoholic: boolean;
  sweetness?: "dry" | "semi-dry" | "semi-sweet" | "sweet";
  volumes: string[];
  formats: Array<"bottle" | "can" | "keg">;
  ingredients?: string;
  nutrition?: string;
  shelfLife?: string;
  serving?: string;
  pairings?: string[];
  badges?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  status: ContentStatus;
  assets: {
    front: string;
    threeQuarter?: string;
    back?: string;
    shadow?: string;
    mobile?: string;
  };
  seo: SeoFields;
};

export type Brand = {
  id: string;
  slug: BrandSlug;
  name: string;
  shortDescription: string;
  accentToken: string;
  logo?: string;
  status: ContentStatus;
  seo: SeoFields;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover?: string;
  body: string;
  category: string;
  publicationDate?: string;
  eventDate?: string;
  relatedProductIds: string[];
  status: ContentStatus;
  seo: SeoFields;
};

export type StoreLocation = {
  id: string;
  name: string;
  chain?: string;
  city: string;
  region?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  productCategories?: string[];
  externalUrl?: string;
  status: "active" | "inactive";
};

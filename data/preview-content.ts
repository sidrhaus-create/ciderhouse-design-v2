import type { Article, Brand, Product, StoreLocation } from "@/types/content";

/**
 * FOUNDATION PLACEHOLDERS ONLY.
 * These records exercise typed components and must not be published as product facts.
 */
export const previewProducts: Product[] = [
  {
    id: "foundation-product-lock-preview",
    slug: "foundation-product-lock-preview",
    name: "Mister Bee — preview asset",
    brand: "mister-bee",
    category: "other",
    flavor: "Data pending",
    shortDescription:
      "Foundation-only placeholder record. No product characteristics are asserted.",
    isNonAlcoholic: false,
    volumes: [],
    formats: ["bottle"],
    status: "draft",
    assets: {
      front: "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
    },
    seo: {
      title: "Placeholder — replace before production",
      description: "Placeholder — replace before production",
    },
  },
];

export const previewBrands: Brand[] = [
  {
    id: "foundation-brand-placeholder",
    slug: "white-phoenix",
    name: "White Phoenix",
    shortDescription:
      "Placeholder brand summary — approved copy is still required.",
    accentToken: "--color-brand-primary",
    logo: "/assets/brand/family-logos/white-phoenix-logo-raster-source.png",
    status: "draft",
    seo: {
      title: "Placeholder — replace before production",
      description: "Placeholder — replace before production",
    },
  },
  {
    id: "foundation-double-tree-placeholder",
    slug: "double-tree",
    name: "Double Tree",
    shortDescription:
      "Placeholder brand summary — approved copy is still required.",
    accentToken: "--color-brand-primary",
    logo: "/assets/brand/family-logos/double-tree-logo-raster-source.png",
    status: "draft",
    seo: {
      title: "Placeholder — replace before production",
      description: "Placeholder — replace before production",
    },
  },
];

export const previewArticles: Article[] = [
  {
    id: "foundation-article-placeholder",
    title: "Article model preview",
    slug: "article-model-preview",
    excerpt: "Placeholder editorial content for component verification only.",
    body: "Placeholder — approved editorial content is still required.",
    category: "foundation-preview",
    relatedProductIds: [],
    status: "draft",
    seo: {
      title: "Placeholder — replace before production",
      description: "Placeholder — replace before production",
    },
  },
];

export const previewStores: StoreLocation[] = [
  {
    id: "foundation-store-placeholder",
    name: "Store data pending",
    city: "Not supplied",
    address: "Placeholder — replace before production",
    status: "inactive",
  },
];

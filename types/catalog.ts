export type CatalogContentStatus =
  | "approved"
  | "sourced"
  | "requires-approval"
  | "asset-missing"
  | "unavailable";

export type ProductFormat = "bottle" | "can" | "keg";

export type FamilySlug =
  | "double-tree"
  | "dtree-party"
  | "white-phoenix"
  | "mister-bee"
  | "migliore"
  | "bumble-coffee"
  | "zero";

export type FamilyTheme = "warm" | "purple" | "dark" | "muted";

export type CatalogAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProductRecord = {
  id: string;
  familySlug: FamilySlug;
  name: string;
  flavor: string;
  format?: ProductFormat;
  volume?: string;
  alcoholClassification?: string;
  sweetness?: "сухой" | "полусухой" | "полусладкий" | "сладкий";
  asset?: CatalogAsset;
  availabilityStatus: CatalogContentStatus;
  approvalStatus: CatalogContentStatus;
  sourceUrl: string;
  facts?: string[];
};

export type ProductFamily = {
  slug: FamilySlug;
  categoryLabel: string;
  navLabel: string;
  title: string;
  logo?: CatalogAsset;
  description: string;
  story: string[];
  heroAssets: CatalogAsset[];
  formats: ProductFormat[];
  characterNotes: string[];
  products: ProductRecord[];
  status: CatalogContentStatus;
  sourceUrl: string;
  missingAssetNote?: string;
  /** Decorative section theme used by the catalog visual-rhythm system; not a brand claim. */
  theme: FamilyTheme;
  seo: {
    title: string;
    description: string;
  };
};

export const formatLabels: Record<ProductFormat, string> = {
  bottle: "Бутылки",
  can: "Банки",
  keg: "Кеги",
};

import { BRANDS, type Brand, type BrandSlug } from "./brands";

/** Product formats — ONE place for labels and for what is verified.
 *  Family level (official site, ciderhouse.ru): products are filled into bottles and kegs; Double Tree — bottles, kegs and a 0,75 l
 *  bottle; White Phoenix — bottles and kegs. Volumes of the bottles come from the labels (450 ml / 0,75 l).
 *  Kegs are confirmed for a FAMILY, not for individual flavours — so a keg is never shown as an option of a single product,
 *  and no keg size is stated anywhere. */
export type FormatId = "bottle-045" | "bottle-075" | "keg";

export const FORMATS: Record<FormatId, { label: string; short: string; plural: string }> = {
  "bottle-045": { label: "Бутылка 0,45\u00a0л", short: "0,45\u00a0л", plural: "Бутылки 0,45\u00a0л" },
  "bottle-075": { label: "Бутылка 0,75\u00a0л", short: "0,75\u00a0л", plural: "Бутылки 0,75\u00a0л" },
  keg: { label: "Кега", short: "Кеги", plural: "Кеги" },
};

export const BRAND_FORMATS: Partial<Record<BrandSlug, FormatId[]>> = {
  "double-tree": ["bottle-045", "bottle-075", "keg"],
  "white-phoenix": ["bottle-045", "keg"],
  "mister-bee": ["bottle-045"],
  zero: ["bottle-045"],
};

/** The exact format of one catalogue position (from its label). Kegs never come out of here. */
export const formatOf = (p: { format: string[]; volumes: string[] }): FormatId =>
  p.volumes.includes("0,75 л") ? "bottle-075" : "bottle-045";

export const brandsWith = (f: FormatId): Brand[] => BRANDS.filter((b) => BRAND_FORMATS[b.slug]?.includes(f));

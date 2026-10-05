import type { BrandSlug } from "./brands";
import type { SourceId } from "./sources";
import PACKS from "./packs.json";
import { flavourRu } from "./flavours";

export type Product = {
  slug: string;
  brand: BrandSlug;
  name: string; // as printed on the label — internal (flavour accents, sources); never shown as website text
  nameRu: string; // the display name: src/data/flavours.ts
  abv: "0,0%" | null; // only stated where verified
  format: ("бутылка" | "банка")[];
  volumes: string[];
  verified: boolean;
  image?: string; // base path without -<w>.webp
  pack?: { src: string; w: number; h: number }; // archive packshot: base path without -<h>.webp + trimmed pixel size
  tone?: string; // liquid colour for UI accents
  character?: string; // e.g. "Полусухой"
  description?: string;
  idealFor?: string;
  motto?: string;
  sources: SourceId[];
};

const Z = "/assets/products/zero/";

// ---------- VERIFIED: ZER° CIDER 0,0% (owner materials + original photography) ----------
const zero: Product[] = [
  {
    slug: "zero-green-apple",
    brand: "zero",
    name: "Double Tree 0% Green Apple",
    nameRu: flavourRu("zero-green-apple"),
    abv: "0,0%",
    format: ["бутылка"],
    volumes: ["0,45 л"], // label: 450 ML
    verified: true,
    image: Z + "dt-green-apple-0",
    tone: "#D9A441",
    character: "Полусухой",
    description:
      "Классика жанра: свежесть только что разрезанного зелёного яблока, лёгкая кислинка и сухое, чистое послевкусие. Максимально близко к традиционному сидру.",
    idealFor: "тех, кто любит классический яблочный сидр и свежесть",
    motto: "Свобода выбирать классику",
    sources: ["owner-repo"],
  },
  {
    slug: "zero-cherry",
    brand: "zero",
    name: "White Phoenix 0% Cherry",
    nameRu: flavourRu("zero-cherry"),
    abv: "0,0%",
    format: ["бутылка"],
    volumes: ["0,45 л"], // label: 450 ML
    verified: true,
    image: Z + "wp-cherry-0",
    tone: "#B3263A",
    character: "Сочный",
    description:
      "Спелая вишня в яблочной основе: сочный ягодный профиль, мягкая сладость и бархатное послевкусие. Самый десертный вкус линейки.",
    idealFor: "вечера с друзьями и тех, кто любит ягодные напитки",
    motto: "Свобода быть ярче",
    sources: ["owner-repo"],
  },
  {
    slug: "zero-pomegranate-raspberry",
    brand: "zero",
    name: "White Phoenix 0% Pomegranate Raspberry",
    nameRu: flavourRu("zero-pomegranate-raspberry"),
    abv: "0,0%",
    format: ["бутылка"],
    volumes: ["0,45 л"], // label: 450 ML
    verified: true,
    image: Z + "wp-pomegranate-raspberry-0",
    tone: "#C2304F",
    character: "Дерзкий",
    description:
      "Смелый дуэт: терпкость граната и сладость малины на игристой яблочной основе. Насыщенный, взрослый вкус с характером.",
    idealFor: "тех, кто ищет новое и не боится экспериментов",
    motto: "Свобода удивлять",
    sources: ["owner-repo"],
  },
];

// ---------- FROM PACKAGING: packshots from the owner's materials, mapped by slug in packs.json (scripts/brand-packshots.mjs) ----------
// `name` is exactly what is printed on the label; the website shows `nameRu` from the flavour dictionary.
const VOLUME: Partial<Record<BrandSlug, (slug: string) => string[]>> = {
  "white-phoenix": () => ["0,45 л"],                                   // label: 450 ML
  "double-tree": (slug) => [slug.includes("-075-") ? "0,75 л" : "0,45 л"],
  "mister-bee": () => ["0,45 л"],                                      // label: 450 ml
};
const FORMAT: Partial<Record<BrandSlug, Product["format"]>> = { "bumble-coffee": ["банка"] };
const BRAND_OF = (slug: string) => (["white-phoenix", "double-tree", "mister-bee", "bumble-coffee"] as BrandSlug[]).find((b) => slug.startsWith(b + "-"))!;

const packed: Product[] = Object.entries(PACKS as Record<string, { src: string; w: number; h: number; label: string }>).map(([slug, v]) => {
  const brand = BRAND_OF(slug);
  return {
    slug, brand, name: v.label, nameRu: flavourRu(slug), abv: null,
    format: FORMAT[brand] ?? ["бутылка"], volumes: VOLUME[brand]?.(slug) ?? [],
    verified: false, pack: { src: v.src, w: v.w, h: v.h }, sources: ["owner-archive"],
  };
});

export const PRODUCTS: Product[] = [...zero, ...packed];
export const productBySlug = (s: string) => PRODUCTS.find((p) => p.slug === s);
export const productsOf = (b: BrandSlug) => PRODUCTS.filter((p) => p.brand === b);
export const VERIFIED = PRODUCTS.filter((p) => p.verified);

export const BOTTLE_RATIO = { w: 1322, h: 5478 }; // from public/assets/products/zero/ratio.json
/** share of the cutout height occupied by the bottle (rest = studio reflection) */
export const BOTTLE_BODY = 0.872;
export const srcSet = (base: string) => [240, 400, 600, 900].map((w) => `${base}-${w}.webp ${w}w`).join(", ");

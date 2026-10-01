import type { ExplorerFamily } from "@/components/catalog/catalog-explorer";
import type { BottleAsset } from "@/components/ui/bottle";
import { productFamilies } from "@/data/catalog-content";
import type { FamilySlug, ProductRecord } from "@/types/catalog";

/**
 * Presentation-only selections of catalog bottles for banners and sequences.
 * Every item is resolved from `productFamilies` by product id, so flavour
 * names, family names and images always come from the catalog data — this
 * file only decides which bottles appear where and in what order.
 */

export type ShowcaseItem = {
  id: string;
  flavor: string;
  family: string;
  familySlug: FamilySlug;
  volume?: string;
  asset: BottleAsset;
};

const familyTitle = new Map(
  productFamilies.map((family) => [family.slug, family.title]),
);

function toItem(product: ProductRecord): ShowcaseItem[] {
  if (!product.asset) return [];
  return [
    {
      id: product.id,
      flavor: product.flavor,
      family: familyTitle.get(product.familySlug) ?? product.name,
      familySlug: product.familySlug,
      volume: product.volume,
      asset: product.asset,
    },
  ];
}

const allItems = productFamilies.flatMap((family) =>
  family.products.flatMap(toItem),
);
const byId = new Map(allItems.map((item) => [item.id, item]));

export function pick(ids: string[]): ShowcaseItem[] {
  return ids.flatMap((id) => {
    const item = byId.get(id);
    return item ? [item] : [];
  });
}

/** Hero poster: a tight group shot (centre bottle is the lead). */
export const heroCluster = pick([
  "double-tree-045-green-apple",
  "white-phoenix-pitaya-kiwi",
  "white-phoenix-cherry-passionfruit",
  "double-tree-045-pear",
  "double-tree-045-raspberry",
]);

/** The horizontal "runway" sequence on the homepage. */
export const runway = pick([
  "double-tree-045-pear",
  "white-phoenix-cherry-passionfruit",
  "mister-bee-classic",
  "double-tree-045-watermelon-mint",
  "white-phoenix-pitaya-kiwi",
  "double-tree-045-black-currant",
  "mister-bee-lemon",
  "double-tree-045-caribbean-kiwi",
  "white-phoenix-mango-chili",
  "double-tree-045-raspberry",
  "white-phoenix-sea-buckthorn-lemon",
  "mister-bee-pomegranate-grape",
  "double-tree-045-lemon-lime",
  "white-phoenix-melon-mint",
  "double-tree-075-yellow-pear",
  "white-phoenix-strawberry",
]);

/** Lead bottles per family (used by banners and brand pages). */
export const familyLeads: Partial<Record<FamilySlug, ShowcaseItem[]>> = {
  "double-tree": pick([
    "double-tree-045-green-apple",
    "double-tree-045-pear",
    "double-tree-045-dark-cherry",
  ]),
  "white-phoenix": pick([
    "white-phoenix-pitaya-kiwi",
    "white-phoenix-cherry-passionfruit",
    "white-phoenix-mango-chili",
  ]),
  "mister-bee": pick([
    "mister-bee-lemon",
    "mister-bee-classic",
    "mister-bee-pomegranate-grape",
  ]),
};

/** Every distinct flavour name in the catalog, for the type ticker. */
export const flavorNames = Array.from(
  new Set(
    productFamilies.flatMap((family) =>
      family.products.map((product) => product.flavor),
    ),
  ),
);

/** Number of catalog entries, derived from the data (never hand-written). */
export const catalogCount = productFamilies.reduce(
  (total, family) => total + family.products.length,
  0,
);

export function familyCount(slug: FamilySlug) {
  return (
    productFamilies.find((family) => family.slug === slug)?.products.length ?? 0
  );
}

/* ---- Catalogue explorer data -------------------------------------------- */

const formatSingular: Record<string, string> = {
  bottle: "Бутылка",
  can: "Банка",
  keg: "Кег",
};

const familyTone: Record<FamilySlug, ExplorerFamily["tone"]> = {
  "double-tree": "paper",
  "dtree-party": "brand",
  "white-phoenix": "ink",
  "mister-bee": "brand",
  zero: "ink",
};

/** Drops internal cross-reference wording from a product note. */
const publicNote = (note: string) => note.replace(/\s*\(см\.[^)]*\)\.?$/, ".");

export const explorerFamilies: ExplorerFamily[] = productFamilies.map(
  (family) => {
    const hasBottles = family.products.some((product) => product.asset);
    return {
      slug: family.slug,
      title: family.title,
      navLabel: family.navLabel,
      category: family.categoryLabel,
      description: family.description,
      tone: familyTone[family.slug],
      products: family.products.map((product) => ({
        id: product.id,
        flavor: product.flavor,
        family: family.title,
        familySlug: family.slug,
        volume: product.volume,
        format: product.format ? formatSingular[product.format] : undefined,
        classification: product.asset
          ? product.alcoholClassification
          : undefined,
        notes: product.asset ? product.facts?.map(publicNote) : undefined,
        asset: product.asset,
      })),
      composite: hasBottles ? undefined : family.heroAssets[0],
      notes: family.groups
        ?.filter((group) => group.slug !== "non-alcoholic-cider")
        .map((group) => ({
          label: group.label,
          text: "Линейка готовится к запуску — скоро в каталоге.",
        })),
      photo:
        family.slug === "double-tree"
          ? {
              asset: {
                src: "/assets/photography/double-tree-075-trio-purple.png",
                width: 580,
                height: 787,
                alt: "Три бутылки Double Tree 0,75 л на фиолетовом фоне",
              },
              caption: "Лимитированная коллекция",
              group: "0,75 л",
            }
          : undefined,
    };
  },
);

/** A mixed row of bottles for the catalogue's moving shelf. */
export const shelfRow = pick([
  "double-tree-045-red-apple",
  "white-phoenix-mango-citrus",
  "mister-bee-classic",
  "double-tree-045-forest-berries",
  "white-phoenix-grape-mandarin",
  "double-tree-045-coconut-raspberry",
  "mister-bee-pomegranate-grape",
  "white-phoenix-peach-apricot",
  "double-tree-045-dark-cherry",
  "white-phoenix-sicilian-orange",
  "double-tree-045-pomegranate-mint",
  "mister-bee-lemon",
  "white-phoenix-dark-cherry",
  "double-tree-045-green-apple",
  "white-phoenix-coconut-citrus",
  "double-tree-045-pear",
]);

import type { BrandSlug } from "./brands";

/** Studio photography of the products (photographer D. Murashov; the owner's galleries, converted by scripts/studio-photos.mjs).
 *  ONE registry: components take a shot by key, so a photograph, its size and its alt text are never retyped.
 *  Files: public/assets/studio/<key>-900.webp and -1800.webp. Packaging is shown as shot — no retouching of labels. */
export type Shot = { w: number; h: number; alt: string };

export const SHOTS = {
  // the house — gallery 12.05.26
  "house-lineup-white": { w: 1800, h: 1013, alt: "Линейка CIDERHOUSE: сидр Double Tree и медовуха White Phoenix в ряд" },
  // White Phoenix — the right part of the house lineup (gallery 12.05.26): the only finished still-life of the brand so far
  "wp-four-white": { w: 1514, h: 1514, alt: "White Phoenix: «Помело — ананас», «Чёрная вишня», «Горький лимон» и «Кокос — цитрус»" },
  // Double Tree 0,75 — galleries 05.03.26 and 26.08.26
  "dt-075-six-beige": { w: 1800, h: 1013, alt: "Double Tree: шесть бутылок 0,75 л в ряд" },
  "dt-075-apples-sage": { w: 1800, h: 1200, alt: "Double Tree 0,75 л: три бутылки с красным и зелёным яблоками" },
  "dt-075-apple-portrait": { w: 1367, h: 1920, alt: "Double Tree 0,75 л с зелёными яблоками" },
  "dt-075-five-beige": { w: 1800, h: 1187, alt: "Double Tree: пять бутылок 0,75 л на бежевом фоне" },
  "dt-075-lying-white": { w: 1800, h: 1200, alt: "Double Tree 0,75 л: бутылки лежат на белом, вид сверху" },
  "dt-075-lying-purple": { w: 1800, h: 1200, alt: "Double Tree 0,75 л: бутылки лежат на фиолетовом фоне, вид сверху" },
  "dt-075-standing-beige": { w: 1800, h: 1200, alt: "Double Tree 0,75 л: бутылки стоят на бежевом фоне" },
  "dt-075-standing-purple": { w: 1800, h: 1200, alt: "Double Tree 0,75 л: пять вкусов на фиолетовом фоне" },
  // Double Tree 0,45 — gallery 22.07.25
  "dt-white-trio-purple": { w: 1800, h: 1013, alt: "Double Tree: три бутылки на фиолетовом фоне" },
  "dt-dry-apple-beige": { w: 1800, h: 1200, alt: "Double Tree Dry Apple Cider на бежевом фоне" },
  "dt-golden-apple-duo": { w: 1800, h: 2400, alt: "Double Tree: две бутылки с золотым яблоком на этикетке" },
  // Mister Bee — galleries 22.07.25 and 30.06.26
  "mb-trio-beige-wide": { w: 1800, h: 1013, alt: "Mister Bee: «Клюква», «Классик» и «Лимон» на светлом фоне" },
  "mb-duo-beige-wide": { w: 1800, h: 1200, alt: "Mister Bee: две бутылки медовухи на светлом фоне" },
  "mb-trio-beige": { w: 1800, h: 2400, alt: "Mister Bee: «Апельсин — грейпфрут», «Цветочная вишня» и «Мандарин»" },
  "mb-trio-purple": { w: 1800, h: 2400, alt: "Mister Bee: три бутылки медовухи на фиолетовом фоне" },
  // D TREE PARTY — gallery 30.06.26
  "party-five-beige": { w: 1800, h: 1200, alt: "D TREE PARTY: пять вкусов фруктового сидра на светлом фоне" },
  "party-five-purple": { w: 1800, h: 1200, alt: "D TREE PARTY: пять вкусов фруктового сидра на фиолетовом фоне" },
  // 0% — galleries 10.06.26 and 30.06.26
  "zero-trio-fruit-sage": { w: 1800, h: 1200, alt: "Безалкогольный сидр 0%: три вкуса с яблоком, гранатом и вишней" },
  "zero-trio-fruit-grey": { w: 1800, h: 1200, alt: "Безалкогольный сидр 0%: три бутылки с фруктами на сером фоне" },
  "zero-green-apple-duo": { w: 1800, h: 2400, alt: "Безалкогольный сидр 0% «Зелёное яблоко» с зелёными яблоками" },
  "zero-cherry-duo": { w: 1800, h: 2400, alt: "Безалкогольный сидр 0% «Вишня» с вишней" },
  "zero-pomegranate-raspberry-duo": { w: 1800, h: 2400, alt: "Безалкогольный сидр 0% «Гранат — малина» с гранатом" },
  "zero-green-apple-purple": { w: 1800, h: 1200, alt: "Безалкогольный сидр 0% «Зелёное яблоко»: три бутылки на фиолетовом фоне" },
  "zero-green-apple-sage": { w: 1800, h: 1200, alt: "Безалкогольный сидр 0% «Зелёное яблоко»: три бутылки на светло-зелёном фоне" },
  "zero-cherry-sage": { w: 1800, h: 1200, alt: "Безалкогольный сидр 0% «Вишня»: три бутылки на светлом фоне" },
  "zero-trio-beige": { w: 1800, h: 2400, alt: "Безалкогольный сидр 0%: вишня, зелёное яблоко и гранат — малина" },
  "zero-trio-purple": { w: 1800, h: 2400, alt: "Безалкогольный сидр 0%: три вкуса на фиолетовом фоне" },
} satisfies Record<string, Shot>;
export type ShotKey = keyof typeof SHOTS;

const P = "/assets/studio/";
export const shot = (k: ShotKey) => ({ src: `${P}${k}-900.webp`, srcSet: `${P}${k}-900.webp 900w, ${P}${k}-1800.webp 1800w`, width: SHOTS[k].w, height: SHOTS[k].h, alt: SHOTS[k].alt });

/** Where the photography leads a brand: a wide frame, a tall frame, and the line of the catalogue header. */
export const BRAND_SHOTS: Partial<Record<BrandSlug, { wide: ShotKey; tall: ShotKey; caption: string; banner: ShotKey; bannerPos?: string }>> = {
  "double-tree": { wide: "dt-075-standing-purple", tall: "dt-075-apple-portrait", caption: "Double Tree · бутылки 0,75 л", banner: "dt-075-standing-beige", bannerPos: "50% 58%" },
  "white-phoenix": { wide: "wp-four-white", tall: "wp-four-white", caption: "White Phoenix · четыре вкуса", banner: "wp-four-white", bannerPos: "50% 40%" },
  "mister-bee": { wide: "mb-trio-beige-wide", tall: "mb-trio-purple", caption: "Mister Bee · медовуха", banner: "mb-duo-beige-wide", bannerPos: "50% 62%" },
  zero: { wide: "zero-trio-fruit-sage", tall: "zero-trio-purple", caption: "0% · три вкуса", banner: "zero-trio-fruit-grey", bannerPos: "50% 60%" },
};

/** One still-life per 0% flavour (product slug → shot). */
export const FLAVOUR_SHOTS: Record<string, ShotKey> = {
  "zero-green-apple": "zero-green-apple-duo",
  "zero-cherry": "zero-cherry-duo",
  "zero-pomegranate-raspberry": "zero-pomegranate-raspberry-duo",
};
/** Brand covers — the photograph each brand is introduced with. `tile` is the campaign tile (tall crop), `wide` the poster / catalogue
 *  cover. `legacy` paths point at public/assets/photography (sizes -900 / -1800). */
export type CoverSrc = { k: ShotKey } | { legacy: string; alt: string; w: number; h: number };
export const COVERS: Partial<Record<BrandSlug, { tile: CoverSrc; wide: CoverSrc; tilePos?: string; widePos?: string }>> = {
  "double-tree": { tile: { k: "dt-075-standing-purple" }, wide: { k: "dt-075-standing-purple" }, tilePos: "50% 50%", widePos: "50% 56%" },
  "white-phoenix": { tile: { k: "wp-four-white" }, wide: { k: "wp-four-white" }, tilePos: "50% 0%", widePos: "50% 20%" },
  "mister-bee": { tile: { k: "mb-trio-purple" }, wide: { k: "mb-trio-beige-wide" }, tilePos: "50% 38%", widePos: "50% 62%" },
  zero: { tile: { k: "zero-trio-purple" }, wide: { k: "zero-trio-fruit-sage" }, tilePos: "50% 40%", widePos: "50% 60%" },
};
export const HOUSE_COVER: ShotKey = "house-lineup-white";
export const coverImg = (c: CoverSrc) =>
  "k" in c ? shot(c.k) : { src: `${c.legacy}-900.webp`, srcSet: `${c.legacy}-900.webp 900w, ${c.legacy}-1800.webp 1800w`, width: c.w, height: c.h, alt: c.alt };


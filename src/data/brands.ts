import type { SourceId } from "./sources";

export type BrandSlug = "white-phoenix" | "double-tree" | "mister-bee" | "zero" | "bumble-coffee" | "migliore";

export type Brand = {
  slug: BrandSlug;
  name: string;
  /** how the name is set in display type; \n splits lines */
  display: string;
  family: "alcohol" | "zero";
  kind: string; // category word shown in UI
  kindVerified: boolean;
  line: string; // one-liner (house voice, not a product claim)
  status: "active" | "coming-soon";
  mark?: string; // official logo file, if we have the original
  logo?: string; // full logo (mark + wordmark) from the brand archive
  site?: string; // verified official standalone website (owner-confirmed); brand entry points link there
  /** colours come from brand tokens in globals.css (never raw HEX in components) */
  theme: { bg: string; ink: string; accent: string };
  /** brand display face: family token, weight, case — from the brand guide where assigned, master face otherwise */
  face: { family: string; weight: number; upper: boolean; tracking: string; verified: boolean; cyr: boolean }; // cyr: the face has Cyrillic
  /** composition personality used by the brand room */
  voice: "serif" | "stencil" | "round" | "ice" | "fashion" | "sealed";
  sources: SourceId[];
};

export const BRANDS: Brand[] = [
  {
    slug: "white-phoenix",
    name: "White Phoenix",
    display: "White\nPhoenix",
    family: "alcohol",
    kind: "naturally brewed drink",
    kindVerified: true,
    line: "Птица, которая возрождается в каждом вкусе.",
    status: "active",
    mark: "/assets/brand/white-phoenix-mark.svg",
    logo: "/assets/brand/white-phoenix-logo-black.png",
    theme: { bg: "var(--wp-bg)", ink: "var(--wp-ink)", accent: "var(--wp-accent)" },
    face: { family: "var(--f-wp)", weight: 400, upper: false, tracking: "0.01em", verified: true, cyr: false },
    voice: "serif",
    sources: ["owner-brief", "owner-repo", "discovery-winestyle", "discovery-untappd"],
  },
  {
    slug: "mister-bee",
    name: "Mister Bee",
    display: "Mister\nBee",
    family: "alcohol",
    kind: "медовуха",
    kindVerified: true,
    line: "Самостоятельный характер в алкогольном портфеле дома.",
    status: "active",
    theme: { bg: "var(--mb-bg)", ink: "var(--mb-ink)", accent: "var(--mb-accent)" },
    face: { family: "var(--f-mb)", weight: 700, upper: true, tracking: "0.01em", verified: true, cyr: false },
    voice: "round",
    sources: ["owner-brief", "owner-archive"],
  },
  {
    slug: "double-tree",
    name: "Double Tree",
    display: "Double\nTree",
    family: "alcohol",
    kind: "сидр",
    kindVerified: true,
    line: "Два дерева — одно яблоко. Сидр с графичным, городским характером.",
    status: "active",
    logo: "/assets/brand/double-tree-logo-white.png",
    theme: { bg: "var(--dt-bg)", ink: "var(--dt-ink)", accent: "var(--dt-accent)" },
    face: { family: "var(--f-dt)", weight: 500, upper: true, tracking: "-0.01em", verified: true, cyr: true },
    voice: "stencil",
    sources: ["owner-brief", "owner-repo", "discovery-winestyle", "discovery-untappd"],
  },
  {
    slug: "zero",
    name: "ZER° CIDER",
    display: "ZER°\nCIDER",
    family: "zero",
    kind: "безалкогольный сидр 0,0%",
    kindVerified: true,
    line: "Ноль градусов. Сто процентов сидра.",
    status: "active",
    site: "https://zerocider.ru",
    mark: "/assets/brand/zerocider-logo.svg",
    logo: "/assets/brand/zero-lockup-purple.svg",
    theme: { bg: "var(--zero-bg)", ink: "var(--zero-ink)", accent: "var(--zero-accent)" },
    face: { family: "var(--f-zero)", weight: 700, upper: true, tracking: "-0.03em", verified: true, cyr: true },
    voice: "ice",
    sources: ["owner-repo", "owner-brief"],
  },
  {
    slug: "bumble-coffee",
    name: "Bumble Coffee",
    display: "Bumble\nCoffee",
    family: "zero",
    kind: "Black Phoenix · кофе в банке",
    kindVerified: true,
    line: "Кофейное выражение Black Phoenix: смело, модно, без компромиссов.",
    status: "active",
    site: "https://bumblephoenix.ru",
    logo: "/assets/brand/bumble-coffee-logo.svg",
    theme: { bg: "var(--bc-bg)", ink: "var(--bc-ink)", accent: "var(--bc-accent)" },
    face: { family: "var(--f-bc)", weight: 800, upper: true, tracking: "-0.02em", verified: false, cyr: true },
    voice: "fashion",
    sources: ["owner-brief", "owner-archive"],
  },
  {
    slug: "migliore",
    name: "Migliore",
    display: "Migliore",
    family: "zero",
    kind: "закрытая комната",
    kindVerified: true,
    line: "Новое направление дома готовится к запуску.",
    status: "coming-soon",
    theme: { bg: "var(--mg-bg)", ink: "var(--mg-ink)", accent: "var(--mg-accent)" },
    face: { family: "var(--f-master)", weight: 800, upper: true, tracking: "-0.035em", verified: false, cyr: true },
    voice: "sealed",
    sources: ["owner-brief"],
  },
];

export const brandBySlug = (s: string) => BRANDS.find((b) => b.slug === s);

/** CSS variables + type for a brand plane. Spread into `style`, pair with className "field-brand". */
export const brandVars = (b: Brand) => ({ "--field": b.theme.bg, "--on": b.theme.ink, "--ui-accent": b.theme.accent, "--f-brand": b.face.family }) as Record<string, string>;
export const brandType = (b: Brand) => ({ fontFamily: b.face.family, fontWeight: b.face.weight, textTransform: b.face.upper ? "uppercase" : "none", letterSpacing: b.face.tracking }) as const;
/** Where a click on the brand leads. */
export const brandHref = (b: Brand) => b.site ?? `/brands/${b.slug}/`;
export const siteLabel = (b: Brand) => (b.site ?? "").replace(/^https?:\/\//, "");

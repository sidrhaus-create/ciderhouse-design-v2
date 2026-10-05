import RAW from "./news.json";
import { CURRENT } from "./news-current";

/** News of the house — a local, typed source. Nothing is fetched at runtime.
 *  - current stories: curated from the official Telegram channel (src/data/news-current.ts);
 *  - archive: texts, dates and images migrated from the official site (scripts/news-migrate.py → news.json).
 *  `sourceUrl` / `sourcePostIds` keep the provenance and are never used as a link: every preview opens the internal article. */
export type NewsImage = { src: string; w: number; h: number }; // src without -800.webp / -1600.webp
export type NewsBlock = { k: "p" | "h" | "li"; t: string };
export type Post = {
  slug: string;
  title: string;
  lead: string;
  body: NewsBlock[];
  date: string; // ISO day, as published at the source
  tag: string; // category
  cover: NewsImage | null;
  gallery: NewsImage[];
  featured?: boolean;
  sourceType: "telegram" | "site";
  sourceChannel?: string;
  sourcePostIds?: number[];
  sourceUrl: string;
  more?: { href: string; label: string }; // a contextual way further into the site
};

type Legacy = Omit<Post, "sourceType">;
const ARCHIVE: Post[] = (RAW as Legacy[]).map((p) => ({ ...p, sourceType: "site" as const }));

export const NEWS: Post[] = [...CURRENT, ...ARCHIVE].sort((a, b) => b.date.localeCompare(a.date)); // newest first
/** What is happening now: the curated current stories, newest first. */
export const LATEST: Post[] = NEWS.filter((p) => p.sourceType === "telegram");
export const postBySlug = (slug: string) => NEWS.find((p) => p.slug === slug);
export const postHref = (p: Post) => `/news/${p.slug}/`;
export const TELEGRAM = { handle: "@ciderhousee", href: "https://t.me/ciderhousee" };

const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
export const postDate = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
export const imgSet = (i: NewsImage) => ({ src: `${i.src}-800.webp`, srcSet: `${i.src}-800.webp 800w, ${i.src}-1600.webp 1600w`, width: i.w, height: i.h });

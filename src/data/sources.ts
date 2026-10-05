// Provenance registry. Every fact on the site points to one of these.
// "official"  – the official CIDERHOUSE domain (indexed page titles/URLs).
// "owner"     – materials published by the brand owner (github.com/sidrhaus-create/si) or stated by the owner in the brief.
// "discovery" – third-party retail listings used ONLY as clues; anything tagged with it renders with a "сверяется" marker
//               until confirmed against ciderhouse.ru and must not be treated as authoritative.

export type SourceId = "official" | "owner-repo" | "owner-brief" | "owner-archive" | "discovery-winestyle" | "discovery-untappd";

export const SOURCES: Record<SourceId, { label: string; url: string; authoritative: boolean }> = {
  official: { label: "ciderhouse.ru (индексированные страницы)", url: "https://ciderhouse.ru/", authoritative: true },
  "owner-repo": { label: "Материалы владельца бренда · sidrhaus-create/si", url: "https://github.com/sidrhaus-create/si", authoritative: true },
  "owner-archive": { label: "Архив бренда владельца: логотипы, упаковка, пэкшоты", url: "", authoritative: true },
  "owner-brief": { label: "Бриф владельца бренда (структура портфеля)", url: "", authoritative: true },
  "discovery-winestyle": { label: "Winestyle — только для поиска, требует сверки", url: "https://winestyle.ru/cider/cider-house-double-tree/", authoritative: false },
  "discovery-untappd": { label: "Untappd — только для поиска, требует сверки", url: "https://untappd.com/Cider_House_", authoritative: false },
};

// Official URLs confirmed in the search index (titles quoted as indexed).
export const OFFICIAL_PAGES = [
  { path: "/", title: "CIDER HOUSE. Мы создаем настоящий сидр!" },
  { path: "/katalog", title: "Ассортимент CIDER HOUSE" },
  { path: "/map", title: "Где купить Cider House" },
  { path: "/contact", title: "Сотрудничество с Cider House" },
  { path: "/production", title: "Производство" },
  { path: "/non-alcoholic", title: "Безалкогольное направление" },
  { path: "/clients", title: "Партнёры" },
  { path: "/blog", title: "Новости" } /* migrated to /news — see src/data/news.ts */,
] as const;

import type { MetadataRoute } from "next";
import { BRANDS } from "@/data/brands";
import { VERIFIED } from "@/data/catalog";
import { SITE } from "@/data/site";
import { NEWS } from "@/data/news";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "about/", "katalog/", "brands/", "production/", "non-alcoholic/", "map/", "clients/", "contact/", "news/"];
  return [
    ...base.map((p) => ({ url: `${SITE.url}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...BRANDS.filter((b) => !b.site).map((b) => ({ url: `${SITE.url}/brands/${b.slug}/`, priority: 0.6 })),
    ...VERIFIED.map((p) => ({ url: `${SITE.url}/katalog/${p.slug}/`, priority: 0.6 })),
    ...NEWS.map((p) => ({ url: `${SITE.url}/news/${p.slug}/`, lastModified: p.date, priority: 0.5 })),
  ];
}

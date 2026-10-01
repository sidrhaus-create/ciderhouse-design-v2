import type { MetadataRoute } from "next";
import { productFamilies } from "@/data/catalog-content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/production`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...["about", "where-to-buy", "partners", "contacts"].map((path) => ({
      url: `${siteConfig.url}/${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...productFamilies.map((family) => ({
      url: `${siteConfig.url}/brands/${family.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

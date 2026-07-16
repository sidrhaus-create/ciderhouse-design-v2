const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Cider House",
  description:
    "Foundation preview for the Cider House multi-page digital brand platform.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
} as const;

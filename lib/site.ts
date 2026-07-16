const productionUrl = "https://ciderhouse.ru";

export const siteConfig = {
  name: "Cider House",
  description:
    "Сидры и медовухи естественного брожения с яркими вкусами и собственным производством в России.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? productionUrl,
} as const;

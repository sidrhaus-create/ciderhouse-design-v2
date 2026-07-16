# Homepage content sources

Last reviewed: 2026-07-16.

This audit records how the current `ciderhouse.ru` content was reconciled for the new homepage. The live website is treated as a content source, not as a layout, motion, or code source. Final editable copy lives in `data/homepage-content.ts`.

Status meanings:

- **approved** - supplied directly in the implementation brief or backed by an approved repository asset;
- **sourced** - supported by a current live-site page but still editable;
- **requires approval** - visible on the old site or its marketing artwork but disputed, time-sensitive, or missing an independent approved data source;
- **excluded** - intentionally not published.

## Global content decisions

| Topic | Source wording | Final decision | Treatment | Approval |
| --- | --- | --- | --- | --- |
| Brand age | Home and production pages say “8 лет”; production narrative also says “За 7 лет” | “На рынке с 2017 года” | Rewritten as evergreen copy | No |
| Package formats | Home says two formats: bottles and kegs; production says bottles, cans, and kegs | “3 формата: бутылки, банки и кеги” | Most recent internally consistent production wording | No |
| Production locations | Home says two plants; production says three locations | “3 производственные площадки” | Most recent internally consistent production wording | No |
| Brand families | Old FAQ says only Double Tree and White Phoenix; current catalog includes Mister Bee and home promotes a 0% range | Four product worlds: Double Tree, White Phoenix, Mister Bee, 0% | Outdated FAQ statement excluded | No |
| Market leadership | “No1 / №1 по количеству вкусов” | Not published | Excluded because no approved independent source was supplied | Yes, if restored |
| Flavor count | “34 вкуса”, “более 30”, and “от 30” appear in different places | Not published | Excluded as internally inconsistent and changeable | Yes, if restored |
| Capacity | “1 млн. бутылок и 300 тыс. банок в месяц” | Stored as hidden `requires-approval` data | Not rendered | Yes |
| City count | “300 городов” | Stored as hidden `requires-approval` data | Not rendered; evergreen “по России” is used | Yes |
| Product safety / GOST | “Вся продукция безопасна и соответствует нормам ГОСТ” | Not published | Legal/compliance claim excluded | Yes |
| Gluten | Old FAQ makes a universal gluten-safety claim | Not published | Medical/universal safety claim excluded | Yes |
| Footer year | Hard-coded 2024 | Current year generated at runtime | Rewritten | No |

## 1. Age gate

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| Implementation brief; <https://ciderhouse.ru/> | Existing gate: “На сайте демонстрируется алкогольная продукция…” | Brief-supplied 18+ eyebrow, age question, explanatory body, and yes/no actions | Rewritten from brief; stored in `data/legal.placeholder.ts` | Legal review required before launch |

The underage action does not force a hard-coded external redirect. An optional destination is configured through `NEXT_PUBLIC_UNDERAGE_DESTINATION`; without it, the gate shows a neutral access-denied state.

## 2. Header

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/> | Ассортимент, Производство, Где купить, Партнёрам, Контакты | Ассортимент, Бренды, Производство, Где купить, Партнёрам, Контакты | Reconciled with the new sitemap; no Tilda URLs retained | No |

## 3. Hero

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/> | “Мы создаем НАСТОЯЩИЙ сидр!” and production/natural-raw-material copy | “Мы создаём настоящий сидр” plus the brief-supplied supporting copy | Shortened and rewritten | No |

Only the three repository-approved Mister Bee product-lock PNGs are used. The live-site 0% composite and all legacy Tilda images are excluded from production assets.

## 4. Product worlds

| Family | Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- | --- |
| Double Tree | <https://ciderhouse.ru/katalog> | European cider classic; 0.45 l core range; 0.75 l limited range; keg range | Brief-supplied short description plus “0,45 л · лимитированная коллекция 0,75 л · кеги” | Shortened | No |
| White Phoenix | <https://ciderhouse.ru/> | Naturally fermented honey-based drinks with fruit and berry juices | Brief-supplied short description | Shortened and rewritten | No |
| Mister Bee | <https://ciderhouse.ru/katalog> | Current catalog presents Mister Bee as mead, “современная классика” | Brief-supplied description; approved bottle imagery shown unchanged | Rewritten | No |
| 0% | <https://ciderhouse.ru/> | New three-taste non-alcoholic collection | Brief-supplied description | Rewritten; no percentage claim | Collection naming requires final product/legal approval |

The supplied brandbook defines no official product-family accent palette. Product worlds therefore use layout, official master purple, black, white, and functional warm-neutral surfaces rather than invented brand colors.

## 5. Featured 0% collection

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/> | Live promotional artwork shows `Cherry`, `Green Apple`, and `Pomegranate Raspberry`; page text says three tastes | “Вишня”, “Зелёное яблоко”, “Гранат–малина” | Names localized from current official marketing artwork | Yes - names, brand ownership, and legal classification require confirmation |
| Implementation brief | “Вкус сидра. Свобода выбора.” and supplied White Phoenix supporting paragraph | Same supplied headline and supporting paragraph | Copied | Yes - final collection copy and family assignment |

No 0% bottle file exists in `public/assets/products`, so no live-site or AI bottle image is used. The section remains product-data driven and ready for approved assets.

## 6. Brand statement / about

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/> | Long story about expanding cider and mead beyond familiar apple/cherry flavors; every taste comes from research and trials | “Cider House начался с идеи…” short paragraph | Rewritten and shortened | No |
| <https://ciderhouse.ru/production> | Since 2017; three formats; three production locations | Four editable statistics: 2017, three formats, three sites, deliveries across Russia | Reconciled; capacities remain hidden | Production owner should confirm before launch |

## 7. Production scroll story

| Stage | Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- | --- |
| Natural raw materials | <https://ciderhouse.ru/production> | Full universal list of juices/raw materials | Shortened to examples used across different recipes | Rewritten to avoid a universal ingredient claim | No |
| Fermentation | <https://ciderhouse.ru/production> | Apple must or natural honey with wine yeast | Same meaning in concise Russian | Shortened | No |
| Control | <https://ciderhouse.ru/production> | Continuous fermentation control | Same meaning | Shortened | No |
| Temperature | <https://ciderhouse.ru/production> | Automated temperature control for 14–16 days | “примерно 14–16 дней” | Source-noted and editable | Production approval recommended |
| Filtration | <https://ciderhouse.ru/production> | Full filtration after fermentation | Same meaning | Shortened | No |
| Cooling | <https://ciderhouse.ru/production> | Cooling to an exact 0°C | “Перед розливом продукт охлаждают” | Exact temperature excluded | Exact value requires approval |
| Batch testing | <https://ciderhouse.ru/production> | Individual laboratory test; safety and GOST claims | Only individual laboratory quality testing retained | Compliance claims excluded | No for retained wording |
| Filling | <https://ciderhouse.ru/production> | Cans, bottles, kegs | Bottles, cans, and kegs | Copied/reordered | No |

The 210 m well depth, Austrian specialists, shelf-life reasoning, safety/GOST claim, and production-capacity figures are excluded from the homepage.

## 8. Where to buy

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/map> | Large retailer list organized by federal district and city | “Продукция представлена в торговых сетях и специализированных магазинах по всей России.” | Shortened and made evergreen | No |
| <https://ciderhouse.ru/map> | Moscow, Saint Petersburg, Krasnodar, Kazan, Ekaterinburg, Novosibirsk and many other cities appear in the list | Six representative city labels only | Shortened; full list not copied | Availability refresh recommended |

## 9. Partnership

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/clients> | Materials for partners, product photos, logos, flyers, contacts; audience selector includes distributor, retail, HoReCa, draft-beverage shop | Brief-supplied B2B headline/body and four audience labels | Shortened and rewritten | No |

The old form and Yandex Disk links are not placed on the homepage. The CTA uses the planned `/partners` route with a temporary internal redirect to the homepage partnership section.

## 10. Social / content

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/blog> | News heading with no meaningful article feed on the page | No article cards; an explicit clean editorial empty state | Excluded fake/empty news | No |
| <https://ciderhouse.ru/> | Links to VK, Telegram, YouTube, Instagram | Exact live hrefs: `vk.com/cider_house`, `t.me/ciderhousee`, `youtube.com/@ciderhouse6372`, `instagram.com/ciderhouse.ru/` | Copied from current HTML | Social owner should confirm handles before launch |
| <https://ciderhouse.ru/> | Instagram legal note | Same required Russian legal note | Copied | Legal review recommended |

## 11. FAQ

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| <https://ciderhouse.ru/> | Product difference question includes European technology, Austrian recipe, 100% juices and broad quality claims | Neutral answer about families, natural fermentation, and product-specific characteristics | Rewritten; unsupported universal claims excluded | No |
| <https://ciderhouse.ru/map> | Where to buy and large store list | Concise answer linking to “Где купить” | Shortened | No |
| <https://ciderhouse.ru/> | Alcohol delivery prohibited, with an old legal citation | Neutral statement: no direct alcohol sale/delivery on the site; use store list | Rewritten to avoid stale legal citation | Legal review recommended |
| <https://ciderhouse.ru/production> | Bottles, cans, kegs | Concise three-format answer with availability caveat | Rewritten | No |
| <https://ciderhouse.ru/clients> | Partner materials and contact form | Concise link to partner section | Rewritten | No |

The outdated “only two lines” answer and universal gluten-safety answer are excluded.

## 12. Final CTA and footer

| Source URL | Source wording | Final wording | Treatment | Approval |
| --- | --- | --- | --- | --- |
| Implementation brief | “Открой свой вкус” with assortment and where-to-buy actions | Same | Copied | No |
| <https://ciderhouse.ru/clients> | `+7 (495) 177-12-64`, `a@ciderhouse.ru` | Same | Copied | Contact owner should confirm |
| <https://ciderhouse.ru/> | `info@ciderhouse.ru`, ООО “Сидр Хаус”, hard-coded 2024 | Same email and correct `ООО «Сидр Хаус»`; current year generated | Rewritten | Company/legal wording should be confirmed |

No `project5183165.tilda.ws` link is retained anywhere in homepage content or navigation.

## Assets and unresolved production inputs

Homepage-approved repository assets used:

- official Cider House horizontal black and white SVG logos;
- official colibri SVG;
- extracted White Phoenix and Double Tree raster logo references, explicitly marked temporary in `ASSET-STATUS.md`;
- three approved Mister Bee transparent product-lock PNGs.

Still missing:

- approved Double Tree, White Phoenix, and 0% product PNG/WebP assets;
- clean vector White Phoenix and Double Tree logo masters;
- standalone Mister Bee and 0% logos;
- approved production photography;
- approved desktop/mobile hero video and posters;
- licensed master website fonts and family fonts;
- partner logos and approved social imagery.

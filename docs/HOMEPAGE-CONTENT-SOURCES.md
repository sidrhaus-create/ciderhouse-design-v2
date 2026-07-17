# Homepage content sources

Last reviewed: 2026-07-17.

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

The three repository-approved Mister Bee product-lock PNGs remain the hero source. The official live-site 0% composite is now also stored locally and used only in the two 0% product scenes. No browser screenshots, reconstructed bottles, or unrelated legacy Tilda images are used.

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

The official live homepage publishes one transparent 1680 × 1645 PNG containing all three exact bottles and its original 0% graphic. That complete source is stored unchanged as `/assets/products/zero/cider-house-zero-collection-official.png`. The source does not expose the bottles as separate files, so they are not split, traced, background-removed, or reconstructed.

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
- three approved Mister Bee transparent product-lock PNGs;
- the official live-site 0% three-bottle transparent composition.

Still missing:

- locally ingested original Double Tree and White Phoenix bottle masters;
- separate original files for the three 0% bottles (the official site publishes only the combined composition);
- clean vector White Phoenix and Double Tree logo masters;
- standalone Mister Bee and 0% logos;
- approved production photography;
- approved desktop/mobile hero video and posters;
- licensed master website fonts and family fonts;
- partner logos and approved social imagery.

## Official product image inventory - 2026-07-17

The following URLs are the `data-original` or direct image URLs exposed by the current official homepage and catalog. They are source records, not permission to redraw or alter packaging. The local environment successfully acquired only the official 0% group source; the catalog originals remain documented but not copied because both available download paths were blocked during this pass.

### White Phoenix catalog bottle cutouts

| Official SKU label | Original image URL | Local status |
| --- | --- | --- |
| Дыня-мята | <https://static.tildacdn.com/tild3333-3964-4464-b566-663465326666/8.png> | Source found; not ingested |
| Кокос-цитрус | <https://static.tildacdn.com/tild3665-3432-4433-a464-366139373436/3.png> | Source found; not ingested |
| Грейпфрут-маракуйя | <https://static.tildacdn.com/tild3364-3639-4165-b938-316463336636/4.png> | Source found; not ingested |
| Клубника | <https://static.tildacdn.com/tild3366-6539-4330-a662-366630306662/1.png> | Source found; not ingested |
| Сицилийский апельсин | <https://static.tildacdn.com/tild3563-6364-4266-b064-303839313330/9.png> | Source found; not ingested |
| Виноград-мандарин | <https://static.tildacdn.com/tild3338-3065-4132-a166-323039383331/7.png> | Source found; not ingested |
| Тёмная вишня | <https://static.tildacdn.com/tild3739-6237-4163-b532-306264313038/2.png> | Source found; not ingested |
| Манго-чили | <https://static.tildacdn.com/tild6362-3063-4361-b632-306439653135/11.png> | Source found; not ingested |
| Манго-цитрус | <https://static.tildacdn.com/tild6236-6663-4236-b030-633539363965/10.png> | Source found; not ingested |
| Гранат-малина | <https://static.tildacdn.com/tild3533-3665-4037-b537-393634373930/6.png> | Source found; not ingested |
| Персик-абрикос | <https://static.tildacdn.com/tild3733-3531-4139-a536-313737353936/white_phoenix_peach.png> | Source found; not ingested |
| Персик-банан | <https://static.tildacdn.com/tild3034-3333-4666-b533-663362316131/_.png> | Source found; not ingested |
| Облепиха-лимон | <https://static.tildacdn.com/tild3762-3639-4061-b036-343135626337/white_phoenix.png> | Source found; not ingested |
| Питахайя-киви | <https://static.tildacdn.com/tild3033-3965-4864-b935-633563376564/__1.png> | Source found; not ingested |
| Вишня-маракуйя | <https://static.tildacdn.com/tild6230-3561-4638-b666-366134383236/___1.png> | Source found; not ingested |

### Mister Bee catalog bottle cutouts

| Official SKU label | Original image URL | Local status |
| --- | --- | --- |
| Тропический банан-вишня | <https://static.tildacdn.com/tild6338-3733-4430-a463-346531303835/__3.png> | Source found; not ingested |
| Яркая клюква | <https://static.tildacdn.com/tild6139-3063-4961-a463-373063613766/__2.png> | Source found; not ingested |
| Сочная слива | <https://static.tildacdn.com/tild6631-6231-4764-a461-613733326464/__1.png> | Source found; not ingested |
| Ароматная фейхоа | <https://static.tildacdn.com/tild3339-3139-4563-b363-656166343834/__4.png> | Source found; not ingested |
| Классическая медовуха | <https://static.tildacdn.com/tild3564-3234-4534-b132-323463366162/__6.png> | Source found; repository uses the separately supplied approved attachment |
| Лимонная свежесть | <https://static.tildacdn.com/tild3732-3839-4336-b562-313233336461/__5.png> | Source found; repository uses the separately supplied approved attachment |
| Терпкий гранат-виноград | <https://static.tildacdn.com/tild6535-6664-4363-b432-333233633038/__7.png> | Source found; repository uses the separately supplied approved attachment |

### Double Tree 0.45 l catalog bottle cutouts

| Official SKU label | Original image URL | Local status |
| --- | --- | --- |
| Груша | <https://static.tildacdn.com/tild6163-3533-4130-b636-663732396137/pic_13_-min.png> | Source found; not ingested |
| Тёмная вишня | <https://static.tildacdn.com/tild3232-3163-4430-b636-643963646239/pic_11_-min.png> | Source found; not ingested |
| Зелёное яблоко | <https://static.tildacdn.com/tild3062-3266-4234-b637-303136623061/pic_21_-min.png> | Source found; not ingested |
| Красное яблоко | <https://static.tildacdn.com/tild6662-3633-4362-b965-303766323462/pic_19_-min.png> | Source found; not ingested |
| Малина | <https://static.tildacdn.com/tild6365-6539-4235-b164-613363373263/pic_15_-min.png> | Source found; not ingested |
| Лесные ягоды | <https://static.tildacdn.com/tild6536-3636-4430-b030-666266623265/-min.png> | Source found; not ingested |
| Чёрная смородина | <https://static.tildacdn.com/tild3136-6334-4664-a131-626262623434/pic_23_-min.png> | Source found; not ingested |
| Арбуз-мята | <https://static.tildacdn.com/tild6331-3439-4633-a262-373137633964/pic_05_-min.png> | Source found; not ingested |
| Кокос-малина | <https://static.tildacdn.com/tild3438-3763-4639-b063-313866383035/pic_07_-min.png> | Source found; not ingested |
| Гранат-мята | <https://static.tildacdn.com/tild6138-3233-4565-b866-396162353565/pic_03_-min.png> | Source found; not ingested |
| Лимон-лайм | <https://static.tildacdn.com/tild3530-3337-4534-b035-313463376132/pic_01_-min.png> | Source found; not ingested |
| Карибский киви | <https://static.tildacdn.com/tild6334-3562-4736-a666-633834396138/pic_09_-min.png> | Source found; not ingested |

### Double Tree 0.75 l catalog bottle cutouts

| Official SKU label | Original image URL | Local status |
| --- | --- | --- |
| Жёлтая груша | <https://static.tildacdn.com/tild3633-3533-4339-a639-313064353236/pic_05_-min.png> | Source found; not ingested |
| Тёмная вишня | <https://static.tildacdn.com/tild3266-6461-4238-b661-306336316665/pic_09_-min.png> | Source found; not ingested |
| Зелёное яблоко | <https://static.tildacdn.com/tild6263-3730-4938-b530-393261343639/pic_07_-min.png> | Source found; not ingested |
| Красное яблоко | <https://static.tildacdn.com/tild6364-3839-4931-b766-393961346430/pic_03_-min.png> | Source found; not ingested |
| Гранат-малина | <https://static.tildacdn.com/tild6465-3830-4966-a438-646138346133/pic_01_-min.png> | Source found; not ingested |

### Non-alcoholic three-bottle source

| Official source | Original image URL | Local status |
| --- | --- | --- |
| Cherry, Green Apple, Pomegranate Raspberry group; the published file includes the original neon `0%` device | <https://static.tildacdn.com/tild6631-3138-4664-b237-316135613837/000.png> | Approved local byte-for-byte copy: `public/assets/products/zero/cider-house-zero-collection-official.png`; 1680 × 1645; SHA-256 `4C7DDB277279ED12724FB7A91BC478921C3828C91F1CF0AF1846AE06ADA6557B` |

The source artwork itself uses `0%` and `NON-ALCOHOLIC` packaging language. No separate official technical specification establishing `0.0%` or `≤0.5%` was found in the inspected pages, so the implementation does not add either unsupported numeric claim.

### Additional official product photography found

| Subject | Original image URL | Local status |
| --- | --- | --- |
| White Phoenix product photography | <https://static.tildacdn.com/tild3834-3836-4035-b061-356430396466/IMG_5738.jpg> | Source found; not ingested |
| White Phoenix Grapefruit-Passionfruit photography | <https://static.tildacdn.com/tild3331-6466-4364-b830-313333656436/IMG_20240814_160748_.jpg> | Source found; not ingested |
| Double Tree 0.75 l product photography | <https://static.tildacdn.com/tild6334-3934-4639-a335-373566333262/noroot.png> | Source found; not ingested |
| Mixed White Phoenix and Double Tree photography | <https://static.tildacdn.com/tild3536-3166-4464-b933-313637393931/IMG_20240904_105410_.jpg> | Source found; not ingested |

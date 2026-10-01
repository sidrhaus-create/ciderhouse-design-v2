# Asset status - production candidate

> **Update 2026-10-01.** (1) Fifteen Double Tree / White Phoenix bottle files were renamed so each filename matches the label art inside it — bytes unchanged; see `docs/HOMEPAGE-CONTENT-SOURCES.md` § "Asset corrections and additions". (2) Four official Mister Bee catalog cutouts were added as `products/mister-bee/mister-bee-catalog-{cranberry,feijoa,plum,cherry-banana}-front.png` (91×435, low resolution, small display sizes only). (3) Four official photographs were added under `photography/`. (4) `fonts/` now holds interim SIL-OFL fonts (Unbounded, Manrope) — see `fonts/README.md`; they are not brand typography. Per-file hashes are in the audit document. The usage paragraphs below describe the previous site and are superseded by the campaign redesign (hero slider, runway, catalogue explorer).

Last reviewed: 2026-07-20. All original attachments were re-inspected. The authoritative extraction record is `brand/guidelines/BRANDBOOK-EXTRACTION.md`. This pass wires the previously-ingested Double Tree and White Phoenix catalog originals into the new `/catalog` and `/brands/[slug]` routes; see `docs/CATALOG-CONTENT-SOURCES.md` for the catalog-specific content audit.

Homepage usage: the hero, Mister Bee product world, production story, and final CTA use the three approved Mister Bee product-lock PNGs. The two 0% scenes use one unchanged transparent product composition downloaded from the official Cider House homepage. Double Tree and White Phoenix each show two original official bottle cutouts (in addition to their existing raster family logo) instead of a text-only placeholder poster.

Catalog and family-page usage: `/catalog` (redesigned 2026-07-21, refined same day — see `docs/CATALOG-CONTENT-SOURCES.md` § "Catalog visual redesign" and § "Catalog visual refinement (fourth pass)") now shows an enlarged asymmetric hero composition (one focal bottle + two dimmed secondary bottles), a paired two-bottle composition for Double Tree with additional verified products in larger modules below, a single dominant focal bottle plus two bare (uncarded) secondary bottles for Mister Bee, and a large product spotlight for White Phoenix and Zero. The three asset-less families (DTREE PARTY, Migliore, Bumble Coffee) each render an individually-styled, honest, public-facing "coming soon" pending state with zero imagery — never a placeholder bottle. `/brands/double-tree` and `/brands/white-phoenix` still use all 17 and all 15 official catalog originals respectively as full product listings (unchanged); `/brands/mister-bee` still uses the same 3 approved product-lock bottles plus 4 name-only `asset-missing` entries (unchanged); `/brands/zero` still uses the same unchanged composite as its only visual (unchanged). No product image file was modified, regenerated, or replaced in either pass — only the CSS/JSX presentation of the existing approved assets changed.

Three additional families — **DTREE PARTY**, **Migliore**, **Bumble Coffee** — were added to the catalog data architecture and navigation this pass. A full source sweep of every URL in `ciderhouse.ru`'s live sitemap (home, `/katalog`, `/ph`, `/production`, `/map`, `/merch`, `/blog`, `/clients`, `/festival`) plus targeted web search found **no official logo, product image, or product fact for any of the three** — see `docs/CATALOG-CONTENT-SOURCES.md` for the full per-family research record. No asset was downloaded, generated, or substituted for these three families; their family pages render an intentional "изображение пока не подтверждено" state instead.

## Approved

| Asset | Repository file | Verification and permitted scope |
| --- | --- | --- |
| Original brandbook | `brand/guidelines/cider-house-brandbook-original.pdf` | Byte-identical copy of supplied `БРЕНДБУК.pdf`; SHA-256 `44A7851357708FDF2C4372ABEC791805320B9CF9B9140E1A2421065FE52D5694`. |
| Master horizontal logo, black | `brand/master-logo/cider-house-logo-horizontal-black.svg` | Direct native-path export from the PDF; approved for light backgrounds. |
| Master horizontal logo, white | `brand/master-logo/cider-house-logo-horizontal-white.svg` | Direct native-path export from the PDF; approved for dark or official-purple backgrounds. |
| Master badge, black | `brand/master-logo/cider-house-logo-badge-black.svg` | Direct native-path export from the PDF. |
| Master badge, white on purple | `brand/master-logo/cider-house-logo-badge-white-on-purple.svg` | Direct native-path export retaining the PDF's official `#6B3077` square. |
| Colibri, black | `brand/symbols/cider-house-colibri-black.svg` | Direct native-path export from the PDF. |
| Colibri, white | `brand/symbols/cider-house-colibri-white.svg` | Direct native-path export from the PDF. |
| Mister Bee Classic bottle | `products/mister-bee/mister-bee-foundation-01-front.png` | Byte-identical copy of supplied product-lock image. |
| Mister Bee Lemon bottle | `products/mister-bee/mister-bee-foundation-02-front.png` | Byte-identical copy of supplied product-lock image. |
| Mister Bee Pomegranate Grape bottle | `products/mister-bee/mister-bee-foundation-03-front.png` | Byte-identical copy of supplied product-lock image. |
| Official Cider House 0% three-bottle composition | `products/zero/cider-house-zero-collection-official.png` | Unchanged transparent source from the [official homepage](https://ciderhouse.ru/): 1680×1645 ARGB PNG, SHA-256 `4C7DDB277279ED12724FB7A91BC478921C3828C91F1CF0AF1846AE06ADA6557B`. It contains Cherry, Green Apple, and Pomegranate Raspberry bottles plus the official 0% graphic. Approved only as a complete composition; do not split or reconstruct it. |
| Double Tree — Груша (0.45 л, homepage) | `products/double-tree/double-tree-045-pear-front.png` | Byte-for-byte copy of the official [catalog](https://ciderhouse.ru/katalog) source; 1680×2100 transparent PNG, SHA-256 `63576A8A52E3E5472AB2F1002EA24FFEFFABD76927939CFC73C14AC2CC4A8A0B`. |
| Double Tree — Тёмная вишня (0.45 л, homepage) | `products/double-tree/double-tree-045-dark-cherry-front.png` | Byte-for-byte copy of the official [catalog](https://ciderhouse.ru/katalog) source; 1680×2100 transparent PNG, SHA-256 `A242615FF556F98CE4E5063995BA9E35307C853496B86CBF2BA3383CFDDE7202`. |
| White Phoenix — Вишня-маракуйя (homepage) | `products/white-phoenix/white-phoenix-cherry-passionfruit-front.png` | Byte-for-byte copy of the official [homepage](https://ciderhouse.ru/) source; 1680×2100 transparent PNG, SHA-256 `67A275FB76F33ECD92D65B18709728C4900B0FB6C9A07A9C20AC229FD3435F61`. |
| White Phoenix — Питахайя-киви (homepage) | `products/white-phoenix/white-phoenix-pitaya-kiwi-front.png` | Byte-for-byte copy of the official [homepage](https://ciderhouse.ru/) source; 1680×2100 transparent PNG, SHA-256 `7AEC4B2D69DB0F15C74CD4786908224AC7A29FC50E89D7596E9BADE38F9FF169`. |
| 15 additional Double Tree bottle originals (10 more 0.45 l flavors + all 5 of the 0.75 l line) | `products/double-tree/double-tree-{045,075}-*-front.png` | Byte-for-byte official catalog originals, 1680×2100 transparent PNG each. Wired into `/brands/double-tree` as the full product listing. Full per-file source URLs, filenames, and hashes are in `docs/HOMEPAGE-CONTENT-SOURCES.md`. |
| 13 additional White Phoenix bottle originals | `products/white-phoenix/white-phoenix-*-front.png` | Byte-for-byte official catalog/homepage originals, transparent PNG, each 640×800 — that is the actual `data-original` resource the live site itself publishes for these thirteen SKUs, not a locally created thumbnail. Wired into `/brands/white-phoenix` as part of the full product listing. Full per-file source URLs, filenames, and hashes are in `docs/HOMEPAGE-CONTENT-SOURCES.md`. |

The extracted SVGs preserve existing PDF vector operators. They were not traced, redrawn, simplified, retyped, or recolored. All 32 newly ingested Double Tree and White Phoenix files are unmodified downloads: no resize, crop, recolor, background edit, or format conversion was applied.

All six SVGs parsed successfully, rendered at high density without clipping or non-uniform scaling, and matched the corresponding brandbook artwork in visual comparison. Both foundation preview routes and every extracted asset URL returned HTTP 200 during local verification.

## Temporary

| Asset | Repository file or treatment | Reason |
| --- | --- | --- |
| White Phoenix logo | `brand/family-logos/white-phoenix-logo-raster-source.png` | Original PDF image stream extracted without resampling; the PDF contains no vector version. Suitable for reference/preview, but not a substitute for a clean vector master. |
| Double Tree logo | `brand/family-logos/double-tree-logo-raster-source.png` | Original PDF image stream and transparency mask extracted without resampling; the PDF contains no vector version. |
| Interface typography | Tokenized Arial/Helvetica fallback | The brandbook names fonts but supplies no licensed files and no master-site typography family. |
| Product/brand/article/store content | `data/preview-content.ts` | Clearly labelled foundation placeholder data. |

## Missing from the inspected attachment set

“Missing” here means not available as a standalone safely extractable production file in the attachments already supplied. It is not a request to resend the same attachments.

| Required asset | Exact status after inspection |
| --- | --- |
| Licensed White Phoenix font | `Sauna-SmallCaps` is named in the PDF, but no complete `.woff2`, `.woff`, `.ttf`, or `.otf` file is present. |
| Licensed Double Tree font | `Cera PRO Medium` is named in the PDF, but no complete font file is present. |
| Master website typography | No master display/body family, weights, or licensed files are identified in the PDF. |
| White Phoenix vector logo | Raster source only in the PDF; an SVG cannot be created without prohibited tracing. |
| Double Tree vector logo | Raster source only in the PDF; an SVG cannot be created without prohibited tracing. |
| Mister Bee standalone logo | The identity is integrated into bottle-label artwork; no clean standalone master exists in the inspected attachments. |
| 0% standalone logo | No separate 0% logo object or source file exists in the inspected attachments. |
| Logo clear-space/minimum-size specification | Not documented in the supplied brandbook artboard. |
| Master patterns/textures/icons | No standalone pattern, texture, icon set, or illustration construction source exists in the PDF. |
| Desktop hero video and poster | No video, poster, first/final frame, or scroll specification is present among the inspected attachments. |
| Mobile hero video and poster | No mobile video/poster source or mobile safe-area specification is present. |
| Production photography | No production/facility/process photography is present. |
| Partner logos | No partner-logo files or partner metadata are present. |
| Individual 0% bottle masters | The official homepage exposes the three approved 0% bottles only as one transparent composition. No independent original files were found, so the composition has not been split or reconstructed. |
| Additional product angles | No approved 3/4, back, cap/top, shadow, or source-editable product files are present for any family. |
| DTREE PARTY logo, product images, product names | Not found anywhere in the inspected attachments or on any live official page checked 2026-07-20 (see `docs/CATALOG-CONTENT-SOURCES.md`). |
| Migliore logo, product images, product names | Same as above — no official source found. |
| Bumble Coffee logo, product images, product names, container type | Same as above — no official source found; even the container type (bottle/can/other) is unconfirmed. |

## Replace-before-production

| Current item | Required action |
| --- | --- |
| White Phoenix and Double Tree raster logo extractions | Use clean approved vector masters if they become available; never auto-trace the PNGs. |
| Temporary system font stack | Connect complete licensed webfonts through `next/font/local` only after files and rights are verified. |
| `data/products.template.csv` example row | Replace with approved SKU metadata; never publish the example. |
| `data/preview-content.ts` | Replace foundation-only preview facts before those records are reused outside preview routes. |
| `data/legal.placeholder.ts` | Production-candidate age-gate copy is implemented but still requires final legal approval. |
| Preview-only canonical/SEO configuration | Supply production origin, share images, indexation decisions, and redirects before launch. |
| Three Mister Bee foundation filenames | Map to approved stable SKU filenames when the product data source is finalized; preserve source pixels. |
| Official Cider House 0% composition | Confirm final rights/usage approval and the product naming/classification copy before production; preserve the file unchanged. |
| Double Tree and White Phoenix bottle originals (32 files ingested this pass) | Confirm final usage/rights approval before production; files themselves require no further action and must remain unmodified. |

## Official live-site source inventory

- The [official Cider House catalog](https://ciderhouse.ru/katalog) was inspected on 2026-07-17.
- Exact original source URLs were recorded for 15 White Phoenix bottles, 7 Mister Bee bottles, 12 Double Tree 0.45 L bottles, and 5 Double Tree 0.75 L bottles.
- Exact source URLs for four official product photographs were also recorded.
- All 15 White Phoenix and all 17 Double Tree (12 × 0.45 L + 5 × 0.75 L) bottle originals were downloaded byte-for-byte on 2026-07-17 and are now local repository files under `public/assets/products/white-phoenix/` and `public/assets/products/double-tree/`. Two per brand are wired into the homepage; the rest are reserved for future catalog/product pages.
- The complete URL-level inventory (source URL, repository filename, dimensions, local status) is maintained in `docs/HOMEPAGE-CONTENT-SOURCES.md`.
- The four official product photographs and the seven Mister Bee catalog cutouts remain source-found-but-not-ingested (Mister Bee already uses a separately supplied approved product-lock set instead).
- On 2026-07-20, every URL listed in the official site's own `sitemap.xml` (`/`, `/katalog`, `/ph`, `/production`, `/map`, `/merch`, `/blog`, `/clients`, `/festival`, plus `/contact`) was fetched and text-searched for "DTREE PARTY", "Migliore", and "Bumble Coffee" (including Cyrillic transliterations). None of the three names, or any product/logo/image associated with them, appear anywhere on the official site.

## Official color resolution

- Master primary: Purple, Pantone 7663 C, `#6B3077`, RGB 107/48/119, CMYK 70/93/16/5.
- Secondary: White `#FFFFFF` and Black `#000000`.
- The former `#5D2F6A` value does not appear in the supplied brandbook and is not the active master-primary token.
- No official additional purple shades or product-family accent colors are documented in the supplied PDF.

## Explicitly excluded

- The two supplied `ChatGPT Image...` fruit-vessel images remain visual concept references only. They are not approved packaging, logos, or production photography and are not copied into production asset folders.
- Mister Bee label illustrations are protected packaging art, not a source for standalone logos, patterns, icons, or claims.

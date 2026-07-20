# Catalog and family page content sources

Last reviewed: 2026-07-20 (second pass — added DTREE PARTY, Migliore, Bumble Coffee and the catalog visual-motion system). This audit records how `/catalog` and the seven `/brands/[slug]` family pages were built from `data/catalog-content.ts`. The live `ciderhouse.ru` site (home and `/katalog`) is treated as a content source only — never as a layout, motion, or code source. This document does not replace or overwrite `docs/HOMEPAGE-CONTENT-SOURCES.md`, which remains the authoritative audit for the homepage and for the exact original CDN URL, pixel dimensions, and SHA-256 hash of every downloaded product image. This document adds the catalog-specific decisions: which sourced facts became typed fields, what was excluded, and what still requires approval.

Family order across every navigation surface (catalog family nav, catalog sections, header brands menu, footer, cross-links): **Double Tree → DTREE PARTY → White Phoenix → Mister Bee → Migliore → Bumble Coffee → Без алкоголя.**

Status meanings (`CatalogContentStatus` in `types/catalog.ts`):

- **approved** — matches an already-approved homepage record or an explicitly supplied approved asset.
- **sourced** — backed by the live `ciderhouse.ru` catalog/home pages, byte-for-byte asset already ingested, not yet promoted to a fully reviewed marketing placement.
- **requires-approval** — visible on the old site or implied by brief context but not independently confirmed, or explicitly flagged for legal/product review.
- **asset-missing** — the product name/flavor is sourced, but no safe, approved image exists; the UI renders an intentional missing-image state instead of a placeholder bottle.
- **unavailable** — reserved for future use (no current record uses this status).

## Global content decisions

| Topic | Source wording | Final decision | Treatment | Approval |
| --- | --- | --- | --- | --- |
| Route architecture | `docs/02-SITEMAP.md` proposes `/catalog` with sub-category paths and `/product/[slug]`; this milestone's brief asks only for `/catalog` and four `/brands/[slug]` pages | Implemented exactly `/catalog` + `/brands/double-tree`, `/brands/white-phoenix`, `/brands/mister-bee`, `/brands/zero` | Sub-category and per-product routes deferred, not built | No |
| Navigation labels | Brief-supplied final Russian labels | Ассортимент, Double Tree, White Phoenix, Mister Bee, Без алкоголя, Где купить, Партнёрам | `homepageContent.navigation` already matched the desktop 6-label set before this pass; family nav on `/catalog` and cross-links on `/brands/[slug]` use the four family `navLabel` values | No |
| Sweetness classification | Not present anywhere in inspected source pages or the brandbook | Omitted from every product record (`sweetness` field left `undefined` everywhere) | Explicitly not invented | N/A |
| Alcohol classification | No ABV percentage is published anywhere in inspected pages for Double Tree, White Phoenix, or Mister Bee | Category-level classification only: "Алкогольный напиток (сидр)" / "Алкогольный напиток (медовуха)" | No numeric percentage invented for any alcoholic family | No |
| Zero alcohol wording | Composite artwork itself shows `0%` and `NON-ALCOHOLIC`; no separate technical spec (`0.0%` or `≤0.5%`) found | "0% согласно маркировке официальной упаковки; отдельная техническая спецификация … источником не подтверждена" | Reuses the exact packaging language, explicitly declines to add an unconfirmed numeric spec | Yes — final legal alcohol wording for Zero |
| Double Tree / White Phoenix keg format | Homepage detail copy (already approved): "…бутылки и кеги" | `formats: ["bottle", "keg"]` for both families | Reused already-approved homepage wording as the format source instead of re-deriving it | No |
| Mister Bee format | No Mister Bee–specific keg/can source found (only bottle cutouts exist in the catalog inventory) | `formats: ["bottle"]` only | Did not assume company-wide "bottles, cans, kegs" copy applies to this specific family | No |
| Mister Bee additional flavors | `/katalog` lists Тропический банан-вишня, Яркая клюква, Сочная слива, Ароматная фейхоа with source images, but the project's approved product-lock set has only 3 bottles | Kept as 4 `asset-missing` product records | Demonstrates the missing-data path instead of silently dropping known flavors | Yes — image sourcing/approval before publishing |
| Zero individual bottles | Official homepage exposes only one combined transparent composite, no separate bottle files | 3 `asset-missing` product records (Вишня, Зелёное яблоко, Гранат–малина), each pointing to the same shared composite for display, never split | `missingAssetNote` on the family record states this explicitly; product cards render the intentional missing-image state, not the composite repeated three times | Yes — final collection naming/legal, per `docs/HOMEPAGE-CONTENT-SOURCES.md` §5 |
| DTREE PARTY / Migliore / Bumble Coffee existence | Names supplied directly in this milestone's task instructions, not found on any inspected official page (see per-family sections below) | Routes, navigation entries, and typed `ProductFamily` records created with `status: "requires-approval"`, zero products, zero formats, zero hero assets | Structure and navigation are ready in advance; no category, description, flavor, format, volume, or image is invented for any of the three | Yes — full content and asset sourcing required before these read as real product lines |
| Family visual theme | No official family accent colors are documented in the brandbook (confirmed again this pass) | Added a `theme` token (`warm`/`purple`/`dark`/`muted`) per family, reusing only already-established site colors (`--color-home-warm`, `--color-brand-primary`, `--color-home-dark`/`--color-black`, `--color-paper-muted`) | Purely a decorative section-rhythm assignment, not a brand-color claim; no new hex values were introduced | No |

## Double Tree

- Source page: `https://ciderhouse.ru/katalog`
- Source wording: European cider classic; 0.45 l core range; 0.75 l limited range; keg range (per `docs/HOMEPAGE-CONTENT-SOURCES.md` §4)
- Final wording (story, rewritten, not copied verbatim): "Double Tree — европейская классика сидра в портфеле Cider House, построенная вокруг ярких яблочных, фруктовых и ягодных сочетаний. Основная коллекция выпускается в бутылках 0,45 л; отдельная лимитированная линия — в бутылках 0,75 л. Часть вкусов подтверждена также в формате кег."
- Fields used: family description (reused verbatim from the already-approved `data/homepage-content.ts` entry), story, 17 product records (name, flavor, format, volume, alcohol classification, asset, availability/approval status, source URL), formats, character notes, logo, hero composition (2 bottles).
- Excluded/conflicting information: none found; the 0.45 l and 0.75 l ranges are internally consistent across every inspected page.
- Approval status: family — `sourced`; 2 homepage-selected SKUs (Груша, Тёмная вишня 0.45 л) — `approved`; remaining 15 SKUs — `sourced`.
- Missing assets: none for this family — all 17 official catalog cutouts (12 × 0.45 l, 5 × 0.75 l) were already downloaded byte-for-byte in the prior pass and are used here.
- Legal/content concerns: none beyond the standing "no percentage/claims without approval" rule; no ABV, award, or certification claim is made anywhere on the family page.
- Per-SKU inventory (original CDN URL, exact pixel dimensions, SHA-256): see `docs/HOMEPAGE-CONTENT-SOURCES.md` § "Double Tree 0.45 l / 0.75 l catalog bottle cutouts" and `public/assets/ASSET-STATUS.md`.

Two facts worth noting for traceability: **Тёмная вишня, Зелёное яблоко, and Красное яблоко** each exist as two genuinely distinct official files (one per volume line) — the corresponding product records carry a `facts` entry cross-referencing the sibling SKU rather than treating them as duplicates.

## DTREE PARTY

- **Official source search performed 2026-07-20**: fetched and text-searched (case-insensitive, including Cyrillic transliterations "Дтри"/"Пати") every URL listed in `ciderhouse.ru`'s own live `sitemap.xml` — `/` (home), `/katalog`, `/ph` (an alternate full assortment page, title "Ассортимент CIDER HOUSE"), `/production`, `/map`, `/merch`, `/blog`, `/clients`, `/festival`, `/contact` — plus targeted web searches for "Cider House DTREE PARTY" and checked this repository's existing approved assets and `BRANDBOOK-EXTRACTION.md`. **Zero matches found anywhere.**
- Source page used for the record's `sourceUrl`: `https://ciderhouse.ru/katalog` (the general assortment page, as the most relevant page where such a family would be expected to appear if published).
- Source wording: none found.
- Final wording: honest placeholder only — "Официальное описание пока не опубликовано — раздел подготовлен заранее," plus a story paragraph documenting exactly which pages were checked and on what date.
- Fields used: `slug`, `navLabel`, `title` (exact capitalization "DTREE PARTY" as supplied in task instructions — this is the only fact taken from the task itself, not from an independent official source), `categoryLabel: "Категория уточняется"`, `theme: "purple"`. `heroAssets`, `formats`, `characterNotes`, and `products` are all empty arrays.
- Excluded/conflicting information: none to exclude — no category, flavor, format, volume, logo, or image was found to either include or conflict with.
- Approval status: family — `requires-approval`. No product records exist to have their own status.
- Missing assets: everything — no logo, no product images, no hero composition. The family hero renders an intentional "Официальное изображение пока не подтверждено" state instead of any generated or substituted imagery.
- Legal/content concerns: the family's entire public identity (name legitimacy, category, product range) requires confirmation before this route should be promoted anywhere beyond internal review.

## White Phoenix

- Source page: `https://ciderhouse.ru/` (homepage) and `https://ciderhouse.ru/katalog` (13 lower-resolution SKUs)
- Source wording: "Naturally fermented honey-based drinks with fruit and berry juices" (per `docs/HOMEPAGE-CONTENT-SOURCES.md` §4)
- Final wording (story, rewritten): "White Phoenix — медовуха естественного брожения на медовой основе из портфеля Cider House. Вкусовая линейка построена на ярких фруктовых и ягодных сочетаниях и выпускается в бутылках и кегах."
- Fields used: same shape as Double Tree — 15 product records, formats, character notes, logo (raster source, used exactly as extracted, no tracing/recreation/simplification/recoloring), hero composition (the two full-resolution 1680×2100 bottles already used on the homepage).
- Excluded/conflicting information: no volume (l) figure was ever sourced per White Phoenix SKU (unlike Double Tree), so `volume` is intentionally left unset on every White Phoenix product record rather than assumed.
- Approval status: family — `sourced`; Вишня-маракуйя and Питахайя-киви (the only two published at full 1680×2100 resolution) — `approved`; remaining 13 SKUs (640×800 originals) — `sourced`.
- Missing assets: none — all 15 official SKUs were already ingested byte-for-byte.
- Legal/content concerns: none beyond the standing claims policy.
- Per-SKU inventory: see `docs/HOMEPAGE-CONTENT-SOURCES.md` § "White Phoenix catalog bottle cutouts" and `public/assets/ASSET-STATUS.md`.

## Mister Bee

- Source page: `https://ciderhouse.ru/katalog`
- Source wording: catalog presents Mister Bee as mead, "современная классика" (per `docs/HOMEPAGE-CONTENT-SOURCES.md` §4)
- Final wording: description/positioning reuses the exact already-approved homepage phrase "Современный взгляд на медовуху: понятные вкусы, яркий характер и выразительная упаковка."
- Fields used: 3 approved product records (Классическая медовуха, Лимонная свежесть, Гранат-виноград) using the three supplied product-lock PNGs unchanged, plus 4 `asset-missing` records for catalog-listed flavors with no approved image (Тропический банан-вишня, Яркая клюква, Сочная слива, Ароматная фейхоа).
- Excluded/conflicting information: the live catalog's own bottle cutouts for the 3 approved flavors (`docs/HOMEPAGE-CONTENT-SOURCES.md` § "Mister Bee catalog bottle cutouts") were **not** substituted for the supplied product-lock files, per explicit instruction not to replace product-lock assets with alternative live-site versions without approval.
- Approval status: family — `approved`; 3 product-lock records — `approved`; 4 additional flavors — `requires-approval` (name only, no image).
- Missing assets: 4 flavor images (listed above); catalog source URLs for these exist but were not ingested.
- Legal/content concerns: none beyond the standing claims policy.

## Migliore

- **Official source search performed 2026-07-20**: same full sweep as DTREE PARTY (all nine live-sitemap URLs, transliteration variants, targeted web search for "Cider House Migliore медовуха"). **Zero matches found anywhere.** One unrelated third-party retailer listing surfaced a *different*, unrequested Cider House line name ("Posh") during the web search — this was not used, since it is neither an official page nor one of the three names given in this task.
- Source page used for the record's `sourceUrl`: `https://ciderhouse.ru/katalog`.
- Source wording: none found.
- Final wording: honest placeholder only, same structure as DTREE PARTY.
- Fields used: `slug`, `navLabel`, `title` ("Migliore", exact capitalization as supplied), `categoryLabel: "Категория уточняется"`, `theme: "warm"`. `heroAssets`, `formats`, `characterNotes`, and `products` are all empty arrays.
- Excluded/conflicting information: none.
- Approval status: family — `requires-approval`.
- Missing assets: everything — no logo, no product images, no hero composition.
- Legal/content concerns: same as DTREE PARTY — full content and asset sourcing required before publication.

## Bumble Coffee

- **Official source search performed 2026-07-20**: same full sweep as DTREE PARTY and Migliore, plus extra search terms ("Coffee", "Кофе"). **Zero matches found anywhere.**
- Source page used for the record's `sourceUrl`: `https://ciderhouse.ru/katalog`.
- Source wording: none found.
- Final wording: honest placeholder, with an added note that the name implies a coffee-related product that may use different container/category conventions than cider or mead — this is flagged as an inference from the *name given in the task*, not an official fact, and the family's `formats` array is deliberately left empty rather than inheriting bottle-based formats from the other families.
- Fields used: `slug`, `navLabel`, `title` ("Bumble Coffee", exact capitalization as supplied), `categoryLabel: "Категория уточняется"`, `theme: "muted"`. `heroAssets`, `formats`, `characterNotes`, and `products` are all empty arrays.
- Excluded/conflicting information: none.
- Approval status: family — `requires-approval`.
- Missing assets: everything — no logo, no product images, no hero composition, no confirmed container type.
- Legal/content concerns: same as the other two pending families; additionally, the shared product-tile/format architecture (`ProductFormat = "bottle" | "can" | "keg"`) may need a new format value once an official container type is confirmed — not added speculatively in this pass.

## Zero (безалкогольная линейка)

- Source page: `https://ciderhouse.ru/`
- Source wording: promotional artwork shows `Cherry`, `Green Apple`, `Pomegranate Raspberry`; page text says three tastes (per `docs/HOMEPAGE-CONTENT-SOURCES.md` §5)
- Final wording: reuses the already-approved localized names "Вишня", "Зелёное яблоко", "Гранат–малина" and the already-approved short description "Три ярких вкуса и характер настоящего сидра — без алкоголя."
- Fields used: family story (documents the missing-master limitation directly in copy), `missingAssetNote`, 3 `asset-missing` product records, single shared composite as the only hero/visual asset, formats (`bottle`, visually confirmed from the composite).
- Excluded/conflicting information: no separate bottle master files exist anywhere in the inspected sources; the implementation does not split, mask, or reconstruct the composite to fake individual product photos.
- Approval status: family — `requires-approval` (matches the existing homepage `zeroFeature.status`); all 3 product records — `requires-approval` / `asset-missing`.
- Missing assets: all 3 individual bottle masters. The family page and the `/catalog` Zero section both state this explicitly instead of silently omitting it.
- Legal/content concerns: collection naming, brand ownership, and the exact alcohol classification wording all still require final legal/product sign-off (unchanged from the homepage audit).

## Navigation and route wiring

- `next.config.ts`: removed the temporary `/catalog → /#product-worlds` and `/brands/:slug → /#world-:slug` redirects now that real pages exist at those paths. `/katalog` (legacy Tilda path) now redirects permanently to `/catalog` instead of a homepage anchor.
- `components/layout/site-header.tsx` / `site-footer.tsx`: real production navigation and the full footer (contacts, social, legal links) now render on every route except the three preview routes (`/design-system`, `/components-preview`, `/motion-playground`), which keep the existing "Foundation navigation" / "Preview shell" copy unchanged.
- The header's "Бренды" item is now a native `<details>/<summary>` disclosure (no JS state, fully keyboard-operable) listing all seven families in order, on both desktop (absolute-positioned panel) and mobile (inline expandable list). It still also has its own top-level anchor link behavior removed in favor of the submenu, since a single link could no longer represent seven destinations.
- The footer gained a fourth column, "Бренды", listing all seven families in order, alongside the existing "Разделы"/"Контакты"/"Социальные сети" columns.
- The `/catalog` family nav now wraps onto a second row at desktop widths (`flex-wrap: wrap`) instead of relying on all seven labels fitting one line, and keeps its existing horizontally-scrollable single row on mobile, with `scroll-padding-inline` added so the first and last items are never flush against the viewport edge.
- No link in this milestone points to `#`, a `localhost` placeholder, a missing route, or any `tilda.ws` URL.

## Catalog visual-motion system

Added in this pass, scoped entirely to `.catalog-page` and `.family-page` (the homepage's own `.home-*` motion system in `components/home/home-motion.tsx` was not touched).

**Faint line graphics** (`.catalog-linework`, CSS `::before`/`::after` only, `aria-hidden`, `pointer-events: none`) — used only on purple- or dark-themed sections, never on warm/muted ones: the catalog hero (`--grid`), the DTREE PARTY and White Phoenix/Zero family heroes (`--diagonal`), the Mister Bee family hero (`--rings`), the Mister Bee and DTREE PARTY sections on `/catalog` itself, and the final catalog CTA. Opacity ranges 4.5%–10%. Four placements on `/catalog` (not all seven family sections), so the pattern repeats roughly every second/third major section rather than everywhere.

**Shimmering grid** (`.catalog-shimmer`, static CSS grid layer + a slow `background-position` sweep on a separate soft gradient layer, no canvas/WebGL/video) — used on exactly four `/catalog` sections (hero, formats block with a light-background variant `--light`, final CTA) plus the dark-themed family pages' products section (White Phoenix, Zero). 16s linear sweep cycle, well inside the requested 8–20s range.

**Section reveals** — `.catalog-reveal-stagger` gives hero/identity copy a 0/70/140/210/260ms staggered fade-and-rise (620ms desktop, 480ms mobile, `cubic-bezier(0.16,1,0.3,1)`); `.catalog-reveal-rule` draws a 1px left-to-right dividing line on the same `SafeReveal`-provided `data-visible` state already used by the rest of the project (`components/motion/safe-reveal.tsx`, unmodified); product grids still reveal as one grouped unit, not card-by-card, exactly as before. A `.catalog-index` element (small monospace section number) fades in with each family's kicker.

**Product motion** — hero bottle images get a 220–300ms hover/focus lift and slight image scale on `.catalog-card` (desktop-only, `@media (hover: hover) and (pointer: fine)`); the catalog hero cluster gets a very small (`0.9rem`/`0.55rem` max) pointer-parallax via `components/catalog/hero-parallax.tsx`, a tiny client component that only attaches its listener when both `prefers-reduced-motion` is not set and the pointer is fine/hover-capable — it never runs on touch devices and never changes layout (transform only).

**Navigation/link motion** — the catalog family nav's active underline now animates in via `transform: scaleX()`; catalog anchor links use `scroll-behavior: smooth` (click-to-anchor only, never hijacks continuous scroll); cross-links, prev/next family links (new — see `family-page-template.tsx`), and footer brand links get a small gap/underline transition on hover.

**Mobile simplification** (`@media (max-width: 47.99rem)`): reveal travel distance and duration are reduced, linework opacity is further lowered, and the shimmer sweep slows down (20s) rather than being visually busier on small screens. Pointer parallax and hover-lift are already excluded by their `(hover: hover) and (pointer: fine)` media guards, so they never run on touch.

**Reduced motion** (`@media (prefers-reduced-motion: reduce)`): the shimmer sweep, reveal-stagger animation, hero-products entrance, rule-draw transition, and all bottle/card hover transforms are disabled or reduced to `0.01ms`/instant; content stays at its final visible state; `scroll-behavior` falls back to `auto`; parallax is already prevented from attaching its event listener at the JS level.

**Performance**: everything animates only `transform`, `opacity`, or `background-position`; no new dependency was installed; no `IntersectionObserver` was added beyond the one already used by `SafeReveal` per revealed section (no per-card observers); all decorative layers are `pointer-events: none` and `aria-hidden="true"`.

## Excluded from this milestone

- `/catalog/cider`, `/catalog/mead`, `/catalog/non-alcoholic`, `/catalog/cans`, `/product/[slug]` sub-routes proposed in `docs/02-SITEMAP.md` — not part of the requested route list.
- Individual product detail pages — catalog/family product tiles link to the family page, not to a per-product route (none exists yet).
- Catalog filtering/faceting beyond the seven family anchors — out of scope for this milestone; the acceptance criteria for full filter behavior remain in `docs/08-ACCEPTANCE-CRITERIA.md` for a later pass.
- Any real content for DTREE PARTY, Migliore, or Bumble Coffee — the structure exists, the content does not, by design, pending official sourcing.

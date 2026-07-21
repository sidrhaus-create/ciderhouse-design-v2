# Catalog and family page content sources

Last reviewed: 2026-07-21 (fourth pass — creative-director refinement of the hero/chapter/spotlight system from the third pass; see "Catalog visual refinement (fourth pass)" below). This audit records how `/catalog` and the seven `/brands/[slug]` family pages were built from `data/catalog-content.ts`. The live `ciderhouse.ru` site (home and `/katalog`) is treated as a content source only — never as a layout, motion, or code source. This document does not replace or overwrite `docs/HOMEPAGE-CONTENT-SOURCES.md`, which remains the authoritative audit for the homepage and for the exact original CDN URL, pixel dimensions, and SHA-256 hash of every downloaded product image. This document adds the catalog-specific decisions: which sourced facts became typed fields, what was excluded, and what still requires approval.

**Public-facing wording note (fourth pass):** the three pending families' `description`/`story`/`missingAssetNote` fields were rewritten from audit-style language (e.g. "не найдено ни на одной проверенной официальной странице") to a plain "coming soon" phrase ("Линейка скоро появится в каталоге."). The detailed research trail — which pages were checked, on what date, with what result — now lives only in this document, not in any visitor-facing copy. The underlying `status`/`availabilityStatus`/`approvalStatus` enum values (`"requires-approval"`, `"asset-missing"`) are unchanged and still drive which UI state renders; they are just never printed as raw strings in visible markup (confirmed by scanning the rendered HTML — the only place either string appears is inside Next.js's own serialized hydration payload, which no visitor reads as page content).

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

## Catalog visual redesign (2026-07-21)

This pass redesigned only `/catalog`'s visual presentation. No route, data field, or approval status changed — `data/catalog-content.ts` and `types/catalog.ts` are untouched. `/brands/[slug]` pages are untouched except that `components/catalog/catalog-product-card.tsx` (shared with `/catalog`'s new "rail" modules) got a taller image area, since enlarging shared product imagery was the core objective and this component is genuinely shared.

**New architecture** — replaced the previous uniform "identity block + 4-up compact grid" per family with three new components:

- `components/catalog/family-chapter.tsx` — one shared chapter renderer for all seven families, taking a `variant: "spotlight-left" | "stage-right" | "dark-centered" | "split-rail"`. Variant assignment is asset-driven, not mechanical: Double Tree (`stage-right`, its largest catalog, benefits from a wide stage), White Phoenix (`dark-centered`, matches its established black background and groups its two full-resolution bottles as one composition), Mister Bee (`split-rail`, its three-bottle product-lock set maps directly onto "one focal + a rail of the other two"), Zero (`dark-centered`, its single rectangular composite reads best centered and large), and the three asset-less families (`spotlight-left`/`stage-right` assigned but overridden — see below).
- A family with **zero approved product images** (DTREE PARTY, Migliore, Bumble Coffee) never reaches its assigned variant's product stage at all — `FamilyChapter` detects this (`assetProducts.length === 0`) and renders `.chapter__pending` instead: identity copy plus a large faint outline index number, no card grid, no placeholder imagery of any kind. This is a structural guarantee, not a content choice per family, so it can't regress silently.
- `components/catalog/product-spotlight.tsx` — the large focal product. Renders a compact tablist switcher (prev/next + numbered tabs, keyboard arrow keys, `aria-live` metadata) only when more than one product is available for that slot. Double Tree and White Phoenix get switchers (4 rotating products each, drawn from their larger catalogs); Mister Bee's spotlight is its single focal bottle (the other two sit in the rail, not the switcher, since "one focal + rail" was the explicit brief for that family); Zero's spotlight is the single combined composite with no switcher, its metadata line showing all three flavor names together rather than one at a time — the composite is never split to synthesize a rotation.

**Hero** — rebuilt around one true foreground focal product (White Phoenix Вишня-маракуйя) with two dimmed, rotated, lower-z-index secondary bottles (Double Tree Тёмная вишня, Mister Bee classic) sitting partly behind it, replacing the previous three-equal-bottles row. `min-height` is `min(92svh, 54rem)` up to 64rem and `clamp(44rem, 84svh, 58rem)` from 64rem up — roughly 84svh on a typical desktop viewport, inside the requested 78–92svh band. Verified by hand at 320px that the full three-bottle composition (focal + both secondaries) still fits horizontally within the content column with margin to spare (see "Responsive math" below) — no bottle is dropped on mobile.

**Product collection** — the old four-column `.catalog-grid--compact` on `/catalog` is gone. In its place: the spotlight switcher itself covers "browse several products" for Double Tree/White Phoenix; Mister Bee's rail is one column on mobile/tablet and becomes a vertical strip beside the spotlight from 64rem; `.catalog-card__asset` (the shared card image area) grew from `clamp(11rem, 32vw, 15rem)` to `clamp(14rem, 38vw, 20rem)`. The exhaustive product list for every family (all 17 Double Tree SKUs, etc.) still lives on `/brands/[slug]`, unchanged — `/catalog` was always meant to be a representative overview, not the full listing, and stays that way.

**Responsive math** — worked through by hand (no headless browser is available in this environment) at the narrowest (320px) and a wide desktop (1440px) case: at 320px the hero's focal+two-secondary composition spans 276.5px of a 288px available column (11.5px to spare); at 1440px it spans 528px of 550px (22px to spare). Both cases confirmed via the CSS replaced-element sizing algorithm (height set, width auto, `max-width` cap forces a recompute), not by assumption. Full per-breakpoint figures for the hero and each chapter variant are in the task completion report for this pass.

**Family-specific accents** — added two small, explicitly decorative-only touches (documented as such in the CSS comments, not claimed as brandbook colors): a muted amber underline/index tint on Double Tree (`#b9862c`) evoking "cider-yellow" per this task's brief, and a soft lilac-to-purple gradient background plus a honey-tinted index/switcher-dot on Mister Bee (`#e8b872`). Neither introduces or reuses any of the provisional hex values `CLAUDE.md`/`AGENTS.md` flag as non-official (`#5D2F6A`, `#774282`, `#601D70`); these are two brand-new, small, clearly-scoped decorative values used nowhere else.

## Catalog visual refinement (fourth pass, 2026-07-21)

A creative-director-level refinement pass on top of the third pass. No route, typed field, or approval status changed; two small content values were rewritten (see the public-facing wording note above) and one family's decorative `theme` token changed (Bumble Coffee: `muted` → `dark`, plus its two background CSS rules, to actually deliver the "dark coffee/ink field" this task asked for — still built from already-established tokens, no new hex).

**Real bug found and fixed: reveal animations that never had a chance to play.** Several entrance effects (`product-spotlight` frame/duo images, the catalog CTA bottle) used a plain CSS `animation: ... both`, which starts the moment the element mounts — not when it scrolls into view. Because these elements sit inside a `SafeReveal` wrapper that itself starts at `opacity: 0` until scrolled to, the *inner* animation was completing (and holding its `to` state via `both`) while the *outer* wrapper was still invisible. By the time a visitor actually scrolled to, say, the Mister Bee chapter, its product had already silently finished "animating in" off-screen — visually indistinguishable from no animation at all. Fixed by converting every below-the-fold entrance to a `transition` gated on the ancestor's `data-visible="true"` attribute (the same mechanism `.catalog-reveal-rule` already used correctly), so the effect actually plays when it becomes visible. The hero's own focal/secondary bottles are exempt from this fix's *gating* half (they're always visible on load, so mount-triggered is correct for them) but needed the *other* half of the fix — see next paragraph.

**Second bug found and fixed: an animated `transform` silently discarding static positioning.** `.catalog-hero__focal` centers itself with a static `transform: translateX(-50%)`. Its entrance animation's keyframes also wrote to `transform` (`translateY(...)`) — and per the CSS animation spec, once that keyframe reaches its `to` state, `transform` becomes whatever the keyframe last set it to, discarding the unrelated static declaration underneath. In effect, the bottle would have lost its horizontal centering the moment its one-shot entrance finished. The general fix used throughout: continuous floats use the standalone `translate` property, one-shot rise entrances use either `translate` (safe wherever nothing else already occupies it) or `scale` (used specifically for `.catalog-hero__focal`, since its continuous float already owns `translate`) — never `transform`, which is reserved for an element's own static centering/rotation. Verified by reading the computed cascade by hand for every element carrying more than one motion effect, not by assumption.

**Hero** — cluster enlarged further (focal `max-width` 58%→66%, secondaries 40%→44–46%, stage height cap 34rem→38rem) and shifted right (`left: 54%` instead of 50%, copy/stage grid ratio changed from roughly 1:0.9 to 0.85:1.15 — a further ~20% width gain for the product column on top of the percentage increases). Continuous float now pauses via `animation-play-state` when the hero scrolls out of view (new `IntersectionObserver` in `hero-parallax.tsx`, `data-in-view` attribute), satisfying "at most one continuous focal-product motion visible at a time, and none while off-screen." Re-verified by hand at 320px and 1440px that the enlarged cluster still fits its column (see the completion report for exact figures).

**Double Tree** — spotlight changed from a 4-item switcher to a genuine two-bottle composition (`ProductSpotlight`'s new `mode="duo"` prop: both bottles rendered simultaneously, one foreground/larger, one behind/dimmed/rotated, no switcher needed since nothing is being chosen between). The next 2–4 verified products now appear below as a `.chapter__collection` — full-width, larger 1-column-mobile/2-column-desktop modules, distinct from (and larger than) Mister Bee's narrower rail.

**Mister Bee** — the two secondary bottles no longer sit in white-carded `CatalogProductCard` tiles (`chapter__rail--bare` + `chapter__rail-item`): bare bottle images with a thin single-pixel frame instead of a card surface, floating directly on the purple stage as the brief asked.

**Pending families** — each now has individual visual character rather than an identical box: DTREE PARTY keeps its diagonal linework and gains an oversized rotated "PARTY" ghost wordmark; Migliore's title scales up as an oversized wordmark treatment with a restrained rule under the description; Bumble Coffee moved to the dark/ink theme with its own faint vertical-line graphic. All three also got shorter (`.chapter:has(.chapter__pending)` overrides the section's padding to roughly 60% of a normal chapter's), directly addressing "reduce unnecessary vertical height."

**White Phoenix** — `.chapter--dark-centered .product-spotlight__stage` gained a small internal `padding-block` and a slightly taller cap, so the bottle never sits flush against the stage's own edge — addressing the "hard crop at the boundary" concern without changing `object-fit: contain` (which already made literal cropping impossible; this was about breathing room, not clipping).

**Zero** — same `dark-centered` stage sizing bump as White Phoenix applies here too (shared rule), giving the composite modestly more room; text/composition alignment unchanged (already centered).

**Family navigation** — now theme-aware: `CatalogFamilyNav` takes each family's `theme`, and the currently-active family (from the existing scroll-spy `IntersectionObserver`) sets `data-theme="dark"` or `"light"` on the nav bar itself, subtly swapping its background/link colors to match whichever chapter is behind it. The active link also now scrolls itself into view on mobile (`scrollIntoView`, respecting `prefers-reduced-motion`).

**Formats** — the family×format checkbox table is gone. In its place, `.format-system`: three large typographic columns (one per format), each listing which families confirm that format as a short dotted list, with an animated top-border draw-in and an honest "не подтверждено ни для одного направления" note for any format (currently "Банки") with zero confirmed families — never implying uniform availability.

**Final CTA** — bottle enlarged (`clamp(14rem,40vw,22rem)` → `clamp(16rem,46vw,25rem)`, desktop cap 28rem→31rem) with its own gated rise entrance (not a repeat of the hero's composition or its continuous float — deliberately a single one-shot rise only, keeping "at most one continuous motion visible at a time" true even though the CTA and hero never overlap in the viewport anyway).

## Catalog visual-motion system

Added in the previous pass, scoped entirely to `.catalog-page` and `.family-page` (the homepage's own `.home-*` motion system in `components/home/home-motion.tsx` was not touched). Locations below were updated where the redesign moved things.

**Faint line graphics** (`.catalog-linework`, CSS `::before`/`::after` only, `aria-hidden`, `pointer-events: none`) — used only on purple- or dark-themed sections, never on warm/muted ones: the catalog hero (`--grid`), the DTREE PARTY, White Phoenix, Mister Bee, and Zero chapters on `/catalog` (`--diagonal`/`--rings`, alternated), the equivalent purple/dark family hero pages, and the final catalog CTA (`--diagonal`). Opacity ranges 4.5%–10%. Never on the three pending (asset-less) chapters' typography, and never on the warm/muted chapters (Double Tree, Migliore, Bumble Coffee), so the pattern repeats roughly every second/third major section rather than everywhere.

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

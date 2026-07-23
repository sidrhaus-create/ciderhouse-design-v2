# Production page content sources

Last reviewed: 2026-07-23. Route implemented this pass: `/production`.

This audit records how `/production` was built, why it reuses `data/homepage-content.ts` instead of introducing new content, and exactly what was excluded for lack of a source. The live `ciderhouse.ru/production` page (already reconciled once for the homepage, see `docs/HOMEPAGE-CONTENT-SOURCES.md` §7 "Production scroll story") remains the underlying content source; nothing new was fetched from it this pass.

## Route status before this pass

- `app/production/page.tsx` did not exist.
- `next.config.ts` redirected `/production → /#production-story` (temporary, non-permanent). Because Next.js redirects are matched before filesystem routes, this entry would have shadowed a real `/production` page if left in place — it was removed as part of this change.
- `data/homepage-content.ts` navigation already pointed `Производство` at `/production`, so no navigation data changed.
- The homepage's own `#production-story` section (`app/page.tsx`) is unchanged and still reachable at `/#production-story`; `/production` is a separate, fuller editorial treatment of the same sourced facts, not a replacement for it.

## Content reuse, not new sourcing

No new facts were fetched from the live site for this page. Every sentence on `/production` is either:

- copied verbatim from `homepageContent.production` (`eyebrow`, `title`, `intro`, the 8 `stages`) or `homepageContent.statistics`, both already reconciled to `https://ciderhouse.ru/production` in `docs/HOMEPAGE-CONTENT-SOURCES.md` §7 and §"Global content decisions"; or
- a direct recombination of those same sentences (e.g. the philosophy statement quotes `stages[1].body` verbatim; the "Без спешки" principle reuses `stages[3].body`; the ingredient tag list is derived by splitting `stages[0].body`'s raw-material list into individual nouns).

No sentence introduces a fact not already present in `data/homepage-content.ts`.

## Verified facts used

| Fact | Source in repo | Where used on `/production` |
| --- | --- | --- |
| 8-stage process (raw material → fermentation → control → temperature → filtration → cooling → batch test → filling) | `homepageContent.production.stages` | Full process section, philosophy principles, fermentation/quality sections |
| "На рынке с 2017 года" | `homepageContent.statistics[0]` | Hero meta line, scale section |
| "3 формата: бутылки, банки и кеги" | `homepageContent.statistics[1]` | Scale section |
| "3 производственные площадки" | `homepageContent.statistics[2]` | Philosophy principle ("Собственное производство"), scale section |
| "география поставок: Россия" | `homepageContent.statistics[3]` | Hero meta line, scale section |
| Raw materials (яблочное, грушевое, вишнёвое, ягодное, гранатовое, лимонное сырьё, мёд) | `homepageContent.production.stages[0].body` | Ingredients section tag list |
| ~14–16 days temperature-controlled fermentation | `homepageContent.production.stages[3].body` | Fermentation section large stat |

## Claims explicitly excluded

Confirmed absent from the entire repository by a full-text search before writing any copy (`Вино-Гранде`, `Твер`, exact temperatures beyond "примерно 14–16 дней", well depth, Austrian specialists, GOST/certification language, exact production volumes, city counts) — see `docs/HOMEPAGE-CONTENT-SOURCES.md` §7 for the original exclusion record and §"Global content decisions" for capacity/city-count figures stored as hidden `requires-approval` data. None of these appear on `/production`. No factory name or region is stated anywhere on the page.

## Assets used

- `public/assets/products/mister-bee/mister-bee-foundation-01-front.png` — the same approved Mister Bee product-lock bottle already used as the visual anchor of the homepage's own production-story section (`app/page.tsx`, `home-production__object`). Reused unchanged, rendered through `next/image` with `object-fit: contain` semantics (no crop/recolor).
- No production/facility photography exists anywhere in the repository (`public/assets/ASSET-STATUS.md` § "Missing from the inspected attachment set" confirms this explicitly). The page is therefore typography- and linework-led throughout, per the brief's instruction to prefer strong typography over searching for or inventing imagery.

## Layout system

`/production` is a Server Component (`app/production/page.tsx`, no `"use client"`) that reuses existing shared primitives rather than introducing a parallel design system:

- Root wrapper is `.family-page production-page` — inherits `.family-page`'s background/overflow/scroll-margin behavior already used by every `/brands/[slug]` route.
- `.family-kicker`, `.family-section-title`, `.family-actions`, `.family-button`, `.family-final-cta` (final CTA section), `.family-formats__list` (ingredient tags), `.catalog-index`, `.catalog-linework` (`--diagonal`/`--rings`/`--grid` variants), `.catalog-shimmer--light`, `.safe-reveal`, `.catalog-reveal-stagger`, and `.catalog-reveal-rule` are reused directly from `app/globals.css` with zero edits to their existing rules.
- New CSS is scoped entirely under `.production-*` class names, appended to the end of `app/globals.css` — additive only, no existing selector was modified. Covers: hero, philosophy/principles grid, the numbered process list (CSS-only connecting line via `::before`), ingredients, fermentation/time, filtration/quality, and the scale stat grid.

## Responsive behavior

Verified in Chrome at 1440×900 (desktop) and 430×900 (mobile, via manual DevTools device toolbar — automatic window resize was unavailable in this environment). At 430px: no horizontal overflow (`document.documentElement.scrollWidth === clientWidth === 430`), hero is text-first with the product image second, all copy and both CTAs fit without clipping, the process list stays a single vertical column (no horizontal drag), ingredient tags wrap, the scale grid stays 2-column below the `36rem` breakpoint (4-column only from `36rem` up), and the mobile menu opens with "Производство" marked `aria-current="page"`.

## Motion behavior

No new animation runtime or keyframes were added. All motion is inherited from already-reduced-motion-safe shared classes (`.safe-reveal`, `.catalog-reveal-stagger`, `.catalog-reveal-rule`, `.catalog-shimmer`) — see the existing `@media (prefers-reduced-motion: reduce)` blocks in `app/globals.css` (around the `.safe-reveal` and `.catalog-*` rules), which already apply site-wide and needed no page-specific addition.

## Source limitations carried forward

- No production/facility photography, exact fermentation temperature, factory name, factory region, production volumes, or city counts exist in the repository. If any of these become available and approved, they belong in `data/homepage-content.ts` (so both `/` and `/production` stay in sync) with a corresponding update to this file and `docs/HOMEPAGE-CONTENT-SOURCES.md`.
- Licensed brand webfonts are still not supplied; `/production` uses the same temporary system-font tokens as the rest of the site.

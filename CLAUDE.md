@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install              # install deps (pnpm 11.9, Node >=20.9 required)
pnpm dev                  # start dev server on http://localhost:3000
pnpm format               # apply Prettier formatting
pnpm format:check         # check formatting only
pnpm lint                 # eslint . --max-warnings=0
pnpm typecheck            # tsc --noEmit
pnpm build                # next build
pnpm verify               # format:check && lint && typecheck && build — run before considering any task done
```

There is no test runner configured in this repo — "checks" means `pnpm verify`. All scripts also work via `npm run <script>` if needed.

First-time setup: `copy .env.example .env.local` (Windows) or `cp .env.example .env.local` (macOS/Linux). No secrets are required; the age gate works with no env vars set.

## Architecture

Next.js 16 App Router + TypeScript + React 19, no smooth-scroll library. GSAP/ScrollTrigger is the only system for scroll-driven choreography, through one controller (`components/motion/site-motion.tsx`); the `motion` package is permitted separately, scoped to isolated client components, for non-scroll interactions — it must never drive scroll position or duplicate ScrollTrigger's job. GSAP and Motion must never animate the same DOM element. Server Components are the default; Client Components (`"use client"`) are used only for the age gate, header/footer, the hero slider, the generic slider, the catalogue explorer, previews, and the motion controller.

- `app/` — routes. Public pages: `/` (campaign homepage), `/catalog`, `/brands/[slug]`, `/production`, `/about`, `/where-to-buy`, `/partners`, `/contacts`. `/design-system`, `/components-preview`, `/motion-playground` are non-indexable internal preview routes. `app/not-found.tsx` is the 404 boundary.
- `app/globals.css` — tokens, `@font-face`, and the base primitives used by the preview routes. `app/site.css` — the shared public design system (`cx-` classes: type, buttons, header, footer, poster hero `hs-`, marquee, slider, photo banners, catalogue tiles and product sheet, inner-page blocks). `app/home.css` — homepage-only sections (`hm-`).
- `components/layout/` — `SiteHeader` / `SiteFooter`, used in `app/layout.tsx` for every route (dark campaign header/footer; preview routes keep the foundation footer).
- `components/motion/site-motion.tsx` — the single GSAP/ScrollTrigger controller, wrapped around every public page. Sections opt in with data attributes (`data-lines`, `data-fade`, `data-stagger`, `data-words`, `data-parallax`, `data-drift`, `data-rise`, `data-runway`). Three `matchMedia` branches: reduced motion (fully static), wide screens ≥1024px (scrubbed parallax plus the one pinned horizontal "runway"), narrow screens (light one-shot reveals, no pins). Add a new data hook there rather than a second controller. `safe-reveal.tsx` / `scroll-proof.tsx` in the same folder are `/motion-playground` prototypes only.
- `components/home/hero-slider.tsx` — homepage campaign slider. CSS-only transitions; auto-advance pauses on hover, focus, off-screen, hidden tab, the pause button, and is disabled under reduced motion.
- `components/site/` — `slider.tsx` (native scroll-snap carousel), `closing.tsx` (shared closing banner), `text.tsx` (`Lines`, `Words`, `Kicker`).
- `components/catalog/catalog-explorer.tsx` — the catalogue: family filter (synced to `?family=`), bottle wall, and a full-screen product sheet (`<dialog>`, arrow keys step through products). `family-page-template.tsx` renders `/brands/[slug]` and reuses the explorer in `single` mode.
- `components/ui/` — typed primitives. `ProductAsset` is a client component with `onError` fallback — always render product packaging through it rather than a raw `<Image>`. `Bottle` (`bottle.tsx`) wraps `ProductAsset` and sizes a bottle by its measured glass silhouette (`--bottle-h`), letting only the transparent canvas margin overflow — use it for every cutout bottle.
- `data/homepage-content.ts` — sourced copy, navigation, stats, FAQ, production stages, social links. `data/catalog-content.ts` — families and products. `data/site-content.ts` — copy for the secondary pages and the photography registry (introduces no new facts). `data/showcase.ts` — presentation-only bottle selections and the explorer data, all resolved from the catalog by product id. Audits: `docs/HOMEPAGE-CONTENT-SOURCES.md`, `docs/CATALOG-CONTENT-SOURCES.md`, `docs/PRODUCTION-CONTENT-SOURCES.md`.
- `data/preview-content.ts`, `data/legal.placeholder.ts` — explicitly foundation-only placeholder data; never treat as real product/legal copy.
- `types/content.ts`, `types/catalog.ts` — shared contracts. `lib/site.ts` — `siteConfig`. `lib/navigation.ts` — preview-route nav. `lib/plural.ts` — Russian plural forms.
- `next.config.ts` — redirects from legacy ciderhouse.ru paths (`/katalog`, `/map`, `/clients`, `/contact`, `/ph`, `/blog`) to the real routes; `/privacy` and `/legal` still point at the footer (`#legal`) until those pages exist.
- `public/assets/` — `brand/`, `products/` (bottle cutouts; filenames match the label art — verify by eye before adding files), `photography/` (official lifestyle photos), `production/`, `fonts/` (interim OFL fonts). `public/assets/ASSET-STATUS.md` tracks what's approved vs. still needed.

## Brand and product-image rules (non-negotiable)

These come from `AGENTS.md` and `docs/03-DESIGN-SYSTEM.md` and apply to all code and content changes:

- Never redraw, regenerate, recolor, crop, distort, or reconstruct real product packaging (bottle/can geometry, label, liquid color/level, cap, logos, legal text, barcodes). Only use files already under `public/assets/products`; render them through `components/ui/product-asset.tsx` with `object-fit: contain`, full aspect ratio preserved.
- Two supplied AI-generated fruit-vessel concept images and any AI-generated packaging are excluded from production — reference only, never shipped.
- Brand primary is Pantone 7663 C / `#6B3077`; secondaries are white `#FFFFFF` and black `#000000`. Do not treat `#5D2F6A`, `#774282`, `#601D70`, or `#0C0B1A` as official — those are superseded provisional values.
- No licensed brand webfonts are supplied (`Sauna-SmallCaps` for White Phoenix, `Cera PRO Medium` for Double Tree are brandbook-named but not installed). The site uses interim open-licence fonts (Unbounded for display, Manrope for text, self-hosted) — don't present them as final brand typography.
- Don't invent product characteristics, ingredients, awards, certifications, "number one" claims, or health/gluten claims without an approved source; don't modify approved marketing copy without documenting the change (see `docs/HOMEPAGE-CONTENT-SOURCES.md`).
- No direct alcohol checkout/delivery flow unless explicitly approved. Age-gate legal copy (`components/age-gate.tsx`, `NEXT_PUBLIC_ENABLE_AGE_GATE`, `NEXT_PUBLIC_UNDERAGE_DESTINATION`) still requires legal review before launch — treat it as provisional, not final.

## Motion and mobile constraints

- Preserve native wheel/trackpad/keyboard/touch scrolling always — never hijack it globally. The only pin is the homepage runway (wide screens, motion allowed), which holds one section while its own content travels and has a native horizontal-scroll fallback.
- All new scroll-driven motion must respect `prefers-reduced-motion` (the reduced-motion branch of `site-motion.tsx` creates no animations at all) and must have a distinct, lighter narrow-screen behavior (`max-width: 1023px` branch), not just a scaled-down desktop version.
- No horizontal scrolling, no black bars around video; provide separate desktop/mobile video sources and image/poster fallbacks where video is used.
- Test layouts at 320/360/390/430/768/1024/1440/1920px.

## Workflow expectations

- Before changing homepage content/design, read the relevant files in `docs/` (numbered `00`–`08`) — they're the source of truth for brief, asset checklist, sitemap, design system, content model, motion, mobile, SEO/analytics, and acceptance criteria.
- After changes, run `pnpm verify` and check responsive/reduced-motion behavior; don't leave placeholder copy or invented product data unlabeled.
- Don't deploy to production or change DNS/hosting config without explicit instruction.

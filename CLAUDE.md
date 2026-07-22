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

Next.js 16 App Router + TypeScript + React 19, no smooth-scroll library. GSAP/ScrollTrigger is the only system for scroll-driven/global page choreography (parallax, scroll-linked reveals, `home-motion.tsx`); the `motion` package is permitted separately, scoped to isolated client components, for non-scroll interactions (`AnimatePresence` transitions, shared layout transitions, spring microinteractions, reduced-motion-aware state) — it must never drive scroll position or duplicate ScrollTrigger's job. GSAP and Motion must never animate the same DOM element. Server Components are the default; Client Components (`"use client"`) are used only for the age gate, header/nav overlays, tabs/dialog/drawer/form previews, and motion controllers.

- `app/` — routes. `/` (`app/page.tsx`) is the real production-candidate homepage. `/design-system`, `/components-preview`, `/motion-playground` are non-indexable internal preview routes (excluded via `app/robots.ts` / `app/sitemap.ts`). `app/not-found.tsx` is the 404 boundary.
- `components/layout/` — `SiteHeader` / `SiteFooter`, used in `app/layout.tsx` for every route.
- `components/ui/` — typed, reusable primitives (button, cards, dialog, drawer, tabs, accordion, form-controls, media, `product-asset.tsx`, etc.). `ProductAsset` is a client component with `onError` fallback — always render product packaging through it rather than a raw `<Image>`.
- `components/home/home-motion.tsx` — the single GSAP/ScrollTrigger controller for the homepage. It scopes all animation via `gsap.context` + `gsap.matchMedia`, keyed off `data-home-*` attributes in `app/page.tsx`, with three matchMedia branches: `prefers-reduced-motion: reduce` (clears all transforms), desktop (`min-width: 769px`, scrubbed parallax/reveal), and mobile (`max-width: 768px`, lighter one-shot reveals). New homepage sections that need scroll motion should add a `data-home-*` hook here rather than introducing a second ScrollTrigger controller.
- `components/motion/` — route-scoped motion prototypes for `/motion-playground` only, not used by the homepage.
- `components/previews/` — interactive demos backing `/components-preview`.
- `data/homepage-content.ts` — all homepage copy, CTAs, stats, FAQ, production stages, social links live here, not inline in `app/page.tsx`. Reconciliation/approval decisions for this copy are tracked in `docs/HOMEPAGE-CONTENT-SOURCES.md`.
- `data/preview-content.ts`, `data/legal.placeholder.ts` — explicitly foundation-only placeholder data; never treat as real product/legal copy.
- `types/content.ts` — shared `Product`, `Brand`, `Article`, `StoreLocation` contracts.
- `lib/site.ts` — `siteConfig` (name/description/URL, reads `NEXT_PUBLIC_SITE_URL`). `lib/navigation.ts` — nav entries for the foundation/preview routes only (the homepage itself is single-page, anchor-linked).
- `next.config.ts` — redirects map old/alternate paths (`/catalog`, `/production`, `/contacts`, etc.) to homepage anchor sections (`/#product-worlds`, `/#production-story`, ...). When adding or renaming a homepage `id`/anchor, check these redirects stay in sync.
- `public/assets/` — `brand/` (master-logo, symbols, patterns, family-logos, guidelines), `products/` (per-brand product imagery), `fonts/`. `public/assets/ASSET-STATUS.md` tracks what's approved vs. still needed.

## Brand and product-image rules (non-negotiable)

These come from `AGENTS.md` and `docs/03-DESIGN-SYSTEM.md` and apply to all code and content changes:

- Never redraw, regenerate, recolor, crop, distort, or reconstruct real product packaging (bottle/can geometry, label, liquid color/level, cap, logos, legal text, barcodes). Only use files already under `public/assets/products`; render them through `components/ui/product-asset.tsx` with `object-fit: contain`, full aspect ratio preserved.
- Two supplied AI-generated fruit-vessel concept images and any AI-generated packaging are excluded from production — reference only, never shipped.
- Brand primary is Pantone 7663 C / `#6B3077`; secondaries are white `#FFFFFF` and black `#000000`. Do not treat `#5D2F6A`, `#774282`, `#601D70`, or `#0C0B1A` as official — those are superseded provisional values.
- No licensed webfonts are currently supplied (`Sauna-SmallCaps` for White Phoenix, `Cera PRO Medium` for Double Tree are brandbook-named but not installed). Current type tokens are a temporary system-font fallback — don't present them as final brand typography.
- Don't invent product characteristics, ingredients, awards, certifications, "number one" claims, or health/gluten claims without an approved source; don't modify approved marketing copy without documenting the change (see `docs/HOMEPAGE-CONTENT-SOURCES.md`).
- No direct alcohol checkout/delivery flow unless explicitly approved. Age-gate legal copy (`components/age-gate.tsx`, `NEXT_PUBLIC_ENABLE_AGE_GATE`, `NEXT_PUBLIC_UNDERAGE_DESTINATION`) still requires legal review before launch — treat it as provisional, not final.

## Motion and mobile constraints

- Preserve native wheel/trackpad/keyboard/touch scrolling always — never pin/lock scroll or hijack it globally.
- All new scroll-driven motion must respect `prefers-reduced-motion` (add the corresponding `clearProps` targets in `home-motion.tsx`) and must have a distinct, lighter mobile behavior (`max-width: 768px` branch), not just a scaled-down desktop version.
- No horizontal scrolling, no black bars around video; provide separate desktop/mobile video sources and image/poster fallbacks where video is used.
- Test layouts at 320/360/390/430/768/1024/1440/1920px.

## Workflow expectations

- Before changing homepage content/design, read the relevant files in `docs/` (numbered `00`–`08`) — they're the source of truth for brief, asset checklist, sitemap, design system, content model, motion, mobile, SEO/analytics, and acceptance criteria.
- After changes, run `pnpm verify` and check responsive/reduced-motion behavior; don't leave placeholder copy or invented product data unlabeled.
- Don't deploy to production or change DNS/hosting config without explicit instruction.

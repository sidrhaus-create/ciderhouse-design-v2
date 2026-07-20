# Cider House — production-oriented homepage

Production-oriented Next.js implementation for the Cider House digital rebrand. The `/` route is the real homepage candidate; the design-system, component, and motion routes remain available as non-indexable internal previews.

## Requirements

- Node.js 20.9 or newer
- pnpm 11.9 (the version pinned in `package.json`)

## Local setup

```bash
pnpm install
copy .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The same scripts can be run through npm when dependencies are already installed:

```bash
npm run dev
npm run format
npm run lint
npm run typecheck
npm run build
```

On macOS or Linux, replace the `copy` command with:

```bash
cp .env.example .env.local
```

No secret is required. The age gate is enabled by default, stores confirmation in local storage, and keeps the underage destination configurable through `NEXT_PUBLIC_UNDERAGE_DESTINATION`. Its legal copy still requires final review.

## Verification commands

Run checks individually:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Or run the complete verification sequence:

```bash
pnpm verify
```

To apply repository formatting:

```bash
pnpm format
```

## Routes

- `/` — production-oriented Cider House homepage
- `/catalog` — editorial assortment overview with family navigation, representative product tiles, and a formats explainer
- `/brands/double-tree`, `/brands/dtree-party`, `/brands/white-phoenix`, `/brands/mister-bee`, `/brands/migliore`, `/brands/bumble-coffee`, `/brands/zero` — one shared family-page template (`app/brands/[slug]/page.tsx`) rendering typed data per family. DTREE PARTY, Migliore, and Bumble Coffee are structurally complete but have no sourced content yet (see `docs/CATALOG-CONTENT-SOURCES.md`) — their pages render an honest "not yet confirmed" state rather than invented data.
- `/catalog-concept` — an isolated, unlisted experimental visual prototype (Double Tree only). Not linked from any production navigation, not in the sitemap, `noindex`. Do not treat as production direction.
- `/design-system` — colors, typography, spacing, layout, and control states
- `/components-preview` — cards, approved product-lock preview, forms, tabs, accordion, dialog, drawer, and status states
- `/motion-playground` — safe reveal, continuous ticker, reduced-motion fallback, and restrained ScrollTrigger proof
- `/robots.txt` and `/sitemap.xml` — homepage, catalog, and family-page indexation with preview routes excluded
- custom 404 — foundation boundary state

## Architecture

```text
app/                  App Router routes, metadata, global tokens/styles
components/layout/    Responsive header and footer
components/ui/        Typed reusable UI primitives
components/catalog/   Catalog/family-page product card, family nav, and shared page template
components/motion/    Route-scoped motion prototypes
components/home/      Homepage-only native-scroll motion controller
components/previews/  Interactive component demonstrations
data/                 Editable local content: homepage copy and the typed catalog/family data
types/                Product, brand, article, store, and catalog/family contracts
lib/                  Navigation and site configuration
public/assets/         Approved brand/product/media files only
```

Server Components are the default. Client Components are limited to interactive navigation, overlays, tabs, form/status previews, age-gate state, product error handling, catalog family-nav active-state tracking, and motion demos. Native scrolling is never intercepted.

Homepage copy, sources, approval states, statistics, production stages, FAQ, social URLs, and CTAs live in `data/homepage-content.ts`. Reconciliation decisions are documented in `docs/HOMEPAGE-CONTENT-SOURCES.md`. Catalog and family-page product data, formats, and per-SKU approval/availability status live in `data/catalog-content.ts` (typed via `types/catalog.ts`); reconciliation decisions are documented in `docs/CATALOG-CONTENT-SOURCES.md`. Routes outside `/` and the three preview routes (`/design-system`, `/components-preview`, `/motion-playground`) render the real production navigation and footer, not the foundation preview shell.

## Asset and content safety

- Only files under `public/assets/products` may be used as product packaging.
- Product assets must render with `object-fit: contain`; do not crop, recolor, redraw, or overlay packaging.
- `data/preview-content.ts` is foundation-only placeholder data and must not be published as product truth.
- The supplied brandbook's native master-logo and colibri paths are extracted under `public/assets/brand`; the shell uses those SVGs directly.
- The brandbook establishes `#6B3077` as master primary, with white and black as official secondary colors.
- White Phoenix and Double Tree are raster-only inside the PDF and are retained as source PNGs without prohibited vector tracing.
- No licensed font files were supplied. The current system font tokens remain temporary; the brandbook names `Sauna-SmallCaps` for White Phoenix and `Cera PRO Medium` for Double Tree.
- The two supplied AI-generated fruit-container concepts are excluded from production assets.

See `public/assets/ASSET-STATUS.md` for the current asset register and `docs/01-ASSET-CHECKLIST.md` for the required production inventory.

## Before launch

Resolve every record marked `requires-approval`, obtain legal approval for the age gate and alcohol-related notices, add the missing approved product/video/photo assets and licensed webfonts, complete SKU metadata, and define production analytics consent settings.

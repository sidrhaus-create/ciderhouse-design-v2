# Cider House — project foundation

Production-oriented Next.js foundation for the Cider House digital rebrand. This stage intentionally does **not** implement the final homepage. It provides the responsive application shell, design tokens, typed content contracts, reusable UI primitives, and isolated motion prototypes required before homepage art direction begins.

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

No secret is required for the foundation routes. The age gate is disabled by default until legal copy is approved; set `NEXT_PUBLIC_ENABLE_AGE_GATE=true` in `.env.local` to review its full-page state model.

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

## Foundation routes

- `/` — review dashboard, not the final homepage
- `/design-system` — colors, typography, spacing, layout, and control states
- `/components-preview` — cards, approved product-lock preview, forms, tabs, accordion, dialog, drawer, and status states
- `/motion-playground` — safe reveal, continuous ticker, reduced-motion fallback, and restrained ScrollTrigger proof
- `/robots.txt` and `/sitemap.xml` — route-level SEO foundation; preview stage remains non-indexable
- custom 404 — foundation boundary state

## Architecture

```text
app/                  App Router routes, metadata, global tokens/styles
components/layout/    Responsive header and footer
components/ui/        Typed reusable UI primitives
components/motion/    Route-scoped motion prototypes
components/previews/  Interactive component demonstrations
data/                 Editable local sample data, explicitly placeholder
types/                Product, brand, article, and store contracts
lib/                  Navigation and site configuration
public/assets/         Approved brand/product/media files only
```

Server Components are the default. Client Components are limited to interactive navigation, overlays, tabs, form/status previews, age-gate state, product error handling, and motion demos. Native scrolling is never intercepted.

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

## Before production

Replace every record or UI label marked `placeholder`, `provisional`, `pending`, or `review required`. Obtain legal approval for the age-gate and alcohol-related notices, add official licensed webfonts and SVG marks, complete SKU metadata, and define production SEO/analytics consent settings.

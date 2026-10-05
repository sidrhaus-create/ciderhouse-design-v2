# CIDERHOUSE — new site

Next.js 16 · React 19 · TypeScript · Tailwind 4 · GSAP/ScrollTrigger · Lenis. Static export (`out/`), deployable to any static hosting.

```bash
npm i
npm run assets   # rebuild optimized assets from the original sources (SRC=/path/to/si/assets)
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Art direction — V2, brand-system pass

Same structure and motion as V2, re-set in the real CIDERHOUSE brand system: strict geometry, three master colours, each sub-brand in its own face.

**Token hierarchy** (`src/app/globals.css`, nothing else carries raw HEX):

| Level | Tokens | Source |
|---|---|---|
| Master | `--ch-purple #6B3077` (Pantone 7663 C) · `--ch-black #000` · `--ch-white #FFF` | corporate brand guide |
| Sub-brand | `--wp-*`, `--dt-*`, `--zero-*`, `--mb-*`, `--bc-*`, `--mg-*` (bg / ink / accent) | packaging, logo files — see CONTENT_SOURCES.md |
| Flavour | `--fl-cherry`, `--fl-apple`, `--fl-pomegranate`, … | accent only: a swatch or one plane behind the bottle |
| UI state | `--field` / `--on` (plane and text on it), `--ui-accent`, `--ui-rule`, `--ui-muted` | — |

Planes: `.field-white`, `.field-black`, `.field-purple`, and `.field-brand` (+ `brandVars(b)` from `src/data/brands.ts`).

**Typography.**

| Where | Face | Status |
|---|---|---|
| Master UI, navigation, system | Montserrat | the brand guide itself is set in it; the guide names no corporate face |
| White Phoenix | Sauna SmallCaps | brand guide |
| Double Tree | Cera Pro Medium | brand guide |
| 0% / ZER° CIDER | Segoe UI Variable | brand guide; system font, resolves locally on Windows, falls back to Montserrat elsewhere |
| Mister Bee | Friz Quadrata Bold | named in the owner's logo sheet |
| Bumble Coffee | Unbounded | used in the Black Phoenix logobook; not an approved rule |
| Migliore | master face | nothing stated |

Brand faces are applied through `brandType(b)` / `.voice-*`; files live in `public/fonts/brand` (owner's licensed copies — web licences for Sauna, Cera Pro and Friz Quadrata are required before publishing).

**Geometry.** Radius 0 everywhere; 1px rules; rectangular buttons with a horizontal wipe; `Plate` (ruled rectangle) and `.chip` replace every sticker and badge; flavours are a ruled index with colour swatches. The only round shapes are original assets (the CIDERHOUSE seal, logos).

**Motion.** Unchanged in scale, stricter in character: masks, wipes and planes instead of bounce. Threshold leaves as one upward wipe · hero: letters rise, the purple plane grows, bottles rise upright; on scroll the plane widens to full bleed and the bottles scale · manifesto words print in, accents wipe in as inverted plates · brand index switches the whole plane to the active brand (colours + face) · ZER° film scrubbed by scroll with the 0,5 → 0,0 gauge · pinned horizontal conveyor · catalogue filter bar. `prefers-reduced-motion` disables Lenis, pins, scrubs and reveals.

**Scenes added in the art-direction pass.** `BottleScene` (home): one pinned full-screen scene — three master planes wipe across while each flavour name travels behind a bottle taller than the viewport. `BrandRange` (catalogue and brand pages): a sticky full-height stage on the brand's plane + a ruled index; the active line walks onto the stage. `[data-par-y]` gives controlled parallax, `.route-wipe` is the purple page transition. Latin-only brand faces (Sauna SmallCaps, Friz Quadrata) set flavour names as printed on the label; the Russian name goes to the caption.

**Brand corridor (home).** `BrandCorridor`: Double Tree → White Phoenix → Mister Bee → 0% as one horizontal journey. Desktop: one pinned frame, vertical scroll moves the track sideways (0.75 viewport per scene, soft snap); touch layouts: native swipe rail with scroll-snap and a peek of the next scene. A persistent index shows the active brand and jumps on click. Photography lives in `public/assets/photography` (four official shots); Mister Bee has no lifestyle photography, its scene is built from the packshots.

**Production storytelling.** One thin-line illustration language for the eight verified stages (`ProcessArt`, drawn by `stroke-dashoffset`, purple marks the liquid). `ProcessStory` (production page): sticky drawing board + story, a liquid line climbs with the scroll; plain vertical sequence on touch layouts. `ProcessTeaser`: compressed strip — four moments on the homepage, three on the 0% page and product pages. No pinning; with reduced motion every drawing is shown complete. Stage texts come only from `PROCESS` in `src/data/site.ts`.

**Provenance rules.** No invented renders or logos; names from retail listings carry the «сверяется» marker. Slogan of the 0% line is quoted exactly: «Свобода выбирать вкус, а не градусы».

V1 components and the unused lettering/logo sources are parked in `archive-v1/` (outside `src`, excluded from TypeScript).

## Architecture

`/` · `/brands/` + `/brands/[slug]/` · `/katalog/` (filterable «стеллаж», URL-synced `?brand=&format=`) + `/katalog/[slug]/` · `/production/` · `/non-alcoholic/` · `/map/` · `/clients/` · `/contact/` · `/merch/` · `/blog/` — official URLs preserved. Sitemap, robots, Organization/Product JSON-LD, per-page metadata/OG.

Content lives in `src/data/*` with provenance (`src/data/sources.ts`). Assets: `ASSET_MANIFEST.json`. Sources & open items: `CONTENT_SOURCES.md`.

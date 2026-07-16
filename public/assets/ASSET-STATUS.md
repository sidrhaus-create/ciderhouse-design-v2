# Asset status — foundation verification

Last reviewed: 2026-07-16. This register follows the four status labels required by `docs/01-ASSET-CHECKLIST.md`.

Status applies only to repository use. “Approved” below means the file was supplied directly for the foundation product-lock preview; it does not supply missing SKU facts, usage rights, or launch approval for other contexts.

## Approved

| Required asset | Repository path or source | Scope and notes |
| --- | --- | --- |
| Mister Bee bottle, front 01 | `products/mister-bee/mister-bee-foundation-01-front.png` | Supplied directly; byte-identical copy; foundation product-lock preview only. |
| Mister Bee bottle, front 02 | `products/mister-bee/mister-bee-foundation-02-front.png` | Supplied directly; byte-identical copy; foundation product-lock preview only. |
| Mister Bee bottle, front 03 | `products/mister-bee/mister-bee-foundation-03-front.png` | Supplied directly; byte-identical copy; foundation product-lock preview only. |
| Brandbook reference | External supplied `БРЕНДБУК.pdf` | Reviewed for master-brand color/logo references. Distribution and production-source status are not confirmed, so it is not copied into public assets. |

The three bottle files must remain uncropped, unrecolored, undistorted, and unretouched. Their labels and visible packaging must never be used to infer product claims.

## Temporary

| Required asset | Current temporary treatment | Replacement requirement |
| --- | --- | --- |
| Master Cider House logo | Text-only `CIDERHOUSE` wordmark in the application shell | Replace with approved master SVG and monochrome variants. |
| Colibri/brand symbol | Not rendered | No temporary drawing is permitted; use the approved SVG when supplied. |
| Preview favicon | `app/icon.svg`, foundation-only “01” mark | Replace with an approved brand favicon/icon set. |
| Approved fonts | Tokenized Arial/Helvetica system stack | Replace with licensed WOFF2 files and documented weights/styles. Brandbook references Sauna SmallCaps for White Phoenix and Cera PRO Medium for Double Tree; files and licences were not supplied. |
| Product content mapping | Foundation-only Mister Bee record in `data/preview-content.ts` | Replace with approved SKU IDs, names, facts, asset mappings, and SEO fields. |

## Missing

| Required asset | Exact missing input |
| --- | --- |
| Master Cider House logo | Approved full-color SVG, reversed SVG, black SVG, white SVG, clear-space/minimum-size guidance. |
| Colibri/brand symbol | Approved standalone SVG plus monochrome/reversed variants. |
| Double Tree logo | Approved SVG source and usage guidance. |
| White Phoenix logo | Approved SVG source and usage guidance. |
| Mister Bee logo | Approved SVG source and usage guidance. |
| 0% logo | Approved White Phoenix 0%/non-alcoholic collection SVG and naming guidance. |
| Approved fonts | Licensed WOFF2 files, licence terms, family names, weights, styles, fallback guidance, and preload guidance. |
| Complete product bottle assets | For every SKU: approved front, 3/4, back, cap/top, separate shadow, high-resolution source, liquid-color reference, label reference, and metadata row. Double Tree, White Phoenix, 0%, cans, and kegs currently have no approved repository assets. |
| Desktop hero video | Approved 16:9 MP4 and WebM masters, written scroll behaviour, first/final reference frames, and confirmation of no embedded black bars or baked-in UI text. |
| Desktop hero poster | Approved desktop poster/fallback image matching the intended final frame. |
| Mobile hero video | Approved 9:16 MP4 and WebM masters with independently art-directed safe areas, written scroll behaviour, and no embedded black bars. |
| Mobile hero poster | Approved mobile poster/fallback image matching the intended final frame. |
| Production photos | Approved high-resolution production/facility/process photography with captions, credits, usage rights, focal points, and alt-text guidance. |
| Partner logos | Approved SVG/PNG logo set, canonical partner names, outbound URLs, usage restrictions, and ordering. |
| Supporting brand assets | Approved patterns, graffiti, icons, illustration system, family textures, lifestyle imagery, social imagery, and Open Graph images. |

## Replace-before-production

| Current item | Required action before production |
| --- | --- |
| Foundation text wordmark and “LOGO PENDING” preview | Replace with approved master and family SVG files; do not redraw them in code. |
| `app/icon.svg` foundation icon | Replace with approved favicon and application icon assets. |
| Provisional family accent tokens | Replace only after official product-family palette approval. |
| System font stack | Replace with licensed, approved webfonts; keep a documented fallback stack. |
| `mister-bee-foundation-*` filenames and preview mapping | Map approved files to stable SKU-based names after official SKU data is supplied. Preserve the supplied source pixels unless an approved higher-resolution source replaces them. |
| `data/products.template.csv` example row | Replace with approved product metadata; do not publish the example record. |
| `data/preview-content.ts` and `data/legal.placeholder.ts` | Replace placeholder product/brand/article/store facts and legal copy with approved content. |
| Preview-only SEO and canonical configuration | Supply the production origin, share images, indexation decision, and redirect inventory before launch. |

## Explicitly excluded

- The two supplied `ChatGPT Image...` fruit-container concepts are AI-generated references and are not approved product packaging or production assets.
- No packaging may be generated, redrawn, extrapolated, or reconstructed from the brandbook or visible labels.

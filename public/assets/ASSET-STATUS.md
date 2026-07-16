# Asset status - homepage production candidate

Last reviewed: 2026-07-16. All original attachments were re-inspected. The authoritative extraction record is `brand/guidelines/BRANDBOOK-EXTRACTION.md`.

Homepage usage: the hero, Mister Bee product world, and production story use only the three approved Mister Bee product-lock PNGs. No live-site image was copied into production assets. Double Tree, White Phoenix, and 0% product scenes remain asset-light until approved product files exist.

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

The extracted SVGs preserve existing PDF vector operators. They were not traced, redrawn, simplified, retyped, or recolored.

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
| Complete product asset coverage | Only three Mister Bee front-view bottle PNGs are supplied; no approved 3/4, back, cap/top, shadow, source, or other-family SKU files are present. |

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

## Official color resolution

- Master primary: Purple, Pantone 7663 C, `#6B3077`, RGB 107/48/119, CMYK 70/93/16/5.
- Secondary: White `#FFFFFF` and Black `#000000`.
- The former `#5D2F6A` value does not appear in the supplied brandbook and is not the active master-primary token.
- No official additional purple shades or product-family accent colors are documented in the supplied PDF.

## Explicitly excluded

- The two supplied `ChatGPT Image...` fruit-vessel images remain visual concept references only. They are not approved packaging, logos, or production photography and are not copied into production asset folders.
- Mister Bee label illustrations are protected packaging art, not a source for standalone logos, patterns, icons, or claims.

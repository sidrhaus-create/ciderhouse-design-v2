# Cider House brandbook extraction report

Source reviewed: `cider-house-brandbook-original.pdf`  
Original filename: `БРЕНДБУК.pdf`  
Source format: Adobe Illustrator 29.2 PDF, one 1024 × 2945.7 pt artboard, PDF 1.6  
Source-copy SHA-256: `44A7851357708FDF2C4372ABEC791805320B9CF9B9140E1A2421065FE52D5694`

The repository copy is byte-identical to the supplied PDF. The PDF was reviewed visually and structurally. It contains 156 native vector drawing objects, four embedded raster image placements representing two raster sources, and no embedded font resources.

## Attachments inspected

1. `БРЕНДБУК.pdf`
2. `Монтажная область 1@2x.png` - Mister Bee Classic product-lock image
3. `Монтажная область 2@2x.png` - Mister Bee Lemon product-lock image
4. `Монтажная область 3@2x.png` - Mister Bee Pomegranate Grape product-lock image
5. `ChatGPT Image 14 апр. 2026 г., 14_50_15.png` - pomegranate/raspberry vessel concept reference
6. `ChatGPT Image 14 апр. 2026 г., 15_15_16.png` - watermelon/mint vessel concept reference

No `.woff`, `.woff2`, `.ttf`, `.otf`, or `.eot` files were present in the supplied attachment locations outside project dependencies.

## Official master logo

The official master lockup shown in the PDF combines the colibri symbol on the left with the outlined `CIDERHOUSE` wordmark. The PDF contains native vector paths for this lockup; no font substitution is involved in the exported SVGs.

Safely extracted vector files:

- `../master-logo/cider-house-logo-horizontal-black.svg`
- `../master-logo/cider-house-logo-horizontal-white.svg`
- `../master-logo/cider-house-logo-badge-black.svg`
- `../master-logo/cider-house-logo-badge-white-on-purple.svg`

The horizontal black version is used in the light application header. The horizontal white version is used against the dark footer. Geometry, path direction, and source fill values are preserved from the PDF drawing operators.

## Logo variants

The supplied PDF explicitly demonstrates:

- horizontal white master logo;
- horizontal black master logo;
- circular badge in white on the official purple square;
- circular badge in black on white.

It does not document a separate one-color purple logo, gradient logo, stacked master wordmark, minimum-size rule, or responsive logo substitution. No such variants were invented.

## Brand symbol / colibri

The colibri is the standalone master-brand symbol. Both demonstrated one-color variants are native vector paths:

- `../symbols/cider-house-colibri-black.svg`
- `../symbols/cider-house-colibri-white.svg`

These are direct vector exports, not traced silhouettes.

## Product-family logo references

White Phoenix and Double Tree are embedded as raster images in the supplied PDF rather than vector drawing objects. Their original image streams and masks were extracted without resampling, then only empty surrounding canvas was cropped:

- `../family-logos/white-phoenix-logo-raster-source.png` - 1136 × 600 px, opaque white background
- `../family-logos/double-tree-logo-raster-source.png` - 190 × 126 px, transparent background

Creating SVG versions of these two logos would require tracing and is therefore prohibited. Mister Bee appears as integrated packaging artwork in the supplied bottle images, not as a clean standalone logo source. A standalone 0% logo is not separately present in the inspected attachments. Neither was approximated or reconstructed.

## Official colors

### Master primary

| Specification | Value |
| --- | --- |
| Name | Purple / Фиолетовый |
| Pantone | 7663 C |
| HEX | `#6B3077` |
| RGB | 107, 48, 119 |
| CMYK | 70, 93, 16, 5 |

`#6B3077` is the purple printed in the supplied brandbook and encoded in its vector background. The previous `#5D2F6A` value does not appear in the supplied brandbook and is no longer used as the master-primary website token.

### Official secondary colors

| Name | HEX | RGB | CMYK |
| --- | --- | --- | --- |
| White / Белый | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 |
| Black / Черный | `#000000` | 0, 0, 0 | 91, 79, 62, 97 |

The brandbook does not specify additional purple shades or product-family accent colors. Interface neutrals and accessibility colors in the application are functional UI tokens, not claimed as official brand colors.

## Typography

### Names explicitly stated in the PDF

| Brand family | Official font name shown | Weight/style stated | Documented use |
| --- | --- | --- | --- |
| White Phoenix | `Sauna-SmallCaps` | No separate weight stated | White Phoenix brand-family typography |
| Double Tree | `Cera PRO Medium` | Medium | Double Tree brand-family typography |

The master wordmark and all instructional text in the PDF are converted to outlines. The PDF contains no embedded font resources, so the master-brand typeface, page-heading typeface, body typeface, numeric hierarchy, and weight scale cannot be identified safely from the file.

No licensed font files were attached. `Sauna-SmallCaps` and `Cera PRO Medium` are therefore names only and are not connected through `next/font/local`. The website keeps a clearly marked temporary system fallback until complete licensed webfont files and usage rights exist. Incomplete PDF subsets were not extracted.

## Typography hierarchy and usage rules

The PDF associates `Sauna-SmallCaps` with White Phoenix and `Cera PRO Medium` with Double Tree. It does not define a master-site display/body hierarchy, font sizes, line heights, tracking, responsive scaling, or approved weight combinations. The current website hierarchy is a temporary interface system rather than an extracted brand rule.

## Spacing and logo clear space

The PDF shows logo arrangements inside example areas but contains no annotated exclusion zone, clear-space multiplier, minimum size, alignment grid, or spacing formula. The whitespace visible in the layout must not be treated as a measured rule. Extracted SVG viewBoxes include small technical padding only and do not claim to encode official clear space.

## Patterns, graphic devices, textures, icons, and illustration principles

The only reusable master-brand graphic device explicitly present as clean vector art is the colibri. No standalone master patterns, graffiti textures, icon set, halftone system, or illustration construction rules are supplied in the PDF.

The Mister Bee bottle labels contain bee, honey, fruit, botanical, and ornamental illustrations, but they are protected packaging artwork and are not extracted as reusable site illustrations. The White Phoenix bird and Double Tree emblem remain part of their raster logo references.

## Photography and image direction

The three approved product images establish a product-lock presentation reference: centered front view, complete bottle visible, transparent surround, accurate glass/liquid/label geometry, and no crop.

The two supplied fruit-vessel images establish a separate concept direction: centered vertical vessel, densely packed fresh fruit, saturated red palette, glossy transparency, dramatic backlighting, and dark cinematic surround. They are AI-generated concept references, not approved packaging, logos, or production photography, and are not copied into production asset folders.

The PDF itself contains no formal photography chapter covering people, locations, production, lighting ratios, color grading, crop rules, or licensing.

## Prohibited treatments

The supplied PDF does not include a formal “do not” page with examples of prohibited logo treatments. Accordingly, no undocumented prohibitions are presented as brandbook facts.

For repository safety, the extracted identity files must not be traced, redrawn, simplified, distorted, skewed, recolored into undocumented variants, typeset with substitute fonts, or combined with packaging artwork. These restrictions preserve the supplied source rather than inventing new brand rules.

## Items that could not be extracted safely

- vector White Phoenix logo - raster source only in the PDF;
- vector Double Tree logo - raster source only in the PDF;
- standalone Mister Bee logo - integrated into protected bottle-label artwork only;
- standalone 0% logo - not separately present in the inspected attachments;
- licensed `Sauna-SmallCaps` font files;
- licensed `Cera PRO Medium` font files;
- a master-brand/site typography family or licensed files;
- official logo clear-space and minimum-size rules;
- standalone patterns, textures, icons, or illustration construction assets;
- formal photography rules;
- formal prohibited-treatment examples.

None of these items was approximated.

## Export and integration verification

- All six SVG exports parse as valid XML and retain explicit source `viewBox` geometry.
- The six files were rasterized at high density with aspect-ratio-preserving `contain` sizing and visually compared with the supplied brandbook render. No clipping, path loss, non-uniform scaling, or logo distortion was found.
- White Phoenix and Double Tree raster extractions were reviewed at their native pixel dimensions. No tracing, resampling, or reconstruction was applied to the repository files.
- The header uses the black horizontal SVG with aspect-ratio-preserving CSS; the footer uses the white horizontal SVG in the same way.
- Local route responses for `/design-system` and `/components-preview`, plus all eight extracted asset URLs, returned HTTP 200. The rendered route HTML references the official primary color and extracted assets and contains no pending-logo placeholder marker.

The in-app browser package available in this session is missing its required `scripts/browser-client.mjs`, so screenshot-level browser inspection of the updated routes could not be completed through the mandated browser workflow. Asset-level visual verification and route/DOM integration verification were completed independently.

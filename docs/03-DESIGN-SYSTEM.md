# Design System Direction

## Official brand foundation

The supplied Illustrator brandbook is the authority for the master identity. Its complete extraction audit is stored at `public/assets/brand/guidelines/BRANDBOOK-EXTRACTION.md`.

```css
--color-brand-primary: #6B3077;
--color-brand-secondary-white: #FFFFFF;
--color-brand-secondary-black: #000000;
--color-ink: #000000;
--color-paper: #FFFFFF;
```

Official print/digital specifications:

- Purple: Pantone 7663 C; HEX `#6B3077`; RGB 107, 48, 119; CMYK 70, 93, 16, 5.
- White: HEX `#FFFFFF`; RGB 255, 255, 255; CMYK 0, 0, 0, 0.
- Black: HEX `#000000`; RGB 0, 0, 0; CMYK 91, 79, 62, 97.

Resolution note: the former `#5D2F6A` project value does not appear in the supplied brandbook. `#6B3077` is now the master-primary token. Interface neutrals and accessibility-state colors are functional UI values, not additional official brand colors.

## Extracted identity assets

Approved direct vector exports from the PDF:

- `/assets/brand/master-logo/cider-house-logo-horizontal-black.svg`
- `/assets/brand/master-logo/cider-house-logo-horizontal-white.svg`
- `/assets/brand/master-logo/cider-house-logo-badge-black.svg`
- `/assets/brand/master-logo/cider-house-logo-badge-white-on-purple.svg`
- `/assets/brand/symbols/cider-house-colibri-black.svg`
- `/assets/brand/symbols/cider-house-colibri-white.svg`

White Phoenix and Double Tree are raster-only sources inside the PDF and are retained as PNG without vector tracing. Mister Bee is present only as integrated packaging art in the supplied bottle images. No standalone 0% logo is present.

## Logo usage limits

The brandbook demonstrates horizontal black, horizontal white, circular black, and circular white-on-purple variants. Use an extracted variant that already matches the background. Do not recolor, redraw, simplify, distort, skew, or substitute typography.

The supplied brandbook does not document clear-space multipliers, minimum sizes, an exclusion zone, or a responsive logo substitution rule. Do not infer measured rules from the example layout.

## Typography

Names explicitly printed in the brandbook:

- White Phoenix: `Sauna-SmallCaps`; no separate weight is stated.
- Double Tree: `Cera PRO Medium`; Medium weight.

The master logo and all page text are outlines, and the PDF contains no embedded fonts. No licensed font files were included with the supplied attachments. These font names must not be treated as installed fonts.

Until licensed webfonts are available:

- keep the temporary system fallback tokenized;
- label it temporary in previews and documentation;
- do not use an incomplete PDF subset;
- do not claim the current display/body hierarchy is official brand typography.

Temporary interface roles remain:

- display-xl
- display-lg
- heading-1
- heading-2
- heading-3
- body-lg
- body
- body-sm
- label
- caption

## Visual language

- Strong editorial compositions
- Large typography with clear rhythm
- Product photography as the primary visual asset
- Controlled layering, scale, and depth
- Premium cinematic lighting
- Clean digital UI underneath expressive brand scenes

The two supplied fruit-vessel images are concept references for saturated fruit density, centered vertical framing, transparent vessel material, and dramatic dark-surround lighting. They are not approved packaging or production images.

## Product-lock image direction

- Use only approved files under `/public/assets/products`.
- Keep the complete object visible and preserve the original aspect ratio.
- Never crop, redraw, recolor, distort, or reconstruct packaging.
- Treat label illustration as protected packaging art, not as a reusable site pattern.

## Patterns, graphic devices, and illustration

The colibri is the only clean reusable master-brand vector device in the supplied brandbook. No standalone master pattern, graffiti texture, icon set, halftone system, or illustration construction guide is present. Family accents also remain unspecified; do not invent family colors.

## Avoid

- Generic rounded SaaS cards
- Random glowing gradients
- Excessive blur
- Overuse of pill buttons
- Unrelated stock photography
- Tiny text over busy images
- Repeated marquee text with empty gaps
- Effects that only work on hover
- Decorative animation on every element
- Invented logo variants, colors, fonts, patterns, or illustration assets

## Layout

- Fluid container with safe gutters
- 12-column desktop grid
- 8-column tablet grid
- 4-column mobile grid
- Use fluid type/spacing with `clamp()` where appropriate
- Maintain readable line lengths
- Establish predictable vertical rhythm

These are project interface rules. The supplied brandbook does not define an official logo-spacing or layout grid.

## Component foundation

- Header
- Mobile navigation
- Footer
- Button
- Text link
- Container
- Section
- Grid
- Heading
- Rich text
- Media
- Product image
- Product card
- Brand card
- Filter control
- Modal/dialog
- Drawer
- Accordion
- Tabs
- Form fields
- Toast/status message
- Marquee with duplicate content and no empty frame
- Age gate

## Brand-family differentiation

Official family accent colors, textures, and motion characters are not defined in the supplied brandbook. Family differentiation must wait for an approved source and must never redefine core usability patterns.

**Implementation note (2026-07-21):** `/catalog`'s family chapters (`components/catalog/family-chapter.tsx`) do vary background tone per family via a decorative `theme` token (`warm`/`purple`/`dark`/`muted` in `types/catalog.ts`) built entirely from already-official/established tokens (`--color-home-warm`, `--color-brand-primary`, `--color-home-dark`/`--color-black`, `--color-paper-muted`) — no new hex values. Two small additional decorative-only accents exist (a muted amber tone on Double Tree, a honey tone on Mister Bee) and are explicitly documented as non-brand decoration in `docs/CATALOG-CONTENT-SOURCES.md`, not as new official brandbook colors.

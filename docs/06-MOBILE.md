# Mobile Requirements

## Core rule
Mobile is an independently art-directed experience.

## Navigation
- Compact header
- Accessible menu button
- Full-screen or large drawer navigation
- No hover-only submenus
- Visible close control
- Body scroll lock only while the menu/dialog is open, with reliable cleanup

## Hero media
- Use dedicated vertical media when available
- Cover the viewport without baked-in black bars
- Keep key products within safe areas
- Never rely on `background-attachment: fixed`
- Avoid extremely long pinned scenes
- Provide a poster and fallback image
- Pause or reduce heavy work when media is offscreen

## Touch and viewport
- Minimum comfortable touch targets
- Respect safe-area insets
- Handle dynamic mobile browser bars
- Prefer modern viewport units with fallbacks
- Test orientation change
- Avoid fixed elements that cover browser UI or CTAs

## Performance
- Smaller mobile video
- Responsive images
- Defer non-critical third-party scripts
- No huge transparent PNG when WebP/AVIF is suitable
- Avoid loading all product images at once
- Virtualize only where truly necessary
- Keep animation code split by route/section where possible

## QA scenarios
- Slow 4G
- Low-power mode
- iPhone Safari
- Android Chrome
- 320 px width
- Landscape phone
- Fast flick scroll
- Back/forward navigation
- Menu opened during orientation change

## Catalog mobile simplifications (2026-07-21)

Below 48rem: reveal travel distance and duration shrink, hero product entrance and shimmer sweeps slow further, and the hero's `min-height` is capped at `min(88svh, 46rem)` instead of the desktop `clamp(44rem, 84svh, 58rem)` so the first section never dominates a small viewport. Pointer parallax and card hover-lift are excluded from touch by their `(hover: hover) and (pointer: fine)` media guard rather than a separate mobile check, so there is nothing to "turn off" on touch — it never activates. The hero's three-bottle composition (one focal + two secondary, enlarged again in the fourth pass) was re-checked by hand at 320px after the size increase and still fits within the available column with margin to spare; no bottle is dropped or hidden at any of the required widths. `.chapter__rail` and `.chapter__collection` (Double Tree's below-spotlight modules) are always one column below 48rem — never two narrow cards side by side — becoming two columns only from 48rem up.

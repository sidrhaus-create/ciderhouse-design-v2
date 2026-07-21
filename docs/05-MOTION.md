# Motion System

## Principles
1. Product-first.
2. Native scroll always works.
3. Motion communicates progression.
4. Mobile effects may be different, not merely smaller.
5. Fast scrolling must never break the scene.
6. Every heavy effect has a static fallback.
7. Reduced-motion users receive a complete experience.

## Motion tiers

### Tier 1 — UI feedback
- Button press
- Focus
- Accordion
- Drawer
- Filter selection
- 120–300 ms

### Tier 2 — Section reveal
- Text/image reveals
- Layered entrances
- Small parallax
- 300–900 ms

### Tier 3 — Narrative scenes
- Product camera movement
- Scroll-scrubbed sequences
- Pinned storytelling
- Color-world transitions

Use Tier 3 sparingly.

## Home hero concept
Preferred story:
1. Begin near the three bottle caps.
2. Camera reveals the original bottles.
3. Move toward a clean frontal composition.
4. Introduce brand-family navigation without covering labels.
5. End on a stable hero frame with clear CTA.

Rules:
- exactly approved products;
- no label regeneration;
- no cropped bottle bottoms when full-object composition is required;
- separate desktop/mobile media;
- no black bars;
- no disappearing video before the final frame;
- scrub should feel responsive but not hypersensitive.

## ScrollTrigger rules
- Do not pin the entire site.
- Keep pinned distances proportionate to visible storytelling.
- Recalculate on resize and orientation change.
- Kill/recreate media-query-specific timelines cleanly.
- Avoid creating timelines repeatedly on React render.
- Use GSAP context cleanup.
- Test reverse scroll and rapid direction changes.

## Marquee rule
A continuous ticker must duplicate content sufficiently so that no empty section is visible at any viewport width.

## Reduced motion
When `prefers-reduced-motion: reduce`:
- remove scrubbed camera movement;
- show the strongest static frame;
- preserve all copy and CTAs;
- keep simple opacity transitions optional and minimal.

## Catalog motion (2026-07-21)

`/catalog` uses CSS-only motion, independent of `home-motion.tsx`'s GSAP/ScrollTrigger system: a one-shot staggered entrance per chapter (`.catalog-reveal-stagger`, `SafeReveal`'s existing `IntersectionObserver`, one per section — not per card), a slow (7s) continuous float on the hero's single foreground focal bottle using the standalone CSS `translate`/`scale` properties (composes with, and never overwrites, the static `transform` used for centering/tilt), a very small desktop-only pointer-parallax on the hero cluster (`components/catalog/hero-parallax.tsx`), and a slow (16–20s) CSS background-position shimmer sweep on four sections. All of it disables under `prefers-reduced-motion: reduce`; parallax additionally never attaches its event listener when reduced motion is set or the pointer isn't fine/hover-capable, so it is inert on touch by construction, not just visually suppressed.

**Motion hierarchy (2026-07-21 refinement):** three explicit tiers — scene entry (hero, chapter reveal, formats divider draw, CTA), product interaction (spotlight rise, rail/card hover-lift, grouped reveal), and microinteraction (underline draw, arrow gap-extend, nav marker). At most one continuous product motion is ever on screen: only the hero's focal bottle floats continuously, and even that pauses (`animation-play-state`, driven by an `IntersectionObserver` in `hero-parallax.tsx`) the instant the hero scrolls out of view. The final CTA's bottle deliberately gets a one-shot rise only, never a continuous float, both to avoid a second simultaneous continuous motion and to avoid repeating the hero's own composition.

**Two motion bugs found and fixed this pass** (see `docs/CATALOG-CONTENT-SOURCES.md` § "Catalog visual refinement" for the full explanation): (1) several product entrances used an unconditional `animation` that played out fully on mount, before a below-the-fold element was ever scrolled to — fixed by converting them to a `transition` gated on the ancestor `SafeReveal`'s `data-visible="true"` state; (2) the hero focal bottle's entrance keyframes wrote to `transform`, which already held its static `translateX(-50%)` centering, so the centering was silently discarded once the entrance finished — fixed by moving the entrance to `scale` (its continuous float already owns `translate`, so `transform` had to stay reserved for the static offset). The rule going forward: `transform` is for static positioning only; use `translate` or `scale` for anything animated.

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

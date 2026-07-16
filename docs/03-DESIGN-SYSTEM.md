# Design System Direction

## Brand foundation

```css
--color-brand-primary: #5D2F6A;
--color-brand-purple-2: #6B3077;
--color-brand-purple-3: #774282;
--color-brand-purple-4: #601D70;
--color-ink: #0C0B1A;
--color-paper: #F7F2F4;
--color-white: #FFFFFF;
```

Final colors must be validated against the official brandbook.

## Visual language
- Strong editorial compositions
- Large typography with clear rhythm
- Product photography as the primary visual asset
- Controlled layering, scale, and depth
- Selective paper grain, halftone, graffiti, and hand-made marks
- Premium cinematic lighting
- Clean digital UI underneath expressive brand scenes

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

## Typography
Use approved brand fonts when supplied. Until then:
- use a temporary sans-serif fallback;
- keep font assignment tokenized;
- do not choose permanent substitutes without approval.

Suggested scale tokens:
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

## Layout
- Fluid container with safe gutters
- 12-column desktop grid
- 8-column tablet grid
- 4-column mobile grid
- Use fluid type/spacing with `clamp()` where appropriate
- Maintain readable line lengths
- Establish predictable vertical rhythm

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
Each family may define:
- accent color;
- texture;
- motion character;
- image treatment;
- display typography treatment.

It must not redefine core usability patterns.

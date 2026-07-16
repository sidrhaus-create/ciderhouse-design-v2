You are the lead digital agency, senior frontend architect, interaction designer, and quality owner for the complete Cider House website rebrand.

Your task is to create the PROJECT FOUNDATION only. Do not attempt to design or implement the final homepage yet.

Before making changes:
1. Read `AGENTS.md`.
2. Read every document in `/docs`.
3. Inspect `/public/assets` and `/data`.
4. Report missing inputs and clearly separate blocking from non-blocking gaps.
5. Create a concise implementation plan.

Build a production-oriented Next.js App Router project with TypeScript.

FOUNDATION SCOPE

1. Project setup
- Initialize the application in the current repository.
- Use a maintainable folder structure.
- Configure formatting, linting, type checking, and production build scripts.
- Add a clean environment-variable example with no secrets.
- Create a README section with exact local run and verification commands.

2. Design tokens
Create CSS-variable tokens for:
- brand and neutral colors;
- line-specific accents as placeholders;
- typography roles;
- spacing;
- containers and gutters;
- radii;
- borders;
- shadows;
- z-index layers;
- motion durations/easing.

Use the brandbook-confirmed Pantone 7663 C / `#6B3077` as the master primary, with `#FFFFFF` and `#000000` as official secondary colors. Treat interface support values as functional tokens rather than additional brand colors, and do not invent missing family accents.

3. Application shell
Implement:
- root layout;
- responsive header;
- accessible desktop navigation;
- accessible mobile menu/drawer;
- footer;
- route-level metadata foundation;
- age-gate component and state model, but keep legal copy editable and clearly marked for review.

4. Base components
Implement typed, reusable versions of:
- Container
- Section
- Grid
- Heading/Text
- Button/Link
- Media
- ProductAsset
- ProductCard placeholder
- BrandCard placeholder
- Accordion
- Tabs
- Dialog
- Drawer
- FormField
- Select/Filter control
- Status/Toast
- Marquee that never shows an empty gap

5. Preview routes
Create:
- `/design-system`
- `/components-preview`
- `/motion-playground`

The preview routes should demonstrate:
- typography;
- color tokens;
- spacing;
- buttons and states;
- cards;
- forms;
- dialog/drawer;
- desktop/mobile navigation;
- one product-lock asset when an approved asset exists;
- safe reveal motion;
- a continuous ticker;
- reduced-motion behavior;
- a small ScrollTrigger proof of concept that does not hijack native scrolling.

6. Content foundation
- Add typed product, brand, article, and store models based on `docs/04-CONTENT-MODEL.md`.
- Load sample content from local data files.
- Clearly label sample data as placeholder.
- Do not invent real product claims.

7. Quality
- Mobile-first.
- No global smooth-scroll or wheel interception.
- No horizontal overflow.
- No unnecessary dependencies.
- Semantic HTML and visible focus states.
- `prefers-reduced-motion` support.
- Responsive behavior at all widths listed in `AGENTS.md`.

DO NOT:
- build the final homepage;
- generate fake product packaging;
- redesign labels;
- implement direct alcohol checkout;
- add permanent font substitutes without marking them temporary;
- use large placeholder stock images;
- deploy or change DNS.

At completion:
1. Run formatting, lint, type checking, tests if created, and production build.
2. Fix all errors you can fix.
3. Summarize architecture and design decisions.
4. List every placeholder and missing asset.
5. Provide a route list.
6. Explain how to review `/design-system`, `/components-preview`, and `/motion-playground`.
7. Include the exact next recommended task, but do not implement it.

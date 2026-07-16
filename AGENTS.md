# Cider House Website — Agent Rules

## Mission
Build a premium, modern, multi-page digital brand platform for Cider House. The site must feel fresh, cinematic, energetic, and distinctly branded without sacrificing usability, mobile performance, accessibility, or maintainability.

## Non-negotiable product lock
- Never redraw, regenerate, reinterpret, distort, crop, recolor, or replace real product packaging.
- Preserve exact bottle/can geometry, proportions, glass, liquid color and level, cap, label, typography, logos, text, barcodes, and legal markings.
- Use only approved product assets from `/public/assets/products`.
- Never invent product characteristics, ingredients, awards, availability, legal claims, or production facts.
- Do not use AI-generated packaging in production pages.

## Brand direction
- Primary brand color: Pantone 7663 C / `#6B3077`.
- Official secondary colors: white `#FFFFFF` and black `#000000`.
- Do not treat the former provisional values `#5D2F6A`, `#774282`, `#601D70`, or `#0C0B1A` as official brandbook colors.
- Use line-specific accents only when documented in `docs/03-DESIGN-SYSTEM.md`.
- Visual direction: premium cinematic digital design, editorial typography, expressive motion, modern youth culture, subtle retro/graffiti texture where appropriate.
- Avoid generic beverage templates, excessive gradients, glassmorphism everywhere, random neon, and stock-looking layouts.

## Technology
- Use Next.js App Router with TypeScript.
- Prefer server components by default; use client components only where interactivity requires them.
- Keep content and product data separate from presentation.
- Use reusable components and typed data models.
- Use CSS variables/design tokens for colors, spacing, typography, radii, layers, and motion.
- Use GSAP/ScrollTrigger only for interactions that clearly benefit from it.
- Do not introduce a smooth-scroll library or globally hijack native scrolling.
- Avoid unnecessary dependencies.

## Mobile-first
- Treat mobile as a first-class experience, not a compressed desktop layout.
- Test at 320, 360, 390, 430, 768, 1024, 1440, and 1920 px widths.
- No horizontal scrolling.
- No black bars around video.
- Use separate desktop and mobile video sources where provided.
- Product objects must remain fully visible unless an approved art direction explicitly calls for cropping.
- Touch interactions must not depend on hover.
- Heavy effects must have reduced or static mobile fallbacks.

## Motion and performance
- Motion must support storytelling, hierarchy, and product focus.
- Preserve native wheel, trackpad, keyboard, and touch scrolling.
- Never lock the user in a section.
- Avoid empty pinned space and long dead scroll zones.
- Use `prefers-reduced-motion`.
- Lazy-load non-critical media.
- Always provide video poster images and image fallbacks.
- Avoid autoplay audio.
- Prevent layout shift and hydration mismatch.
- Keep animations reversible and stable during fast scroll.

## Accessibility and UX
- Use semantic HTML and visible focus states.
- Maintain readable contrast.
- All functionality must work by keyboard.
- Meaningful images need alt text; decorative images use empty alt.
- Buttons must be buttons; links must be links.
- Forms need labels, validation, success, error, and loading states.
- The age-gate experience must be accessible and must not trap users.

## Content and legal safety
- Do not modify approved marketing copy without documenting the change.
- Preserve age restriction and legal notices appropriate for alcohol-related content.
- Do not build direct alcohol checkout or delivery flows unless explicitly approved.
- Legal language must remain editable and must be reviewed before production.
- Do not claim compliance, certifications, “number one” status, health benefits, or gluten safety without an approved source.

## Development workflow
Before coding:
1. Read all files in `/docs`.
2. Inspect available assets and data.
3. State assumptions in the task summary.
4. Make a short implementation plan.

After coding:
1. Run formatting, linting, type checking, tests, and production build.
2. Test responsive layouts and interaction fallbacks.
3. Review console errors and warnings.
4. Summarize changed files, decisions, remaining gaps, and verification performed.
5. Do not deploy to production or change DNS without explicit instruction.

## Definition of done
A task is complete only when:
- it matches the brief;
- desktop and mobile are both implemented;
- loading/error/empty states are covered where relevant;
- accessibility and reduced-motion behavior are included;
- checks pass;
- no placeholder copy or invented product data remains unless clearly labeled as placeholder.

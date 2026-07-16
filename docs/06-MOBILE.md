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

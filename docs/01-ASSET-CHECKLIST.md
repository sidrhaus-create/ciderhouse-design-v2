# Asset Checklist

Create the following folder structure inside `public/assets/`.

```text
public/assets/
├── brand/
│   ├── master-logo/
│   ├── symbols/
│   ├── patterns/
│   └── guidelines/
├── fonts/
├── products/
│   ├── double-tree/
│   ├── white-phoenix/
│   ├── mister-bee/
│   ├── zero/
│   ├── cans/
│   └── kegs/
├── lifestyle/
├── production/
├── partners/
├── social/
└── video/
    ├── desktop/
    ├── mobile/
    └── posters/
```

## Required brand assets
- Master logo in SVG
- Monochrome logo versions
- Brand symbol/colibri in SVG
- Logos of all product families
- Official color specifications
- Licensed webfonts (`woff2` preferred)
- Approved patterns, graffiti, icons, and illustration systems
- Brandbook PDF or source files

## Required product assets
For every SKU where possible:
- Front transparent PNG/WebP
- 3/4 transparent PNG/WebP
- Back view
- Cap/top view
- Label artwork or print-ready reference
- Correct liquid-color reference
- Separate natural shadow
- High-resolution source
- Product metadata row in `data/products.template.csv`

## Video requirements
For each important sequence:
- Desktop master, ideally 16:9
- Mobile master, ideally 9:16
- MP4 version
- WebM version
- Poster frame
- First and final reference frame
- No embedded black bars
- No baked-in UI text unless approved
- A written description of scroll behavior

## Naming rule
Use stable lowercase kebab-case names.

Example:

```text
white-phoenix-zero-green-apple-front.webp
white-phoenix-zero-green-apple-34.webp
white-phoenix-zero-green-apple-shadow.webp
hero-bottles-desktop.webm
hero-bottles-mobile.webm
hero-bottles-poster.webp
```

## Asset status labels
Maintain one of:
- approved
- temporary
- missing
- replace-before-production

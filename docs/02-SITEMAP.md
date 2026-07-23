# Proposed Sitemap

> **Implementation status (2026-07-23):** `/catalog`, `/production`, and seven `/brands/[slug]` routes are implemented — `double-tree`, `dtree-party`, `white-phoenix`, `mister-bee`, `migliore`, `bumble-coffee`, `zero` — see `data/catalog-content.ts`, `docs/CATALOG-CONTENT-SOURCES.md`, `docs/PRODUCTION-CONTENT-SOURCES.md`, and `README.md`. DTREE PARTY, Migliore, and Bumble Coffee are structurally live but have no sourced content yet. `/production` reuses the same sourced production copy and statistics already stored in `data/homepage-content.ts` (`production`, `statistics`); the former `/production → /#production-story` temporary redirect in `next.config.ts` was removed since the real route now exists — the homepage's own `#production-story` section is unchanged and still reachable directly. An isolated, unlisted experimental prototype also exists at `/catalog-concept` (Double Tree only, not linked from navigation, not in the sitemap). The `/catalog/*` sub-category paths, `/product/[slug]`, and every other route below remain proposed/not implemented.

## Core routes

```text
/
├── /catalog
│   ├── /catalog/cider
│   ├── /catalog/mead
│   ├── /catalog/non-alcoholic
│   ├── /catalog/cans
│   └── /product/[slug]
├── /brands
│   ├── /brands/double-tree
│   ├── /brands/white-phoenix
│   ├── /brands/mister-bee
│   └── /brands/zero
├── /production
├── /about
├── /where-to-buy
├── /partners
│   ├── /partners/distributors
│   ├── /partners/retail
│   └── /partners/horeca
├── /news
│   └── /news/[slug]
├── /recipes
│   └── /recipes/[slug]
├── /merch
├── /contacts
├── /faq
├── /privacy
├── /personal-data-consent
└── /legal
```

## Utility and preview routes

```text
/design-system
/components-preview
/motion-playground
/404
```

Preview routes may be protected or disabled in production.

## Home page sequence

1. Age gate when required
2. Header
3. Cinematic product hero
4. Brand-family selector
5. New 0% collection
6. Bestseller/product discovery
7. Brand/production promise
8. Scroll-driven production story
9. Where to buy
10. Partnership CTA
11. News/events
12. Social channels
13. FAQ preview
14. Footer

## Catalog behavior

Filters:
- category
- brand family
- flavor profile
- sweetness
- alcohol/non-alcoholic
- package format
- volume
- availability

Every selected filter should be reflected in the URL where practical.

## Product page sections

1. Product hero
2. Essential facts
3. Flavor description
4. Packaging/formats
5. Ingredients and official product information
6. Serving/pairing suggestions, only when approved
7. Related products
8. Where to buy
9. Legal notes

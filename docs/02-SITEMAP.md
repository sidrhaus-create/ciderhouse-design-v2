# Proposed Sitemap

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

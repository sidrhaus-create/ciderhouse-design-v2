# Content Model

## Product

```ts
type Product = {
  id: string;
  slug: string;
  name: string;
  brand: "double-tree" | "white-phoenix" | "mister-bee" | "zero" | "other";
  category: "cider" | "mead" | "non-alcoholic" | "lemonade" | "other";
  flavor: string;
  shortDescription: string;
  fullDescription?: string;
  alcoholPercent?: number;
  isNonAlcoholic: boolean;
  sweetness?: "dry" | "semi-dry" | "semi-sweet" | "sweet";
  volumes: string[];
  formats: Array<"bottle" | "can" | "keg">;
  ingredients?: string;
  nutrition?: string;
  shelfLife?: string;
  serving?: string;
  pairings?: string[];
  badges?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  status: "draft" | "published" | "archived";
  assets: {
    front: string;
    threeQuarter?: string;
    back?: string;
    shadow?: string;
    mobile?: string;
  };
  seo: {
    title: string;
    description: string;
  };
};
```

## Store/location

```ts
type StoreLocation = {
  id: string;
  name: string;
  chain?: string;
  city: string;
  region?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  productCategories?: string[];
  externalUrl?: string;
  status: "active" | "inactive";
};
```

## Article/news
- title
- slug
- excerpt
- cover
- body
- category
- publication date
- event date when applicable
- related products
- SEO fields
- status

## Partner lead
- company
- contact name
- email
- phone
- city/region
- partnership type
- message
- consent
- source page
- submission status

## Content rules
- No product facts may be inferred from visuals.
- Missing information remains missing.
- Draft content must be visibly labeled.
- Content must be editable outside component code.

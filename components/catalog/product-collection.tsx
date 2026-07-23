import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import type { ProductRecord } from "@/types/catalog";

type ProductCollectionProps = {
  products: ProductRecord[];
  familyHref: string;
};

/** Shared secondary-product grid: one column on mobile, two on desktop — never four narrow cards. */
export function ProductCollection({
  products,
  familyHref,
}: ProductCollectionProps) {
  if (products.length === 0) return null;

  return (
    <div className="product-collection">
      {products.map((product) => (
        <CatalogProductCard
          familyHref={familyHref}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

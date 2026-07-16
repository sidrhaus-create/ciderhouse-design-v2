import Image from "next/image";
import type { Brand, Product } from "@/types/content";
import { ProductAsset } from "./product-asset";
import { Heading, Text } from "./typography";

type ProductCardProps = {
  product: Product;
  placeholder?: boolean;
};

export function ProductCard({
  product,
  placeholder = false,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__asset">
        <ProductAsset
          alt="Approved Mister Bee product-lock asset, shown unchanged"
          height={870}
          src={product.assets.front}
          width={182}
        />
      </div>
      <div className="product-card__body">
        {placeholder ? (
          <span className="status-chip">Placeholder data</span>
        ) : null}
        <Heading as="h3" size="heading-3">
          {product.name}
        </Heading>
        <Text tone="muted">{product.shortDescription}</Text>
        <Text as="span" size="caption" tone="muted">
          Status: {product.status}
        </Text>
      </div>
    </article>
  );
}

type BrandCardProps = {
  brand: Brand;
  placeholder?: boolean;
};

export function BrandCard({ brand, placeholder = false }: BrandCardProps) {
  return (
    <article className="brand-card">
      {brand.logo ? (
        <div className="brand-card__logo">
          <Image
            alt={`${brand.name} logo extracted from the supplied brandbook`}
            fill
            sizes="(max-width: 767px) 75vw, 28vw"
            src={brand.logo}
          />
        </div>
      ) : null}
      <div>
        {placeholder ? (
          <span className="status-chip">Placeholder copy</span>
        ) : null}
        <Heading as="h3" size="heading-3">
          {brand.name}
        </Heading>
        <Text tone="muted">{brand.shortDescription}</Text>
      </div>
    </article>
  );
}

export function EmptyCard({ message }: { message: string }) {
  return (
    <div className="empty-card" role="status">
      <span aria-hidden="true" className="empty-card__symbol">
        ∅
      </span>
      <Text>{message}</Text>
    </div>
  );
}

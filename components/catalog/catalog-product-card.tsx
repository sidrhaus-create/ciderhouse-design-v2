import Link from "next/link";
import { ProductAsset } from "@/components/ui/product-asset";
import { formatLabels, type ProductRecord } from "@/types/catalog";

const statusLabels: Record<string, string> = {
  "requires-approval": "Требует подтверждения",
  "asset-missing": "Изображение недоступно",
  unavailable: "Недоступно",
};

type CatalogProductCardProps = {
  product: ProductRecord;
  familyHref?: string;
};

export function CatalogProductCard({
  product,
  familyHref,
}: CatalogProductCardProps) {
  const statusLabel = statusLabels[product.availabilityStatus];
  const titleText = product.flavor;

  return (
    <article className="catalog-card" data-home-reveal>
      <div className="catalog-card__asset">
        {product.asset ? (
          <ProductAsset
            alt={product.asset.alt}
            height={product.asset.height}
            sizes="(max-width: 767px) 44vw, 220px"
            src={product.asset.src}
            width={product.asset.width}
          />
        ) : (
          <div className="catalog-card__missing" role="status">
            <span aria-hidden="true">∅</span>
            <p>Изображение недоступно</p>
          </div>
        )}
      </div>
      <div className="catalog-card__body">
        <h3 className="catalog-card__title">
          {familyHref ? (
            <Link href={familyHref}>
              {titleText}
              <span className="catalog-card__name"> · {product.name}</span>
            </Link>
          ) : (
            <>
              {titleText}
              <span className="catalog-card__name"> · {product.name}</span>
            </>
          )}
        </h3>
        <dl className="catalog-card__facts">
          {product.format ? (
            <div>
              <dt>Формат</dt>
              <dd>{formatLabels[product.format]}</dd>
            </div>
          ) : null}
          {product.volume ? (
            <div>
              <dt>Объём</dt>
              <dd>{product.volume}</dd>
            </div>
          ) : null}
          {product.alcoholClassification ? (
            <div>
              <dt>Классификация</dt>
              <dd>{product.alcoholClassification}</dd>
            </div>
          ) : null}
        </dl>
        {statusLabel ? (
          <span className="status-chip catalog-card__status">
            {statusLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}

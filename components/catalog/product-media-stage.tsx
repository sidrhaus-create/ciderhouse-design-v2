import type { CSSProperties } from "react";
import { ProductAsset } from "@/components/ui/product-asset";
import type { CatalogAsset, ProductVisualAdjust } from "@/types/catalog";

export type ProductMediaStageVariant = "spotlight" | "spotlight-duo" | "card";

type ProductMediaStageProps = {
  asset: CatalogAsset;
  variant: ProductMediaStageVariant;
  sizes?: string;
  priority?: boolean;
  visual?: ProductVisualAdjust;
};

/**
 * The one shared media container for product packaging inside catalog
 * chapters and cards: stable min/max height per context, `object-fit:
 * contain` so the full bottle (cap and base) is always visible, and no text
 * ever rendered inside it. `visual` only nudges scale/offset for
 * cross-asset normalization within a collection — it never crops or
 * stretches the source image.
 */
export function ProductMediaStage({
  asset,
  variant,
  sizes = "(max-width: 767px) 70vw, 34vw",
  priority = false,
  visual,
}: ProductMediaStageProps) {
  const style = {
    "--stage-scale": visual?.scale ?? 1,
    "--stage-offset-y": `${visual?.offsetY ?? 0}rem`,
  } as CSSProperties;

  return (
    <div
      className={`product-media-stage product-media-stage--${variant}`}
      style={style}
    >
      <ProductAsset
        alt={asset.alt}
        height={asset.height}
        priority={priority}
        sizes={sizes}
        src={asset.src}
        width={asset.width}
      />
    </div>
  );
}

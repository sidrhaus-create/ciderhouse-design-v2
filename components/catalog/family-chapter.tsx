import Image from "next/image";
import Link from "next/link";
import { SafeReveal } from "@/components/motion/safe-reveal";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { ProductSpotlight } from "@/components/catalog/product-spotlight";
import type { ProductFamily, ProductRecord } from "@/types/catalog";

export type ChapterVariant =
  "spotlight-left" | "stage-right" | "dark-centered" | "split-rail";

type FamilyChapterProps = {
  family: ProductFamily;
  index: number;
  variant: ChapterVariant;
  priority?: boolean;
};

const linework: Partial<Record<string, "grid" | "rings" | "diagonal">> = {
  "dtree-party": "diagonal",
  "mister-bee": "rings",
  "white-phoenix": "diagonal",
  "bumble-coffee": "grid",
  zero: "rings",
};

/** Families whose secondary/rail bottles render bare (no card surface). */
const bareRailFamilies = new Set(["mister-bee"]);

/** Families that pair their top two products as one composition instead of a switcher. */
const duoSpotlightFamilies = new Set(["double-tree"]);

export function FamilyChapter({
  family,
  index,
  variant,
  priority = false,
}: FamilyChapterProps) {
  const assetProducts = family.products.filter((product) => product.asset);
  const hasCompositeOnly =
    assetProducts.length === 0 && family.heroAssets.length > 0;
  const isPending = assetProducts.length === 0 && !hasCompositeOnly;
  const isDuo = duoSpotlightFamilies.has(family.slug);
  const isBareRail = bareRailFamilies.has(family.slug);

  const spotlightProducts: ProductRecord[] = hasCompositeOnly
    ? [
        {
          id: `${family.slug}-composite`,
          familySlug: family.slug,
          name: family.title,
          flavor: family.characterNotes.join(" · "),
          asset: family.heroAssets[0],
          availabilityStatus: family.status,
          approvalStatus: family.status,
          sourceUrl: family.sourceUrl,
        },
      ]
    : variant === "split-rail"
      ? assetProducts.slice(0, 1)
      : isDuo
        ? assetProducts.slice(0, 2)
        : assetProducts.slice(0, 4);

  const railProducts =
    variant === "split-rail" ? assetProducts.slice(1, 4) : [];

  const collectionProducts = isDuo ? assetProducts.slice(2, 6) : [];

  const line = linework[family.slug];
  const identity = (
    <div className="chapter__identity catalog-reveal-stagger">
      {family.logo ? (
        <Image
          alt={family.logo.alt}
          className="chapter__logo"
          height={family.logo.height}
          src={family.logo.src}
          width={family.logo.width}
        />
      ) : null}
      <p className="family-kicker">
        <span aria-hidden="true" className="catalog-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        {family.categoryLabel}
      </p>
      <h2 className="chapter__title" id={`${family.slug}-title`}>
        {family.title}
      </h2>
      <p className="chapter__description">{family.description}</p>
      {family.missingAssetNote ? (
        <p className="family-missing-note" role="note">
          {family.missingAssetNote}
        </p>
      ) : null}
      <Link className="catalog-family__link" href={`/brands/${family.slug}`}>
        Смотреть направление {family.navLabel} <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );

  return (
    <section
      aria-labelledby={`${family.slug}-title`}
      className={`chapter chapter--${variant} catalog-family--${family.slug}`}
      id={family.slug}
    >
      {line ? (
        <div
          aria-hidden="true"
          className={`catalog-linework catalog-linework--${line}`}
        />
      ) : null}
      {family.theme === "dark" ? (
        <div aria-hidden="true" className="catalog-shimmer" />
      ) : null}
      <SafeReveal className="container container--wide chapter__layout catalog-reveal-rule">
        {isPending ? (
          <div className={`chapter__pending chapter__pending--${family.slug}`}>
            {identity}
            <div aria-hidden="true" className="chapter__pending-index">
              {String(index + 1).padStart(2, "0")}
            </div>
            {family.slug === "dtree-party" ? (
              <div aria-hidden="true" className="chapter__pending-word">
                PARTY
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {identity}
            <div className="chapter__stage">
              <ProductSpotlight
                mode={isDuo ? "duo" : "single"}
                priority={priority}
                products={spotlightProducts}
                sharedFlavorLabel={
                  hasCompositeOnly
                    ? family.characterNotes.join(" · ")
                    : undefined
                }
              />
              {railProducts.length > 0 ? (
                <div
                  className={`chapter__rail${isBareRail ? " chapter__rail--bare" : ""}`}
                >
                  {railProducts.map((product) =>
                    isBareRail && product.asset ? (
                      <figure className="chapter__rail-item" key={product.id}>
                        <Image
                          alt={product.asset.alt}
                          height={product.asset.height}
                          sizes="(max-width: 767px) 40vw, 16vw"
                          src={product.asset.src}
                          unoptimized
                          width={product.asset.width}
                        />
                        <figcaption>{product.flavor}</figcaption>
                      </figure>
                    ) : (
                      <CatalogProductCard
                        familyHref={`/brands/${family.slug}`}
                        key={product.id}
                        product={product}
                      />
                    ),
                  )}
                </div>
              ) : null}
            </div>
            {collectionProducts.length > 0 ? (
              <div className="chapter__collection">
                {collectionProducts.map((product) => (
                  <CatalogProductCard
                    familyHref={`/brands/${family.slug}`}
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : null}
          </>
        )}
      </SafeReveal>
    </section>
  );
}

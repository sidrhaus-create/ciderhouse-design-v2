import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { SafeReveal } from "@/components/motion/safe-reveal";
import { CatalogFamilyNav } from "@/components/catalog/catalog-family-nav";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { HeroParallax } from "@/components/catalog/hero-parallax";
import { catalogContent, productFamilies } from "@/data/catalog-content";
import { formatLabels, type ProductFormat } from "@/types/catalog";

export const metadata: Metadata = {
  title: catalogContent.seo.title,
  description: catalogContent.seo.description,
  alternates: {
    canonical: "/catalog",
  },
  openGraph: {
    title: catalogContent.seo.title,
    description: catalogContent.seo.description,
    type: "website",
  },
};

const heroComposition = [
  {
    src: "/assets/products/double-tree/double-tree-045-pear-front.png",
    alt: "Бутылка Double Tree Груша; упаковка показана без изменений",
    width: 1680,
    height: 2100,
  },
  {
    src: "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
    alt: "Классическая бутылка медовухи Mister Bee; упаковка показана без изменений",
    width: 182,
    height: 870,
  },
  {
    src: "/assets/products/white-phoenix/white-phoenix-cherry-passionfruit-front.png",
    alt: "Бутылка White Phoenix Вишня-маракуйя; упаковка показана без изменений",
    width: 1680,
    height: 2100,
  },
] as const;

const allFormats: ProductFormat[] = ["bottle", "can", "keg"];

export default function CatalogPage() {
  return (
    <div className="catalog-page">
      <section aria-labelledby="catalog-hero-title" className="catalog-hero">
        <div
          aria-hidden="true"
          className="catalog-linework catalog-linework--grid"
        />
        <div aria-hidden="true" className="catalog-shimmer" />
        <div className="container container--wide catalog-hero__layout">
          <div className="catalog-hero__copy catalog-reveal-stagger">
            <p className="family-kicker">{catalogContent.eyebrow}</p>
            <h1 className="catalog-hero__title" id="catalog-hero-title">
              {catalogContent.title}
            </h1>
            <p className="catalog-hero__body">{catalogContent.body}</p>
            <div className="family-actions">
              <ButtonLink
                className="family-button"
                href={catalogContent.primaryCta.href}
                variant="inverse"
              >
                {catalogContent.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                className="family-button family-button--outline"
                href={catalogContent.secondaryCta.href}
                variant="secondary"
              >
                {catalogContent.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <HeroParallax
            ariaLabel="Продукция Cider House"
            className="catalog-hero__products catalog-hero__products--enter"
          >
            {heroComposition.map((asset) => (
              <Image
                alt={asset.alt}
                className="catalog-hero__bottle"
                height={asset.height}
                key={asset.src}
                priority
                sizes="(max-width: 768px) 30vw, 16vw"
                src={asset.src}
                unoptimized
                width={asset.width}
              />
            ))}
          </HeroParallax>
        </div>
      </section>

      <CatalogFamilyNav
        items={productFamilies.map((family) => ({
          slug: family.slug,
          label: family.navLabel,
        }))}
      />

      {productFamilies.map((family, index) => {
        const withAsset = family.products
          .filter((product) => product.asset)
          .slice(0, 4);
        const visibleProducts =
          withAsset.length > 0 ? withAsset : family.products.slice(0, 3);

        const linework =
          family.slug === "dtree-party"
            ? "diagonal"
            : family.slug === "mister-bee"
              ? "rings"
              : null;

        return (
          <section
            aria-labelledby={`${family.slug}-title`}
            className={`catalog-family catalog-family--${family.slug}`}
            id={family.slug}
            key={family.slug}
          >
            {linework ? (
              <div
                aria-hidden="true"
                className={`catalog-linework catalog-linework--${linework}`}
              />
            ) : null}
            {family.theme === "dark" ? (
              <div aria-hidden="true" className="catalog-shimmer" />
            ) : null}
            <SafeReveal className="container container--wide catalog-family__layout catalog-reveal-rule">
              <div className="catalog-family__identity catalog-reveal-stagger">
                {family.logo ? (
                  <Image
                    alt={family.logo.alt}
                    className="catalog-family__logo"
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
                <h2
                  className="catalog-family__title"
                  id={`${family.slug}-title`}
                >
                  {family.title}
                </h2>
                <p className="catalog-family__description">
                  {family.description}
                </p>
                <Link
                  className="catalog-family__link"
                  href={`/brands/${family.slug}`}
                >
                  Смотреть направление {family.navLabel}{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="catalog-family__products">
                {family.missingAssetNote ? (
                  <p className="family-missing-note" role="note">
                    {family.missingAssetNote}
                  </p>
                ) : null}
                {visibleProducts.length > 0 ? (
                  <div className="catalog-grid catalog-grid--compact">
                    {visibleProducts.map((product) => (
                      <CatalogProductCard
                        familyHref={`/brands/${family.slug}`}
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="family-empty-note" role="status">
                    Подтверждённые продукты этой линейки пока не опубликованы
                    официальным источником.
                  </p>
                )}
              </div>
            </SafeReveal>
          </section>
        );
      })}

      <section
        aria-labelledby="catalog-formats-title"
        className="catalog-formats"
      >
        <div
          aria-hidden="true"
          className="catalog-shimmer catalog-shimmer--light"
        />
        <SafeReveal className="container container--wide catalog-reveal-rule">
          <h2 className="family-section-title" id="catalog-formats-title">
            Форматы
          </h2>
          <div className="catalog-formats__table" role="table">
            <div
              className="catalog-formats__row catalog-formats__row--head"
              role="row"
            >
              <span role="columnheader">Направление</span>
              {allFormats.map((format) => (
                <span key={format} role="columnheader">
                  {formatLabels[format]}
                </span>
              ))}
            </div>
            {productFamilies.map((family) => (
              <div
                className="catalog-formats__row"
                key={family.slug}
                role="row"
              >
                <span role="rowheader">{family.navLabel}</span>
                {allFormats.map((format) => (
                  <span key={format} role="cell">
                    {family.formats.includes(format) ? "✓" : "—"}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="catalog-formats__note">
            Формат отмечен только для направлений, где он подтверждён
            источником. Отметка не означает, что каждый вкус выпускается в
            каждом формате.
          </p>
        </SafeReveal>
      </section>

      <section aria-labelledby="catalog-cta-title" className="catalog-cta">
        <div
          aria-hidden="true"
          className="catalog-linework catalog-linework--grid"
        />
        <div aria-hidden="true" className="catalog-shimmer" />
        <SafeReveal className="container container--wide catalog-cta__layout">
          <h2 className="family-section-title" id="catalog-cta-title">
            {catalogContent.cta.title}
          </h2>
          <p>{catalogContent.cta.body}</p>
          <div className="family-actions">
            {catalogContent.cta.actions.map((action, index) => (
              <ButtonLink
                className={
                  index === 0
                    ? "family-button"
                    : "family-button family-button--outline"
                }
                href={action.href}
                key={action.href}
                variant={index === 0 ? "inverse" : "secondary"}
              >
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </SafeReveal>
      </section>
    </div>
  );
}

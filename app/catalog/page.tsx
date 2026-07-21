import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SafeReveal } from "@/components/motion/safe-reveal";
import { CatalogFamilyNav } from "@/components/catalog/catalog-family-nav";
import { HeroParallax } from "@/components/catalog/hero-parallax";
import {
  FamilyChapter,
  type ChapterVariant,
} from "@/components/catalog/family-chapter";
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

const heroFocal = {
  src: "/assets/products/white-phoenix/white-phoenix-cherry-passionfruit-front.png",
  alt: "Бутылка White Phoenix Вишня-маракуйя; упаковка показана без изменений",
  width: 1680,
  height: 2100,
};

const heroSecondary = [
  {
    src: "/assets/products/double-tree/double-tree-045-dark-cherry-front.png",
    alt: "Бутылка Double Tree Тёмная вишня; упаковка показана без изменений",
    width: 1680,
    height: 2100,
    position: "left" as const,
  },
  {
    src: "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
    alt: "Классическая бутылка медовухи Mister Bee; упаковка показана без изменений",
    width: 182,
    height: 870,
    position: "right" as const,
  },
];

const allFormats: ProductFormat[] = ["bottle", "can", "keg"];

const chapterVariants: Record<string, ChapterVariant> = {
  "double-tree": "stage-right",
  "dtree-party": "spotlight-left",
  "white-phoenix": "dark-centered",
  "mister-bee": "split-rail",
  migliore: "stage-right",
  "bumble-coffee": "spotlight-left",
  zero: "dark-centered",
};

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
          <SafeReveal className="catalog-hero__copy catalog-reveal-stagger">
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
          </SafeReveal>
          <HeroParallax
            ariaLabel="Продукция Cider House"
            className="catalog-hero__stage catalog-hero__stage--enter"
          >
            {heroSecondary.map((asset) => (
              <Image
                alt={asset.alt}
                className={`catalog-hero__secondary catalog-hero__secondary--${asset.position}`}
                height={asset.height}
                key={asset.src}
                sizes="(max-width: 768px) 24vw, 14vw"
                src={asset.src}
                unoptimized
                width={asset.width}
              />
            ))}
            <Image
              alt={heroFocal.alt}
              className="catalog-hero__focal"
              height={heroFocal.height}
              priority
              sizes="(max-width: 768px) 52vw, 26vw"
              src={heroFocal.src}
              unoptimized
              width={heroFocal.width}
            />
          </HeroParallax>
        </div>
      </section>

      <CatalogFamilyNav
        items={productFamilies.map((family) => ({
          slug: family.slug,
          label: family.navLabel,
          theme: family.theme,
        }))}
      />

      {productFamilies.map((family, index) => (
        <FamilyChapter
          family={family}
          index={index}
          key={family.slug}
          priority={index === 0}
          variant={chapterVariants[family.slug] ?? "spotlight-left"}
        />
      ))}

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
          <div className="format-system">
            {allFormats.map((format, formatIndex) => {
              const supportingFamilies = productFamilies.filter((family) =>
                family.formats.includes(format),
              );
              return (
                <div className="format-system__column" key={format}>
                  <span aria-hidden="true" className="catalog-index">
                    {String(formatIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="format-system__name">
                    {formatLabels[format]}
                  </h3>
                  {supportingFamilies.length > 0 ? (
                    <ul className="format-system__families">
                      {supportingFamilies.map((family) => (
                        <li key={family.slug}>
                          <span
                            aria-hidden="true"
                            className="format-system__dot"
                          />
                          {family.navLabel}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="format-system__empty">
                      Пока не подтверждено ни для одного направления.
                    </p>
                  )}
                </div>
              );
            })}
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
          className="catalog-linework catalog-linework--diagonal"
        />
        <div aria-hidden="true" className="catalog-shimmer" />
        <SafeReveal className="container container--wide catalog-cta__layout">
          <div className="catalog-cta__copy catalog-reveal-stagger">
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
          </div>
          <Image
            alt="Бутылка Double Tree Груша; упаковка показана без изменений"
            className="catalog-cta__bottle"
            height={2100}
            sizes="(max-width: 768px) 40vw, 18vw"
            src="/assets/products/double-tree/double-tree-045-pear-front.png"
            unoptimized
            width={1680}
          />
        </SafeReveal>
      </section>
    </div>
  );
}

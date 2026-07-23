import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { SafeReveal } from "@/components/motion/safe-reveal";
import { BackToTop } from "@/components/catalog/back-to-top";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { productFamilies } from "@/data/catalog-content";
import { formatLabels, type ProductFamily } from "@/types/catalog";

export function FamilyPageTemplate({ family }: { family: ProductFamily }) {
  const otherFamilies = productFamilies.filter(
    (item) => item.slug !== family.slug,
  );
  const familyIndex = productFamilies.findIndex(
    (item) => item.slug === family.slug,
  );
  const previousFamily =
    productFamilies[
      (familyIndex - 1 + productFamilies.length) % productFamilies.length
    ];
  const nextFamily =
    productFamilies[(familyIndex + 1) % productFamilies.length];

  return (
    <div className={`family-page family-page--${family.slug}`}>
      <section aria-labelledby="family-hero-title" className="family-hero">
        {family.theme === "purple" || family.theme === "dark" ? (
          <div
            aria-hidden="true"
            className={`catalog-linework catalog-linework--${
              familyIndex % 2 === 0 ? "diagonal" : "rings"
            }`}
          />
        ) : null}
        <div className="container container--wide family-hero__layout">
          <div className="family-hero__copy catalog-reveal-stagger">
            <p className="family-kicker">
              <span className="catalog-index" aria-hidden="true">
                {String(familyIndex + 1).padStart(2, "0")}
              </span>
              {family.categoryLabel}
            </p>
            {family.logo ? (
              <Image
                alt={family.logo.alt}
                className="family-hero__logo"
                height={family.logo.height}
                src={family.logo.src}
                width={family.logo.width}
              />
            ) : null}
            <h1 className="family-hero__title" id="family-hero-title">
              {family.title}
            </h1>
            <p className="family-hero__body">{family.description}</p>
            <div className="family-actions">
              <ButtonLink
                className="family-button"
                href="#products"
                variant="inverse"
              >
                Смотреть продукцию
              </ButtonLink>
              <ButtonLink
                className="family-button family-button--outline"
                href="/where-to-buy"
                variant="secondary"
              >
                Где купить
              </ButtonLink>
            </div>
          </div>
          {family.heroAssets.length > 0 ? (
            <div
              aria-label={`Продукция ${family.title}`}
              className="family-hero__products"
            >
              {family.heroAssets.map((asset) => (
                <Image
                  alt={asset.alt}
                  className="family-hero__bottle"
                  height={asset.height}
                  key={asset.src}
                  sizes="(max-width: 768px) 40vw, 22vw"
                  src={asset.src}
                  unoptimized
                  width={asset.width}
                />
              ))}
            </div>
          ) : (
            <div className="family-hero__pending" role="status">
              <span aria-hidden="true">∅</span>
              <p>Официальное изображение пока не подтверждено</p>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="family-story-title" className="family-story">
        <SafeReveal className="container container--narrow catalog-reveal-rule">
          <h2 className="family-section-title" id="family-story-title">
            О линейке
          </h2>
          {family.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </SafeReveal>
      </section>

      <section
        aria-labelledby="family-products-title"
        className="family-products"
        id="products"
      >
        {family.theme === "dark" ? (
          <div aria-hidden="true" className="catalog-shimmer" />
        ) : null}
        <SafeReveal className="container container--wide catalog-reveal-rule">
          <h2 className="family-section-title" id="family-products-title">
            Продукция
          </h2>
          {family.missingAssetNote ? (
            <p className="family-missing-note" role="note">
              {family.missingAssetNote}
            </p>
          ) : null}
          {family.products.length > 0 ? (
            <div className="catalog-grid">
              {family.products.map((product) => (
                <CatalogProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="family-empty-note" role="status">
              Подтверждённые продукты этой линейки пока не опубликованы
              официальным источником.
            </p>
          )}
        </SafeReveal>
      </section>

      <section
        aria-labelledby="family-formats-title"
        className="family-formats"
      >
        <SafeReveal className="container container--wide catalog-reveal-rule">
          <h2 className="family-section-title" id="family-formats-title">
            Форматы
          </h2>
          {family.formats.length > 0 ? (
            <ul className="family-formats__list">
              {family.formats.map((format) => (
                <li key={format}>{formatLabels[format]}</li>
              ))}
            </ul>
          ) : (
            <p className="family-empty-note" role="status">
              Форматы пока не подтверждены официальным источником.
            </p>
          )}
        </SafeReveal>
      </section>

      <section
        aria-labelledby="family-character-title"
        className="family-character"
      >
        <SafeReveal className="container container--wide">
          <h2 className="family-section-title" id="family-character-title">
            Направление вкуса
          </h2>
          {family.characterNotes.length > 0 ? (
            <ul className="family-character__list">
              {family.characterNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : (
            <p className="family-empty-note" role="status">
              Направление вкуса пока не подтверждено официальным источником.
            </p>
          )}
        </SafeReveal>
      </section>

      <section aria-labelledby="family-other-title" className="family-other">
        <SafeReveal className="container container--wide">
          <h2 className="family-section-title" id="family-other-title">
            Другие направления
          </h2>
          <div className="family-prev-next">
            <Link href={`/brands/${previousFamily.slug}`}>
              <span aria-hidden="true">←</span> {previousFamily.navLabel}
            </Link>
            <Link href={`/brands/${nextFamily.slug}`}>
              {nextFamily.navLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="family-other__list">
            {otherFamilies.map((other) => (
              <li key={other.slug}>
                <Link href={`/brands/${other.slug}`}>{other.navLabel}</Link>
              </li>
            ))}
          </ul>
        </SafeReveal>
      </section>

      <section
        aria-labelledby="family-final-cta-title"
        className="family-final-cta"
      >
        <div className="container container--wide family-final-cta__layout">
          <h2 className="family-section-title" id="family-final-cta-title">
            {family.title} — часть ассортимента Cider House
          </h2>
          <div className="family-actions">
            <ButtonLink
              className="family-button"
              href="/catalog"
              variant="inverse"
            >
              Смотреть весь ассортимент
            </ButtonLink>
            <ButtonLink
              className="family-button family-button--outline"
              href="/where-to-buy"
              variant="secondary"
            >
              Где купить
            </ButtonLink>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  );
}

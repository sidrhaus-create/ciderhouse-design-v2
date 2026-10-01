import type { Metadata } from "next";
import Link from "next/link";
import { BackToTop } from "@/components/catalog/back-to-top";
import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad } from "@/components/site/text";
import { Bottle } from "@/components/ui/bottle";
import { catalogContent, productFamilies } from "@/data/catalog-content";
import { catalogCount, explorerFamilies, shelfRow } from "@/data/showcase";
import { plural, POSITIONS } from "@/lib/plural";
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

const allFormats: ProductFormat[] = ["bottle", "can", "keg"];

export default function CatalogPage() {
  return (
    <SiteMotion className="catalog">
      <section aria-labelledby="catalog-title" className="ct-hero cx-tone-ink">
        <div className="cx-wrap">
          <Kicker
            aside={`${catalogCount} ${plural(catalogCount, POSITIONS)}`}
            index="01"
          >
            {catalogContent.eyebrow}
          </Kicker>
          <h1 className="cx-mega ct-hero__title" data-lines id="catalog-title">
            <Lines lines={["Выбери", "свой вкус"]} />
          </h1>
          <div className="ct-hero__foot" data-fade>
            <p className="cx-lead">{catalogContent.body}</p>
            <div className="cx-actions">
              <Link className="cx-btn cx-btn--light" href="#brands">
                {catalogContent.primaryCta.label}
                <span aria-hidden="true">↓</span>
              </Link>
              <Link
                className="cx-btn cx-btn--ghost"
                href={catalogContent.secondaryCta.href}
              >
                {catalogContent.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="cx-shelf">
          <div className="cx-shelf__row">
            {[0, 1].map((group) => (
              <div
                aria-hidden={group === 1}
                className="cx-shelf__group"
                key={group}
              >
                {shelfRow.map((item, index) => (
                  <Bottle
                    asset={{ ...item.asset, alt: "" }}
                    index={index}
                    key={item.id}
                    priority={group === 0 && index < 8}
                    sizes="(max-width: 768px) 30vw, 12vw"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CatalogExplorer families={explorerFamilies} />

      <section
        aria-labelledby="formats-title"
        className="cx-section cx-tone-white"
      >
        <div className="cx-wrap">
          <Kicker index="02">Форматы</Kicker>
          <div className="cx-split">
            <h2 className="cx-h2" data-lines id="formats-title">
              <Lines lines={["Бутылки,", "банки и кеги"]} />
            </h2>
            <div className="cx-stack">
              <div className="cx-formats" data-stagger>
                {allFormats.map((format, index) => {
                  const families = productFamilies.filter((family) =>
                    family.formats.includes(format),
                  );
                  return (
                    <div className="cx-format" key={format}>
                      <p className="cx-label cx-muted">{pad(index + 1)}</p>
                      <h3 className="cx-h3">{formatLabels[format]}</h3>
                      {families.length ? (
                        <ul>
                          {families.map((family) => (
                            <li key={family.slug}>{family.navLabel}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="cx-note">
                          Линейки в этом формате появятся в каталоге позже.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="cx-note">
                Формат отмечен только для направлений, где он подтверждён.
                Отметка не означает, что каждый вкус выпускается в каждом
                формате.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Closing actions={catalogContent.cta.actions} />
      <BackToTop />
    </SiteMotion>
  );
}

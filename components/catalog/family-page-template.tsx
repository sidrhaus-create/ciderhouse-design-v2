import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackToTop } from "@/components/catalog/back-to-top";
import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad, Words } from "@/components/site/text";
import { Bottle } from "@/components/ui/bottle";
import { productFamilies } from "@/data/catalog-content";
import { explorerFamilies, familyLeads } from "@/data/showcase";
import { photography, type Photo } from "@/data/site-content";
import { plural, POSITIONS } from "@/lib/plural";
import { formatLabels, type ProductFamily } from "@/types/catalog";

/** Full-bleed photograph used on a family page, where one exists. */
const familyPhoto: Partial<
  Record<string, { photo: Photo; focus: string; caption: string }>
> = {
  "double-tree": {
    photo: photography.appleCider,
    focus: "50% 64%",
    caption: "Зелёное яблоко",
  },
  "white-phoenix": {
    photo: photography.cherryCocktail,
    focus: "50% 42%",
    caption: "Тёмная вишня",
  },
};

export function FamilyPageTemplate({ family }: { family: ProductFamily }) {
  const index = productFamilies.findIndex((item) => item.slug === family.slug);
  const next = productFamilies[(index + 1) % productFamilies.length];
  const explorer = explorerFamilies.find((item) => item.slug === family.slug);
  const tone = explorer?.tone ?? "ink";
  const leads = familyLeads[family.slug] ?? [];
  const photo = familyPhoto[family.slug];
  const composite = leads.length ? undefined : family.heroAssets[0];
  const count = family.products.length;
  const titleLines =
    family.title.length > 9 ? family.title.split(" ") : [family.title];

  return (
    <SiteMotion className={`brand brand--${family.slug}`}>
      {/* Poster hero ---------------------------------------------------- */}
      <section
        aria-labelledby="brand-title"
        className="hs hs--static"
        data-initial=""
        data-tone={tone}
      >
        <div className="hs__stage">
          <div className={`hs-slide cx-tone-${tone}`} data-state="active">
            {leads.length ? (
              <div className="hs-media hs-media--cluster hs-media--trio">
                <span aria-hidden="true" className="hs-disc" />
                <div
                  aria-label={`Бутылки ${family.title}`}
                  className="hs-cluster"
                  role="group"
                >
                  {leads.map((item, leadIndex) => (
                    <Bottle
                      asset={item.asset}
                      className="hs-cluster__bottle"
                      index={leadIndex}
                      key={item.id}
                      priority
                      sizes="(max-width: 1023px) 40vw, 22vw"
                    />
                  ))}
                </div>
              </div>
            ) : composite ? (
              <div className="hs-media hs-media--composite">
                <Image
                  alt={composite.alt}
                  height={composite.height}
                  priority
                  sizes="(max-width: 1023px) 90vw, 46vw"
                  src={composite.src}
                  width={composite.width}
                />
              </div>
            ) : (
              <div aria-hidden="true" className="hs-media hs-media--cluster">
                <span className="hs-disc" />
              </div>
            )}
            <div className="cx-wrap hs-copy">
              <p className="hs-kicker">
                <span>{pad(index + 1)}</span>
                <span>{family.categoryLabel}</span>
              </p>
              <div className="hs-copy__main">
                <h1
                  className="hs-title"
                  data-size={family.title.length > 11 ? undefined : "xl"}
                  id="brand-title"
                >
                  {titleLines.map((line, lineIndex) => (
                    <span
                      className="hs-line"
                      key={line}
                      style={{ "--i": lineIndex } as CSSProperties}
                    >
                      <span>{line}</span>
                    </span>
                  ))}
                </h1>
                <p className="hs-body">{family.description}</p>
                <div className="cx-actions hs-actions">
                  {count ? (
                    <Link className="cx-btn cx-btn--solid" href="#brands">
                      {count} {plural(count, POSITIONS)}
                      <span aria-hidden="true">↓</span>
                    </Link>
                  ) : null}
                  <Link className="cx-btn cx-btn--ghost" href="/where-to-buy">
                    Где купить
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story ---------------------------------------------------------- */}
      <section
        aria-labelledby="brand-story-title"
        className="cx-section cx-tone-white"
      >
        <div className="cx-wrap">
          <Kicker index="01">О линейке</Kicker>
          <h2 className="visually-hidden" id="brand-story-title">
            О линейке {family.title}
          </h2>
          <div className="cx-split">
            <div className="cx-stack">
              <p className="brand-story__lead" data-words>
                <Words text={family.story[0]} />
              </p>
              {family.story.slice(1).map((paragraph) => (
                <p className="cx-lead cx-muted" data-fade key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="cx-stack">
              {family.characterNotes.length ? (
                <ul className="cx-rows" data-stagger>
                  {family.characterNotes.map((note, noteIndex) => (
                    <li key={note}>
                      <div className="cx-row brand-story__note">
                        <span className="cx-row__index">
                          {pad(noteIndex + 1)}
                        </span>
                        <span>{note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
              {family.formats.length ? (
                <p className="cx-label cx-muted" data-fade>
                  Форматы:{" "}
                  {family.formats
                    .map((format) => formatLabels[format].toLowerCase())
                    .join(" · ")}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Photograph ---------------------------------------------------- */}
      {photo ? (
        <section
          aria-label={photo.photo.alt}
          className="cx-photo"
          style={{ "--focus": photo.focus } as CSSProperties}
        >
          <div className="cx-photo__frame" data-parallax>
            <Image
              alt={photo.photo.alt}
              height={photo.photo.height}
              sizes="100vw"
              src={photo.photo.src}
              width={photo.photo.width}
            />
          </div>
          <div className="cx-wrap cx-photo__content">
            <div className="cx-photo__top cx-label">
              <span>{family.title}</span>
              <span>{photo.caption}</span>
            </div>
            <div className="cx-photo__bottom">
              <p className="cx-mega" data-lines>
                <Lines lines={[family.categoryLabel]} />
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Range ---------------------------------------------------------- */}
      {explorer && (count > 0 || explorer.composite) ? (
        <CatalogExplorer families={[explorer]} single />
      ) : null}

      {/* Next family --------------------------------------------------- */}
      <section className="cx-tone-ink">
        <div className="cx-wrap">
          <Link className="cx-next" href={`/brands/${next.slug}`}>
            <span className="cx-label cx-muted">Следующее направление</span>
            <span className="cx-next__name">
              {next.title} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      <Closing />
      <BackToTop />
    </SiteMotion>
  );
}

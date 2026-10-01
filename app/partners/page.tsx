import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackToTop } from "@/components/catalog/back-to-top";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad } from "@/components/site/text";
import { productFamilies } from "@/data/catalog-content";
import { homepageContent } from "@/data/homepage-content";
import { partnersContent, photography } from "@/data/site-content";
import { formatLabels, type ProductFormat } from "@/types/catalog";

export const metadata: Metadata = {
  title: partnersContent.seo.title,
  description: partnersContent.seo.description,
  alternates: { canonical: "/partners" },
};

const { contacts } = homepageContent;
const formats: ProductFormat[] = ["bottle", "can", "keg"];

export default function PartnersPage() {
  return (
    <SiteMotion className="partners">
      <section
        aria-labelledby="partners-title"
        className="cx-pagehero cx-tone-paper"
      >
        <div className="cx-wrap">
          <p className="cx-pagehero__meta cx-label">
            <span>{partnersContent.eyebrow}</span>
            <span>B2B</span>
          </p>
          <h1 className="cx-mega pt-title" data-lines id="partners-title">
            <Lines lines={["Работаем", "с теми, кто", "выбирает вкус"]} />
          </h1>
          <div className="cx-pagehero__foot" data-fade>
            <p className="cx-lead">{partnersContent.body}</p>
            <div className="cx-actions">
              <a className="cx-btn cx-btn--brand" href={contacts.emailHref}>
                {contacts.email} <span aria-hidden="true">→</span>
              </a>
              <a className="cx-btn cx-btn--ghost" href={contacts.phoneHref}>
                {contacts.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="audiences-title"
        className="cx-section cx-tone-ink"
      >
        <div className="cx-wrap">
          <Kicker index="01">Партнёрство</Kicker>
          <div className="cx-split">
            <h2
              className="cx-h2 cx-split__sticky"
              data-lines
              id="audiences-title"
            >
              <Lines lines={["С кем", "мы работаем"]} />
            </h2>
            <ul className="cx-rows" data-stagger>
              {partnersContent.audiences.map((audience, index) => (
                <li key={audience}>
                  <div className="cx-row">
                    <span className="cx-row__index">{pad(index + 1)}</span>
                    <span className="cx-row__title">{audience}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-label={photography.appleCider.alt}
        className="cx-photo"
        style={{ "--focus": "50% 66%" } as CSSProperties}
      >
        <div className="cx-photo__frame" data-parallax>
          <Image
            alt={photography.appleCider.alt}
            height={photography.appleCider.height}
            sizes="100vw"
            src={photography.appleCider.src}
            width={photography.appleCider.width}
          />
        </div>
        <div className="cx-wrap cx-photo__content">
          <div className="cx-photo__top cx-label">
            <span>Double Tree</span>
            <span>Бутылки и банки</span>
          </div>
          <div className="cx-photo__bottom">
            <p className="cx-mega" data-lines>
              <Lines lines={["Форматы"]} />
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="range-title"
        className="cx-section cx-tone-white"
      >
        <div className="cx-wrap">
          <Kicker index="02">Ассортимент</Kicker>
          <div className="cx-split">
            <div className="cx-stack cx-split__sticky">
              <h2 className="cx-h2" data-lines id="range-title">
                <Lines lines={["Бутылки,", "банки и кеги"]} />
              </h2>
              <Link className="cx-btn cx-btn--dark" data-fade href="/catalog">
                Весь ассортимент <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="cx-stack">
              <div className="cx-formats pt-formats" data-stagger>
                {formats.map((format, index) => {
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
                        <p className="cx-note">Уточняйте при обращении.</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="cx-note">
                Формат отмечен только для направлений, где он подтверждён.
                Доступность конкретных вкусов и форматов уточняйте при
                обращении.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="partner-contact-title"
        className="cx-section cx-tone-brand"
      >
        <div className="cx-wrap">
          <Kicker index="03">Связаться</Kicker>
          <h2 className="visually-hidden" id="partner-contact-title">
            Контакты для партнёров
          </h2>
          <ul className="cx-rows" data-stagger>
            <li>
              <a className="cx-row" href={contacts.emailHref}>
                <span className="cx-row__index">01</span>
                <span className="cx-row__title">{contacts.email}</span>
                <span aria-hidden="true" className="cx-row__aside">
                  →
                </span>
              </a>
            </li>
            <li>
              <a className="cx-row" href={contacts.phoneHref}>
                <span className="cx-row__index">02</span>
                <span className="cx-row__title">{contacts.phone}</span>
                <span aria-hidden="true" className="cx-row__aside">
                  →
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Closing />
      <BackToTop />
    </SiteMotion>
  );
}

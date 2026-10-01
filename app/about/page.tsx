import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackToTop } from "@/components/catalog/back-to-top";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad, Words } from "@/components/site/text";
import { productFamilies } from "@/data/catalog-content";
import { homepageContent } from "@/data/homepage-content";
import { aboutContent, photography } from "@/data/site-content";

export const metadata: Metadata = {
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  alternates: { canonical: "/about" },
};

const statistics = homepageContent.statistics.filter((item) => item.visible);

export default function AboutPage() {
  return (
    <SiteMotion className="about">
      <section
        aria-labelledby="about-title"
        className="cx-pagehero cx-tone-paper"
      >
        <div className="cx-wrap">
          <p className="cx-pagehero__meta cx-label">
            <span>{aboutContent.eyebrow}</span>
            <span>С 2017 года</span>
          </p>
          <h1 className="cx-mega ab-title" data-lines id="about-title">
            <Lines lines={aboutContent.title} />
          </h1>
          <div className="cx-pagehero__foot" data-fade>
            <p className="cx-lead">{aboutContent.lead}</p>
            <div className="cx-actions">
              <Link className="cx-btn cx-btn--dark" href="/catalog">
                Смотреть ассортимент <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label={photography.mangoBowl.alt}
        className="cx-photo"
        style={{ "--focus": "50% 58%" } as CSSProperties}
      >
        <div className="cx-photo__frame" data-parallax>
          <Image
            alt={photography.mangoBowl.alt}
            height={photography.mangoBowl.height}
            priority
            sizes="100vw"
            src={photography.mangoBowl.src}
            width={photography.mangoBowl.width}
          />
        </div>
        <div className="cx-wrap cx-photo__content">
          <div className="cx-photo__top cx-label">
            <span>White Phoenix</span>
            <span>Манго-цитрус</span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="idea-title"
        className="cx-section cx-tone-white"
      >
        <div className="cx-wrap">
          <Kicker index="01">Идея</Kicker>
          <h2 className="visually-hidden" id="idea-title">
            Идея Cider House
          </h2>
          <p className="ab-statement" data-words>
            <Words text={aboutContent.body} />
          </p>
          <dl className="cx-stats ab-stats" data-stagger>
            {statistics.map((statistic) => (
              <div className="cx-stat" key={statistic.label}>
                <dt>{statistic.label}</dt>
                <dd>{statistic.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="families-title"
        className="cx-section cx-tone-ink"
      >
        <div className="cx-wrap">
          <Kicker index="02">Направления</Kicker>
          <div className="cx-split">
            <h2
              className="cx-h2 cx-split__sticky"
              data-lines
              id="families-title"
            >
              <Lines lines={["Свой характер.", "Одна культура", "вкуса."]} />
            </h2>
            <ul className="cx-rows" data-stagger>
              {productFamilies.map((family, index) => (
                <li key={family.slug}>
                  <Link className="cx-row" href={`/brands/${family.slug}`}>
                    <span className="cx-row__index">{pad(index + 1)}</span>
                    <span className="cx-row__title">{family.title}</span>
                    <span aria-hidden="true" className="cx-row__aside">
                      →
                    </span>
                    <span className="cx-row__sub">{family.categoryLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-production-title"
        className="cx-photo ab-production"
      >
        <div className="cx-photo__frame" data-parallax>
          <Image
            alt={photography.factory.alt}
            height={photography.factory.height}
            sizes="100vw"
            src={photography.factory.src}
            width={photography.factory.width}
          />
        </div>
        <div className="cx-wrap cx-photo__content">
          <div className="cx-photo__top cx-label">
            <span>{homepageContent.production.eyebrow}</span>
            <span>Производство</span>
          </div>
          <div className="cx-photo__bottom">
            <h2 className="cx-display" data-lines id="about-production-title">
              <Lines lines={homepageContent.production.title} />
            </h2>
            <Link className="cx-btn cx-btn--light" data-fade href="/production">
              О производстве <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Closing />
      <BackToTop />
    </SiteMotion>
  );
}

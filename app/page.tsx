import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import "./home.css";
import { BackToTop } from "@/components/catalog/back-to-top";
import { HeroSlider, type HeroSlide } from "@/components/home/hero-slider";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Slider } from "@/components/site/slider";
import { Accordion } from "@/components/ui/accordion";
import { Bottle } from "@/components/ui/bottle";
import { catalogContent } from "@/data/catalog-content";
import { homepageContent } from "@/data/homepage-content";
import {
  catalogCount,
  familyCount,
  familyLeads,
  flavorNames,
  heroCluster,
  runway,
} from "@/data/showcase";
import { photography, type Photo } from "@/data/site-content";
import { plural, POSITIONS } from "@/lib/plural";
import { siteConfig } from "@/lib/site";
import type { FamilySlug } from "@/types/catalog";

export const metadata: Metadata = {
  title: { absolute: "Cider House — сидр и медовуха с яркими вкусами" },
  description:
    "Cider House — сидры и медовухи естественного брожения, яркие вкусы, собственное производство и магазины по всей России.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    title: "Cider House — сидр и медовуха с яркими вкусами",
    description:
      "Сидры и медовухи естественного брожения, яркие вкусы и собственное производство в России.",
    images: [
      {
        url: photography.mangoBowl.src,
        width: photography.mangoBowl.width,
        height: photography.mangoBowl.height,
        alt: photography.mangoBowl.alt,
      },
    ],
  },
};

const content = homepageContent;
const pad = (value: number) => String(value).padStart(2, "0");
const worlds = content.productWorlds;
const world = (id: string) => worlds.find((item) => item.id === id)!;

function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line) => (
    <span className="cx-line" key={line}>
      <span>{line}</span>
    </span>
  ));
}

/** Words wrapped individually so the motion controller can light them up. */
function Words({ text }: { text: string }) {
  return text
    .split(" ")
    .map((word, index) => <span key={`${word}-${index}`}>{word} </span>);
}

/* ---- Hero slides ---------------------------------------------------------- */

type SlideCopy = {
  index: number;
  label: string;
  title: readonly string[];
  size?: "xl" | "m";
  body: string;
  actions: { label: string; href: string }[];
  isFirst?: boolean;
};

function SlideCopyBlock({
  index,
  label,
  title,
  size,
  body,
  actions,
  isFirst,
}: SlideCopy) {
  const Heading = isFirst ? "h1" : "h2";
  return (
    <div className="cx-wrap hs-copy">
      <p className="hs-kicker">
        <span>{pad(index)}</span>
        <span>{label}</span>
      </p>
      <div className="hs-copy__main">
        <Heading className="hs-title" data-size={size}>
          {title.map((line, lineIndex) => (
            <span
              className="hs-line"
              key={line}
              style={{ "--i": lineIndex } as CSSProperties}
            >
              <span>{line}</span>
            </span>
          ))}
        </Heading>
        <p className="hs-body">{body}</p>
        <div className="cx-actions hs-actions">
          {actions.map((action, actionIndex) => (
            <Link
              className={`cx-btn ${actionIndex === 0 ? "cx-btn--solid" : "cx-btn--ghost"}`}
              href={action.href}
              key={action.href}
            >
              {action.label}
              {actionIndex === 0 ? <span aria-hidden="true">→</span> : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotoMedia({ photo, focus }: { photo: Photo; focus: string }) {
  return (
    <div
      className="hs-media hs-media--photo"
      style={{ "--focus": focus } as CSSProperties}
    >
      <Image
        alt={photo.alt}
        height={photo.height}
        sizes="(max-width: 1023px) 100vw, 50vw"
        src={photo.src}
        width={photo.width}
      />
    </div>
  );
}

function slide(
  id: string,
  tone: HeroSlide["tone"],
  copy: SlideCopy,
  media: ReactNode,
): HeroSlide {
  return {
    id,
    label: copy.label,
    tone,
    content: (
      <>
        {media}
        <SlideCopyBlock {...copy} />
      </>
    ),
  };
}

const heroSlides: HeroSlide[] = [
  slide(
    "master",
    "ink",
    {
      index: 1,
      label: "Cider House",
      title: ["Мы создаём", "настоящий", "сидр"],
      body: content.hero.body,
      actions: [content.hero.primaryCta, content.hero.secondaryCta],
      isFirst: true,
    },
    <div className="hs-media hs-media--cluster">
      <span aria-hidden="true" className="hs-disc" />
      <div
        aria-label="Бутылки Double Tree и White Phoenix"
        className="hs-cluster"
        role="group"
      >
        {heroCluster.map((item, index) => (
          <Bottle
            asset={item.asset}
            className="hs-cluster__bottle"
            index={index}
            key={item.id}
            priority
            sizes="(max-width: 1023px) 40vw, 22vw"
          />
        ))}
      </div>
    </div>,
  ),
  slide(
    "double-tree",
    "paper",
    {
      index: 2,
      label: world("double-tree").title,
      title: ["Double", "Tree"],
      size: "xl",
      body: world("double-tree").description,
      actions: [
        { label: "Открыть Double Tree", href: world("double-tree").href },
      ],
    },
    <PhotoMedia focus="50% 62%" photo={photography.appleCider} />,
  ),
  slide(
    "white-phoenix",
    "ink",
    {
      index: 3,
      label: world("white-phoenix").title,
      title: ["White", "Phoenix"],
      size: "xl",
      body: world("white-phoenix").description,
      actions: [
        { label: "Открыть White Phoenix", href: world("white-phoenix").href },
      ],
    },
    <PhotoMedia focus="50% 45%" photo={photography.cherryCocktail} />,
  ),
  slide(
    "mister-bee",
    "brand",
    {
      index: 4,
      label: world("mister-bee").title,
      title: ["Mister", "Bee"],
      size: "xl",
      body: world("mister-bee").description,
      actions: [
        { label: "Открыть Mister Bee", href: world("mister-bee").href },
      ],
    },
    <div className="hs-media hs-media--cluster hs-media--trio">
      <span aria-hidden="true" className="hs-disc" />
      <div aria-label="Бутылки Mister Bee" className="hs-cluster" role="group">
        {(familyLeads["mister-bee"] ?? []).map((item, index) => (
          <Bottle
            asset={item.asset}
            className="hs-cluster__bottle"
            index={index}
            key={item.id}
            sizes="(max-width: 1023px) 40vw, 22vw"
          />
        ))}
      </div>
    </div>,
  ),
  slide(
    "zero",
    "ink",
    {
      index: 5,
      label: "0%",
      title: content.zeroFeature.title,
      size: "m",
      body: content.zeroFeature.body,
      actions: [content.zeroFeature.cta],
    },
    <div className="hs-media hs-media--composite">
      <Image
        alt={photography.zero.alt}
        height={photography.zero.height}
        sizes="(max-width: 1023px) 90vw, 46vw"
        src={photography.zero.src}
        width={photography.zero.width}
      />
    </div>,
  ),
];

/* ---- Family panels -------------------------------------------------------- */

const worldTone: Record<string, string> = {
  "double-tree": "paper",
  "white-phoenix": "ink",
  "mister-bee": "brand",
  zero: "ink",
};

const faqItems = content.faq.map((item, index) => ({
  id: `homepage-faq-${index + 1}`,
  title: item.question,
  content: <p className="cx-faq__answer">{item.answer}</p>,
}));

export default function Homepage() {
  const statistics = content.statistics.filter((item) => item.visible);
  const tickerA = flavorNames.filter((_, index) => index % 2 === 0);
  const tickerB = flavorNames.filter((_, index) => index % 2 === 1);

  return (
    <SiteMotion className="home">
      <HeroSlider slides={heroSlides} />

      {/* Flavour ticker ------------------------------------------------- */}
      <section aria-labelledby="ticker-title" className="hm-ticker">
        <h2 className="visually-hidden" id="ticker-title">
          Вкусы в каталоге: {flavorNames.join(", ")}
        </h2>
        <div aria-hidden="true" className="cx-marquee">
          {[tickerA, tickerB].map((row, rowIndex) => (
            <div
              className={`cx-marquee__row${rowIndex === 1 ? " cx-marquee__row--outline" : ""}`}
              key={rowIndex}
            >
              {[0, 1].map((group) => (
                <div className="cx-marquee__group" key={group}>
                  {row.map((name) => (
                    <span className="cx-marquee__item" key={name}>
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto ------------------------------------------------------ */}
      <section
        aria-labelledby="manifesto-title"
        className="cx-section cx-tone-paper hm-manifesto"
        id="about"
      >
        <div className="cx-wrap">
          <p className="cx-kicker" data-fade>
            <span>01</span>
            <span>{content.story.eyebrow}</span>
          </p>
          <h2 className="cx-display" data-lines id="manifesto-title">
            <Lines lines={content.story.title} />
          </h2>
          <div className="hm-manifesto__body">
            <p className="hm-manifesto__text" data-words>
              <Words text={content.story.body} />
            </p>
            <Link className="cx-link" data-fade href="/about">
              О компании <span aria-hidden="true">→</span>
            </Link>
          </div>
          <dl className="cx-stats hm-manifesto__stats" data-stagger>
            {statistics.map((statistic) => (
              <div className="cx-stat" key={statistic.label}>
                <dt>{statistic.label}</dt>
                <dd>{statistic.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Campaign photograph ------------------------------------------- */}
      <section
        aria-labelledby="campaign-title"
        className="cx-photo hm-campaign"
        style={{ "--focus": "50% 58%" } as CSSProperties}
      >
        <div className="cx-photo__frame" data-parallax>
          <Image
            alt={photography.mangoBowl.alt}
            height={photography.mangoBowl.height}
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
          <div className="cx-photo__bottom">
            <h2 className="cx-mega" data-lines id="campaign-title">
              <Lines lines={["Яркие", "вкусы"]} />
            </h2>
            <Link
              className="cx-btn cx-btn--light"
              data-fade
              href="/brands/white-phoenix"
            >
              Смотреть White Phoenix <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Runway: the range moves sideways ------------------------------ */}
      <section
        aria-labelledby="runway-title"
        className="cx-tone-ink hm-runway"
        data-runway
        id="product-worlds"
      >
        <div className="cx-wrap hm-runway__head">
          <div>
            <p className="cx-kicker">
              <span>02</span>
              <span>{catalogContent.eyebrow}</span>
              <span>
                {catalogCount} {plural(catalogCount, POSITIONS)} в каталоге
              </span>
            </p>
            <h2 className="cx-h2" id="runway-title">
              {catalogContent.title}
            </h2>
          </div>
          <Link className="cx-btn cx-btn--light" href="/catalog">
            Весь ассортимент <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="hm-runway__viewport">
          <ol className="hm-runway__track" data-runway-track>
            {runway.map((item, index) => (
              <li key={item.id}>
                <Link
                  className="hm-runway__item"
                  href={`/brands/${item.familySlug}`}
                >
                  <span className="hm-runway__num">{pad(index + 1)}</span>
                  <Bottle
                    asset={item.asset}
                    className={
                      item.volume === "0,75 л" ? "is-large-format" : ""
                    }
                    index={index}
                    sizes="(max-width: 1023px) 46vw, 20vw"
                  />
                  <span className="hm-runway__name">{item.flavor}</span>
                  <span className="hm-runway__family">
                    {item.family}
                    {item.volume ? ` · ${item.volume}` : ""}
                  </span>
                </Link>
              </li>
            ))}
            <li className="hm-runway__end">
              <Link href="/catalog">
                <span>Весь</span>
                <span>ассортимент</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Family panels -------------------------------------------------- */}
      <section aria-labelledby="worlds-title" className="hm-worlds">
        <h2 className="visually-hidden" id="worlds-title">
          Направления Cider House
        </h2>
        {worlds.map((item) => {
          const slug = item.id as FamilySlug;
          const lead = familyLeads[slug]?.[1];
          const count = familyCount(slug);
          return (
            <article
              className={`hm-world cx-tone-${worldTone[item.id]}`}
              key={item.id}
            >
              <p className="hm-world__meta cx-label">
                <span>{item.index}</span>
                <span>{item.label}</span>
              </p>
              <h3 className="hm-world__name">
                {item.id === "zero" ? "0%" : item.title}
              </h3>
              <div className="hm-world__media">
                {lead ? (
                  <Bottle
                    asset={lead.asset}
                    sizes="(max-width: 1023px) 50vw, 26vw"
                  />
                ) : (
                  <Image
                    alt={photography.zero.alt}
                    className="hm-world__composite"
                    height={photography.zero.height}
                    sizes="(max-width: 1023px) 80vw, 36vw"
                    src={photography.zero.src}
                    width={photography.zero.width}
                  />
                )}
              </div>
              <div className="hm-world__copy">
                <p>{item.description}</p>
                <Link className="cx-link hm-world__link" href={item.href}>
                  {item.id === "zero"
                    ? content.zeroFeature.cta.label
                    : `${count} ${plural(count, POSITIONS)}`}{" "}
                  <span aria-hidden="true">→</span>
                  <span className="visually-hidden"> — {item.title}</span>
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* Production ----------------------------------------------------- */}
      <section
        aria-labelledby="production-title"
        className="cx-photo hm-production"
        id="production-story"
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
        <div className="cx-wrap hm-production__inner">
          <p className="cx-kicker" data-fade>
            <span>03</span>
            <span>{content.production.eyebrow}</span>
          </p>
          <Slider
            header={
              <div className="hm-production__head">
                <h2 className="cx-display" data-lines id="production-title">
                  <Lines lines={content.production.title} />
                </h2>
                <p className="cx-lead" data-fade>
                  {content.production.intro}
                </p>
              </div>
            }
            label="Восемь этапов производства"
          >
            {content.production.stages.map((stage) => (
              <article className="hm-stage" key={stage.index}>
                <span aria-hidden="true" className="hm-stage__num">
                  {stage.index}
                </span>
                <h3 className="cx-h3">{stage.title}</h3>
                <p>{stage.body}</p>
              </article>
            ))}
          </Slider>
          <Link className="cx-btn cx-btn--light" data-fade href="/production">
            Подробнее о производстве <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Where to buy --------------------------------------------------- */}
      <section
        aria-labelledby="where-title"
        className="cx-section cx-tone-brand hm-where"
        id="where-to-buy"
      >
        <div aria-hidden="true" className="cx-marquee hm-where__cities">
          {[0, 1].map((rowIndex) => (
            <div
              className={`cx-marquee__row${rowIndex === 1 ? " cx-marquee__row--outline" : ""}`}
              key={rowIndex}
            >
              {[0, 1].map((group) => (
                <div className="cx-marquee__group" key={group}>
                  {(rowIndex === 0
                    ? content.whereToBuy.cities
                    : [...content.whereToBuy.cities].reverse()
                  ).map((city) => (
                    <span className="cx-marquee__item" key={city}>
                      {city}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="cx-wrap hm-where__body">
          <p className="cx-kicker" data-fade>
            <span>04</span>
            <span>{content.whereToBuy.eyebrow}</span>
          </p>
          <div className="cx-split cx-split--even">
            <h2 className="cx-h2" data-lines id="where-title">
              <Lines lines={content.whereToBuy.title} />
            </h2>
            <div className="cx-stack" data-fade>
              <p className="cx-lead">{content.whereToBuy.body}</p>
              <p className="visually-hidden">
                Города: {content.whereToBuy.cities.join(", ")}.
              </p>
              <Link
                className="cx-btn cx-btn--light"
                href={content.whereToBuy.cta.href}
              >
                {content.whereToBuy.cta.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners ------------------------------------------------------- */}
      <section
        aria-labelledby="partners-title"
        className="cx-section cx-tone-paper"
        id="partners"
      >
        <div className="cx-wrap">
          <p className="cx-kicker" data-fade>
            <span>05</span>
            <span>{content.partnership.eyebrow}</span>
          </p>
          <div className="cx-split">
            <div className="cx-stack cx-split__sticky">
              <h2 className="cx-h2" data-lines id="partners-title">
                <Lines lines={content.partnership.title} />
              </h2>
              <p className="cx-lead" data-fade>
                {content.partnership.body}
              </p>
              <Link
                className="cx-btn cx-btn--brand"
                data-fade
                href={content.partnership.cta.href}
              >
                {content.partnership.cta.label}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="cx-rows" data-stagger>
              {content.partnership.audiences.map((audience, index) => (
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

      {/* News / channels ----------------------------------------------- */}
      <section
        aria-labelledby="news-title"
        className="cx-section cx-tone-ink"
        id="news"
      >
        <div className="cx-wrap">
          <p className="cx-kicker" data-fade>
            <span>06</span>
            <span>{content.social.eyebrow}</span>
          </p>
          <div className="cx-split">
            <div className="cx-stack">
              <h2 className="cx-h2" data-lines id="news-title">
                <Lines lines={content.social.title} />
              </h2>
              <p className="cx-lead cx-muted" data-fade>
                {content.social.emptyEditorial}
              </p>
            </div>
            <ul className="cx-rows" data-stagger>
              {content.social.links.map((item, index) => (
                <li key={item.href}>
                  <a
                    className="cx-row"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="cx-row__index">{pad(index + 1)}</span>
                    <span className="cx-row__title">{item.label}</span>
                    <span aria-hidden="true" className="cx-row__aside">
                      ↗
                    </span>
                    <span className="visually-hidden">
                      (откроется в новой вкладке)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {content.social.links.map((item) =>
            "note" in item ? (
              <p className="cx-note hm-news__note" key={item.href}>
                {item.note}
              </p>
            ) : null,
          )}
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------ */}
      <section
        aria-labelledby="faq-title"
        className="cx-section cx-tone-white cx-faq"
        id="faq"
      >
        <div className="cx-wrap cx-split">
          <div className="cx-split__sticky">
            <p className="cx-kicker" data-fade>
              <span>07</span>
              <span>Коротко о главном</span>
            </p>
            <h2 className="cx-h2" data-lines id="faq-title">
              <Lines lines={["Вопросы", "и ответы"]} />
            </h2>
          </div>
          <div data-fade>
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <Closing />
      <BackToTop />
    </SiteMotion>
  );
}

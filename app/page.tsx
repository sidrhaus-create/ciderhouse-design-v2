import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/home/home-motion";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { homepageContent } from "@/data/homepage-content";
import { siteConfig } from "@/lib/site";

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
        url: "/assets/products/mister-bee/mister-bee-foundation-01-front.png",
        width: 182,
        height: 870,
        alt: "Классическая медовуха Mister Bee от Cider House",
      },
    ],
  },
};

const faqItems = homepageContent.faq.map((item, index) => ({
  id: `homepage-faq-${index + 1}`,
  title: item.question,
  content: <p className="home-faq__answer">{item.answer}</p>,
}));

export default function Homepage() {
  const visibleStatistics = homepageContent.statistics.filter(
    (item) => item.visible,
  );

  return (
    <HomeMotion>
      <section
        aria-labelledby="home-hero-title"
        className="home-hero"
        data-home-hero
        id="top"
      >
        <div aria-hidden="true" className="home-hero__texture" />
        <Image
          alt=""
          aria-hidden="true"
          className="home-hero__colibri"
          data-home-hero-symbol
          height={1000}
          priority
          src="/assets/brand/symbols/cider-house-colibri-white.svg"
          width={609}
        />
        <div className="container container--wide home-hero__layout">
          <div className="home-hero__copy" data-home-hero-copy>
            <p className="home-kicker home-kicker--light">
              {homepageContent.hero.eyebrow}
            </p>
            <h1 className="home-display" id="home-hero-title">
              {homepageContent.hero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="home-hero__body">{homepageContent.hero.body}</p>
            <div className="home-actions">
              <ButtonLink
                className="home-button home-button--light"
                href={homepageContent.hero.primaryCta.href}
                variant="inverse"
              >
                {homepageContent.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                className="home-button home-button--outline-light"
                href={homepageContent.hero.secondaryCta.href}
                variant="secondary"
              >
                {homepageContent.hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="home-hero__products" aria-label="Линейка Mister Bee">
            {homepageContent.hero.assets.map((asset) => (
              <div
                className={`home-hero__bottle home-hero__bottle--${asset.position}`}
                data-home-hero-bottle
                key={asset.src}
              >
                <Image
                  alt={asset.alt}
                  fetchPriority={asset.position === "center" ? "high" : "auto"}
                  height={870}
                  priority={asset.position === "center"}
                  sizes="(max-width: 768px) 38vw, (max-width: 1200px) 25vw, 18vw"
                  src={asset.src}
                  width={182}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="home-hero__footer">
          <span>Натуральное брожение</span>
          <span aria-hidden="true">↓</span>
          <span>Россия · 18+</span>
        </div>
      </section>

      <section
        aria-labelledby="product-worlds-title"
        className="home-worlds"
        id="product-worlds"
      >
        <div
          className="container container--wide home-section-heading"
          data-home-reveal
        >
          <p className="home-kicker">Четыре направления</p>
          <h2 className="home-section-title" id="product-worlds-title">
            Свой характер.
            <br />
            Одна культура вкуса.
          </h2>
          <p className="home-section-intro">
            От европейской классики до современного прочтения медовухи и
            безалкогольной коллекции.
          </p>
        </div>

        {homepageContent.productWorlds.map((world) => (
          <article
            className={`home-world home-world--${world.id}`}
            data-home-reveal
            data-home-world
            id={`world-${world.id}`}
            key={world.id}
          >
            <div className="container container--wide home-world__layout">
              <div className="home-world__meta" data-home-world-meta>
                <span>{world.index}</span>
                <span>{world.label}</span>
              </div>
              <div className="home-world__identity" data-home-world-visual>
                {"logo" in world ? (
                  <Image
                    alt={`Логотип ${world.title}`}
                    className="home-world__logo"
                    data-home-world-logo
                    height={world.id === "double-tree" ? 126 : 600}
                    sizes="(max-width: 768px) 70vw, 34vw"
                    src={world.logo}
                    width={world.id === "double-tree" ? 190 : 1136}
                  />
                ) : null}
                <h3 className="home-world__title" data-home-world-title>
                  {world.title}
                </h3>
                {"images" in world ? (
                  <div className="home-world__products">
                    {world.images.map((src) => (
                      <Image
                        alt="Одобренная бутылка Mister Bee; упаковка показана без изменений"
                        data-home-product-lock
                        height={870}
                        key={src}
                        sizes="(max-width: 768px) 28vw, 12vw"
                        src={src}
                        width={182}
                      />
                    ))}
                  </div>
                ) : null}
                {world.id === "double-tree" ? (
                  <div aria-hidden="true" className="home-world__brand-poster">
                    <Image
                      alt=""
                      height={1000}
                      src="/assets/brand/symbols/cider-house-colibri-black.svg"
                      width={585}
                    />
                    <span>Европейская классика сидра</span>
                  </div>
                ) : null}
                {world.id === "white-phoenix" ? (
                  <div aria-hidden="true" className="home-world__brand-poster">
                    <span>Естественное брожение</span>
                    <strong>WHITE PHOENIX</strong>
                  </div>
                ) : null}
                {world.id === "zero" ? (
                  <div className="home-world__zero-identity">
                    <Image
                      alt="Логотип White Phoenix"
                      height={600}
                      src="/assets/brand/family-logos/white-phoenix-logo-raster-source.png"
                      width={1136}
                    />
                    <strong aria-hidden="true">0%</strong>
                    <div aria-label="Вкусы безалкогольной линейки">
                      {homepageContent.zeroFeature.tastes.map(
                        (taste, index) => (
                          <span key={taste}>
                            {String(index + 1).padStart(2, "0")} · {taste}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="home-world__copy" data-home-world-copy>
                <p>{world.description}</p>
                <span>{world.detail}</span>
                <Link className="home-arrow-link" href={world.href}>
                  Открыть направление <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section
        aria-labelledby="zero-feature-title"
        className="home-zero-feature"
        data-home-reveal
        data-home-zero-feature
        id="zero-collection"
      >
        <div aria-hidden="true" className="home-zero-feature__type">
          0%
        </div>
        <div className="container container--wide home-zero-feature__layout">
          <div>
            <p className="home-kicker home-kicker--light">
              {homepageContent.zeroFeature.eyebrow}
            </p>
            <h2 className="home-section-title" id="zero-feature-title">
              {homepageContent.zeroFeature.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="home-zero-feature__body">
              {homepageContent.zeroFeature.body}
            </p>
            <ButtonLink
              className="home-button home-button--light"
              href={homepageContent.zeroFeature.cta.href}
              variant="inverse"
            >
              {homepageContent.zeroFeature.cta.label}
            </ButtonLink>
          </div>
          <div className="home-zero-feature__showcase" data-home-zero-showcase>
            <div className="home-zero-feature__visual" data-home-zero-visual>
              <Image
                alt="Логотип White Phoenix"
                height={600}
                src="/assets/brand/family-logos/white-phoenix-logo-raster-source.png"
                width={1136}
              />
              <Image
                alt=""
                aria-hidden="true"
                className="home-zero-feature__symbol"
                height={1000}
                src="/assets/brand/symbols/cider-house-colibri-white.svg"
                width={609}
              />
              <span aria-hidden="true">0%</span>
            </div>
            <div
              className="home-zero-feature__tastes"
              aria-label="Три вкуса коллекции"
            >
              {homepageContent.zeroFeature.tastes.map((taste, index) => (
                <div data-home-zero-taste key={taste}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{taste}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-story-title"
        className="home-story"
        data-home-story
        id="about"
      >
        <Image
          alt=""
          aria-hidden="true"
          className="home-story__symbol"
          data-home-story-symbol
          height={1000}
          src="/assets/brand/symbols/cider-house-colibri-black.svg"
          width={585}
        />
        <div className="container container--wide home-story__layout">
          <div data-home-reveal>
            <p className="home-kicker">{homepageContent.story.eyebrow}</p>
            <h2 className="home-section-title" id="home-story-title">
              {homepageContent.story.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <p className="home-story__body" data-home-reveal>
            {homepageContent.story.body}
          </p>
        </div>
        <div
          className="container container--wide home-statistics"
          data-home-reveal
        >
          {visibleStatistics.map((statistic) => (
            <div className="home-statistic" key={statistic.label}>
              <strong>{statistic.value}</strong>
              <span>{statistic.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="production-title"
        className="home-production"
        data-production-story
        id="production-story"
      >
        <div
          className="container container--wide home-production__heading"
          data-home-reveal
        >
          <p className="home-kicker home-kicker--light">
            {homepageContent.production.eyebrow}
          </p>
          <h2 className="home-section-title" id="production-title">
            {homepageContent.production.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p>{homepageContent.production.intro}</p>
        </div>
        <div className="container container--wide home-production__story">
          <div className="home-production__object" data-production-bottle>
            <Image
              alt="Классическая бутылка Mister Bee проходит через визуальную историю производства; упаковка не изменена"
              height={870}
              sizes="(max-width: 768px) 42vw, 18vw"
              src="/assets/products/mister-bee/mister-bee-foundation-01-front.png"
              width={182}
            />
            <div
              aria-label="Прогресс: восемь этапов производства"
              className="home-production__progress"
            >
              <span>01</span>
              <div aria-hidden="true">
                <i data-production-progress />
              </div>
              <span>
                {String(homepageContent.production.stages.length).padStart(
                  2,
                  "0",
                )}
              </span>
            </div>
          </div>
          <div className="home-production__steps">
            {homepageContent.production.stages.map((stage) => (
              <article
                className="home-production-step"
                data-production-step
                data-stage-index={stage.index}
                key={stage.index}
              >
                <span>{stage.index}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="where-to-buy-title"
        className="home-where"
        data-home-reveal
        id="where-to-buy"
      >
        <div className="container container--wide home-where__layout">
          <div className="home-where__copy">
            <p className="home-kicker">{homepageContent.whereToBuy.eyebrow}</p>
            <h2 className="home-section-title" id="where-to-buy-title">
              {homepageContent.whereToBuy.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{homepageContent.whereToBuy.body}</p>
            <ButtonLink
              className="home-button"
              href={homepageContent.whereToBuy.cta.href}
            >
              {homepageContent.whereToBuy.cta.label}
            </ButtonLink>
          </div>
          <div className="home-city-field" aria-label="Города присутствия">
            <div aria-hidden="true" className="home-city-field__lines" />
            <span aria-hidden="true" className="home-city-field__region">
              Россия
            </span>
            <Image
              alt=""
              aria-hidden="true"
              className="home-city-field__symbol"
              data-home-city-symbol
              height={1000}
              src="/assets/brand/symbols/cider-house-colibri-white.svg"
              width={609}
            />
            {homepageContent.whereToBuy.cities.map((city, index) => (
              <span className={`home-city home-city--${index + 1}`} key={city}>
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="partnership-title"
        className="home-partnership"
        data-home-reveal
        id="partners"
      >
        <div className="container container--wide home-partnership__layout">
          <div>
            <p className="home-kicker home-kicker--light">
              {homepageContent.partnership.eyebrow}
            </p>
            <h2 className="home-section-title" id="partnership-title">
              {homepageContent.partnership.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="home-partnership__content">
            <ul>
              {homepageContent.partnership.audiences.map((audience, index) => (
                <li data-home-partner-audience key={audience}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{audience}</strong>
                  <span aria-hidden="true">↗</span>
                </li>
              ))}
            </ul>
            <p>{homepageContent.partnership.body}</p>
            <ButtonLink
              className="home-button home-button--light"
              href={homepageContent.partnership.cta.href}
              variant="inverse"
            >
              {homepageContent.partnership.cta.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="social-title"
        className="home-social"
        data-home-reveal
        id="social"
      >
        <div className="container container--wide home-social__heading">
          <div>
            <p className="home-kicker">{homepageContent.social.eyebrow}</p>
            <h2 className="home-section-title" id="social-title">
              {homepageContent.social.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <p>{homepageContent.social.emptyEditorial}</p>
        </div>
        <div className="container container--wide home-social__links">
          {homepageContent.social.links.map((item, index) => (
            <a
              className={`home-social-card home-social-card--${index + 1}`}
              data-home-social-card
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <span aria-hidden="true">↗</span>
              {"note" in item ? <small>{item.note}</small> : null}
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-title" className="home-faq" id="faq">
        <div className="container container--wide home-faq__layout">
          <div data-home-reveal>
            <p className="home-kicker">Коротко о главном</p>
            <h2 className="home-section-title" id="faq-title">
              Вопросы
              <br />и ответы
            </h2>
          </div>
          <div data-home-reveal>
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-title" className="home-final-cta">
        <Image
          alt=""
          aria-hidden="true"
          className="home-final-cta__symbol"
          height={1000}
          src="/assets/brand/symbols/cider-house-colibri-white.svg"
          width={609}
        />
        <div
          className="container container--wide home-final-cta__layout"
          data-home-reveal
        >
          <div className="home-final-cta__copy">
            <p className="home-kicker home-kicker--light">Cider House</p>
            <h2 className="home-section-title" id="final-cta-title">
              {homepageContent.finalCta.title}
            </h2>
            <div className="home-actions">
              {homepageContent.finalCta.actions.map((action, index) => (
                <ButtonLink
                  className={
                    index === 0
                      ? "home-button home-button--light"
                      : "home-button home-button--outline-light"
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
          <div
            aria-label="Одобренная бутылка Mister Bee"
            className="home-final-cta__product"
            data-home-final-product
          >
            <span aria-hidden="true">CIDER HOUSE · 18+</span>
            <Image
              alt="Классическая медовуха Mister Bee; упаковка показана без изменений"
              height={870}
              sizes="(max-width: 768px) 45vw, 18vw"
              src="/assets/products/mister-bee/mister-bee-foundation-01-front.png"
              width={182}
            />
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}

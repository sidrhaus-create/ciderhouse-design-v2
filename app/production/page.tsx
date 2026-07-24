import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SafeReveal } from "@/components/motion/safe-reveal";
import { BackToTop } from "@/components/catalog/back-to-top";
import { ProcessTimeline } from "@/components/production/process-timeline";
import { homepageContent } from "@/data/homepage-content";

export const metadata: Metadata = {
  title: "Производство — восемь этапов от сырья до розлива",
  description:
    "Как Cider House производит сидр и медовуху: сырьё, брожение, фильтрация, контроль качества и розлив на собственных производственных площадках в России.",
  alternates: {
    canonical: "/production",
  },
  openGraph: {
    title: "Производство Cider House",
    description:
      "Восемь этапов производства: сырьё, брожение, фильтрация, контроль качества и розлив на собственных площадках в России.",
    type: "website",
  },
};

const heroFactory = {
  src: "/assets/production/factory-hero.png",
  alt: "Производственные ёмкости для брожения на площадке Cider House",
  width: 1176,
  height: 784,
};

const stages = homepageContent.production.stages;
const [
  rawMaterial,
  fermentation,
  control,
  temperature,
  filtration,
  cooling,
  batchTest,
] = stages;

const principles = [
  {
    title: "Без спешки",
    body: temperature.body,
  },
  {
    title: "Постоянный контроль",
    body: `${control.body} ${batchTest.body}`,
  },
  {
    title: "Собственное производство",
    body: "Продукция выпускается на собственных производственных площадках в России.",
  },
];

const ingredients = [
  "Яблоко",
  "Груша",
  "Вишня",
  "Ягоды",
  "Гранат",
  "Лимон",
  "Мёд",
];

const qualityMarkers = [
  { title: filtration.title, body: filtration.body },
  { title: cooling.title, body: cooling.body },
  { title: "Проверка партии", body: batchTest.body },
];

const visibleStatistics = homepageContent.statistics.filter(
  (item) => item.visible,
);

export default function ProductionPage() {
  return (
    <div className="family-page production-page">
      <section
        aria-labelledby="production-hero-title"
        className="production-hero"
        id="hero"
      >
        <div
          aria-hidden="true"
          className="catalog-linework catalog-linework--grid"
        />
        <div aria-hidden="true" className="catalog-shimmer" />
        <div className="container container--wide production-hero__layout">
          <SafeReveal className="production-hero__copy">
            <div className="catalog-reveal-stagger">
              <p className="family-kicker production-hero__kicker">
                Производство
              </p>
              <h1 className="production-hero__title" id="production-hero-title">
                {homepageContent.production.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="production-hero__body">
                {homepageContent.production.intro}
              </p>
              <div className="family-actions">
                <ButtonLink
                  className="family-button"
                  href="/catalog"
                  variant="inverse"
                >
                  Смотреть ассортимент
                </ButtonLink>
                <ButtonLink
                  className="family-button family-button--outline"
                  href="/where-to-buy"
                  variant="secondary"
                >
                  Где купить
                </ButtonLink>
              </div>
              <p className="production-hero__meta">
                <span>Россия</span>
                <span aria-hidden="true">·</span>
                <span>с 2017 года</span>
              </p>
            </div>
          </SafeReveal>
        </div>
        <SafeReveal className="production-hero__visual">
          <Image
            alt={heroFactory.alt}
            className="production-hero__visual-image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            src={heroFactory.src}
          />
        </SafeReveal>
      </section>

      <section
        aria-labelledby="philosophy-title"
        className="production-philosophy"
        id="philosophy"
      >
        <SafeReveal className="container container--wide catalog-reveal-rule">
          <p className="family-kicker">
            <span aria-hidden="true" className="catalog-index">
              01
            </span>
            Подход к производству
          </p>
          <h2 className="family-section-title" id="philosophy-title">
            Процесс важнее скорости
          </h2>
          <p className="production-philosophy__statement">
            Каждый напиток проходит восемь последовательных этапов — от
            подготовки сырья до розлива. Ни один этап не сокращают ради
            скорости: {fermentation.body.toLowerCase()}
          </p>
          <ul className="production-principles">
            {principles.map((principle) => (
              <li key={principle.title}>
                <strong>{principle.title}</strong>
                <p>{principle.body}</p>
              </li>
            ))}
          </ul>
        </SafeReveal>
      </section>

      <section
        aria-labelledby="process-title"
        className="production-process"
        id="process"
      >
        <div
          aria-hidden="true"
          className="catalog-shimmer catalog-shimmer--light"
        />
        <div className="container container--wide production-process__layout">
          <SafeReveal className="catalog-reveal-rule production-process__intro">
            <p className="family-kicker">
              <span aria-hidden="true" className="catalog-index">
                02
              </span>
              Как это устроено
            </p>
            <h2 className="family-section-title" id="process-title">
              Восемь этапов производства
            </h2>
            <p className="production-process__lead">
              Последовательность из восьми шагов — от подготовки сырья до
              розлива.
            </p>
          </SafeReveal>
          <ProcessTimeline stages={stages} />
        </div>
      </section>

      <section
        aria-labelledby="ingredients-title"
        className="production-ingredients"
        id="ingredients"
      >
        <SafeReveal className="container container--wide catalog-reveal-rule">
          <p className="family-kicker">
            <span aria-hidden="true" className="catalog-index">
              03
            </span>
            Сырьё
          </p>
          <h2 className="family-section-title" id="ingredients-title">
            Из чего это делают
          </h2>
          <p className="production-ingredients__intro">{rawMaterial.body}</p>
          <ul
            aria-label="Сырьё, используемое в рецептурах"
            className="family-formats__list production-ingredients__list"
          >
            {ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="production-ingredients__note">
            Точный состав зависит от рецептуры конкретного напитка.
          </p>
        </SafeReveal>
      </section>

      <section
        aria-labelledby="fermentation-title"
        className="production-fermentation"
        id="fermentation"
      >
        <div
          aria-hidden="true"
          className="catalog-linework catalog-linework--rings"
        />
        <SafeReveal className="container container--wide catalog-reveal-rule production-fermentation__layout">
          <div>
            <p className="family-kicker production-fermentation__kicker">
              <span aria-hidden="true" className="catalog-index">
                04
              </span>
              Брожение
            </p>
            <h2 className="family-section-title" id="fermentation-title">
              Время нельзя ускорить
            </h2>
            <p>{fermentation.body}</p>
            <p>{control.body}</p>
          </div>
          <div className="production-fermentation__time">
            <strong>14–16</strong>
            <span>{temperature.body}</span>
          </div>
        </SafeReveal>
      </section>

      <section
        aria-labelledby="quality-title"
        className="production-quality"
        id="quality"
      >
        <SafeReveal className="container container--wide catalog-reveal-rule production-quality__layout">
          <div>
            <p className="family-kicker">
              <span aria-hidden="true" className="catalog-index">
                05
              </span>
              Фильтрация и контроль
            </p>
            <h2 className="family-section-title" id="quality-title">
              Проверено на каждом этапе
            </h2>
          </div>
          <ul className="production-quality__markers">
            {qualityMarkers.map((marker) => (
              <li key={marker.title}>
                <strong>{marker.title}</strong>
                <p>{marker.body}</p>
              </li>
            ))}
          </ul>
        </SafeReveal>
      </section>

      <section
        aria-labelledby="scale-title"
        className="production-scale"
        id="scale"
      >
        <div
          aria-hidden="true"
          className="catalog-linework catalog-linework--grid"
        />
        <SafeReveal className="container container--wide catalog-reveal-rule">
          <p className="family-kicker">
            <span aria-hidden="true" className="catalog-index">
              06
            </span>
            География
          </p>
          <h2 className="family-section-title" id="scale-title">
            Собственное производство в России
          </h2>
          <div className="production-scale__grid">
            {visibleStatistics.map((statistic) => (
              <div className="production-scale__tile" key={statistic.label}>
                <strong>{statistic.value}</strong>
                <span>{statistic.label}</span>
              </div>
            ))}
          </div>
        </SafeReveal>
      </section>

      <section
        aria-labelledby="production-cta-title"
        className="family-final-cta"
        id="cta"
      >
        <div className="container container--wide family-final-cta__layout">
          <h2 className="family-section-title" id="production-cta-title">
            Выберите свой вкус
          </h2>
          <div className="family-actions">
            <ButtonLink
              className="family-button"
              href="/catalog"
              variant="inverse"
            >
              Смотреть ассортимент
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

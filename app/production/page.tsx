import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackToTop } from "@/components/catalog/back-to-top";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad, Words } from "@/components/site/text";
import { Bottle } from "@/components/ui/bottle";
import { homepageContent } from "@/data/homepage-content";
import { pick } from "@/data/showcase";
import { photography } from "@/data/site-content";

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

/* Every sentence below is taken from `homepageContent.production` /
   `homepageContent.statistics` (see docs/PRODUCTION-CONTENT-SOURCES.md). */
const { production } = homepageContent;
const stages = production.stages;
const [rawMaterial, fermentation, control, temperature, , , batchTest] = stages;

const principles = [
  { title: "Без спешки", body: temperature.body },
  { title: "Постоянный контроль", body: `${control.body} ${batchTest.body}` },
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

const statistics = homepageContent.statistics.filter((item) => item.visible);
const [processBottle] = pick(["mister-bee-classic"]);

export default function ProductionPage() {
  return (
    <SiteMotion className="production">
      <section
        aria-labelledby="production-title"
        className="cx-pagehero cx-tone-ink"
      >
        <div className="cx-pagehero__media" data-parallax>
          <Image
            alt={photography.factory.alt}
            height={photography.factory.height}
            priority
            sizes="100vw"
            src={photography.factory.src}
            width={photography.factory.width}
          />
        </div>
        <div className="cx-wrap">
          <p className="cx-pagehero__meta cx-label">
            <span>Производство</span>
            <span>Россия · с 2017 года</span>
          </p>
          <h1
            className="cx-display cx-pagehero__title"
            data-lines
            id="production-title"
          >
            <Lines lines={production.title} />
          </h1>
          <div className="cx-pagehero__foot" data-fade>
            <p className="cx-lead">{production.intro}</p>
            <div className="cx-actions">
              <Link className="cx-btn cx-btn--light" href="#process">
                Восемь этапов <span aria-hidden="true">↓</span>
              </Link>
              <Link className="cx-btn cx-btn--ghost" href="/catalog">
                Смотреть ассортимент
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Approach ------------------------------------------------------ */}
      <section
        aria-labelledby="approach-title"
        className="cx-section cx-tone-paper"
      >
        <div className="cx-wrap">
          <Kicker index="01">Подход к производству</Kicker>
          <h2 className="cx-display" data-lines id="approach-title">
            <Lines lines={["Процесс важнее", "скорости"]} />
          </h2>
          <p className="pr-statement" data-words>
            <Words
              text={`Каждый напиток проходит восемь последовательных этапов — от подготовки сырья до розлива. ${fermentation.body}`}
            />
          </p>
          <ul className="pr-principles" data-stagger>
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="cx-label cx-muted">{pad(index + 1)}</span>
                <h3 className="cx-h3">{principle.title}</h3>
                <p>{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process ------------------------------------------------------- */}
      <section
        aria-labelledby="process-title"
        className="cx-section cx-tone-ink"
        id="process"
      >
        <div className="cx-wrap">
          <Kicker aside={`${stages.length} этапов`} index="02">
            {production.eyebrow}
          </Kicker>
          <div className="cx-split">
            <div className="cx-split__sticky pr-process__aside">
              <h2 className="cx-h2" data-lines id="process-title">
                <Lines lines={["Восемь этапов", "производства"]} />
              </h2>
              {processBottle ? (
                <div className="pr-process__bottle">
                  <Bottle
                    asset={processBottle.asset}
                    sizes="(max-width: 1023px) 40vw, 18vw"
                  />
                </div>
              ) : null}
            </div>
            <ol className="cx-steps" data-stagger>
              {stages.map((stage) => (
                <li className="cx-step" key={stage.index}>
                  <span aria-hidden="true" className="cx-step__num">
                    {stage.index}
                  </span>
                  <h3 className="cx-h3">{stage.title}</h3>
                  <p>{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Raw materials -------------------------------------------------- */}
      <section
        aria-labelledby="ingredients-title"
        className="cx-section cx-tone-brand pr-ingredients"
      >
        <div aria-hidden="true" className="cx-marquee">
          {[0, 1].map((row) => (
            <div
              className={`cx-marquee__row${row === 1 ? " cx-marquee__row--outline" : ""}`}
              key={row}
            >
              {[0, 1].map((group) => (
                <div className="cx-marquee__group" key={group}>
                  {(row === 0 ? ingredients : [...ingredients].reverse()).map(
                    (item) => (
                      <span className="cx-marquee__item" key={item}>
                        {item}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="cx-wrap">
          <Kicker index="03">Сырьё</Kicker>
          <div className="cx-split cx-split--even">
            <h2 className="cx-h2" data-lines id="ingredients-title">
              <Lines lines={["Из чего", "это делают"]} />
            </h2>
            <div className="cx-stack" data-fade>
              <p className="cx-lead">{rawMaterial.body}</p>
              <p className="cx-note">
                Точный состав зависит от рецептуры конкретного напитка.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fermentation --------------------------------------------------- */}
      <section
        aria-labelledby="fermentation-title"
        className="cx-section cx-tone-white"
      >
        <div className="cx-wrap">
          <Kicker index="04">Брожение</Kicker>
          <div className="cx-split cx-split--even">
            <div className="cx-stack">
              <h2 className="cx-h2" data-lines id="fermentation-title">
                <Lines lines={["Время нельзя", "ускорить"]} />
              </h2>
              <div className="cx-prose" data-fade>
                <p>{fermentation.body}</p>
                <p>{control.body}</p>
              </div>
            </div>
            <div data-fade>
              <p className="cx-numeral pr-days">14–16</p>
              <p className="cx-lead">{temperature.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scale ---------------------------------------------------------- */}
      <section aria-labelledby="scale-title" className="cx-section cx-tone-ink">
        <div className="cx-wrap">
          <Kicker index="05">География</Kicker>
          <h2 className="cx-h2 pr-scale__title" data-lines id="scale-title">
            <Lines lines={["Собственное производство", "в России"]} />
          </h2>
          <dl className="cx-stats" data-stagger>
            {statistics.map((statistic) => (
              <div className="cx-stat" key={statistic.label}>
                <dt>{statistic.label}</dt>
                <dd>{statistic.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Closing />
      <BackToTop />
    </SiteMotion>
  );
}

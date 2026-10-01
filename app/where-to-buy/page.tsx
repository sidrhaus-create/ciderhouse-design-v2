import type { Metadata } from "next";
import Link from "next/link";
import { BackToTop } from "@/components/catalog/back-to-top";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad } from "@/components/site/text";
import { whereToBuyContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: whereToBuyContent.seo.title,
  description: whereToBuyContent.seo.description,
  alternates: { canonical: "/where-to-buy" },
};

/**
 * Where to buy: only the verified public messaging is shown — no store list,
 * no retailer names, no availability data.
 */
export default function WhereToBuyPage() {
  const { cities } = whereToBuyContent;

  return (
    <SiteMotion className="where">
      <section
        aria-labelledby="where-title"
        className="cx-pagehero cx-tone-brand wb-hero"
      >
        <div className="cx-wrap">
          <p className="cx-pagehero__meta cx-label">
            <span>Где купить</span>
            <span>{whereToBuyContent.eyebrow}</span>
          </p>
          <h1 className="cx-mega wb-title" data-lines id="where-title">
            <Lines lines={["Найди", "Cider House", "в своём городе"]} />
          </h1>
          <div className="cx-pagehero__foot" data-fade>
            <p className="cx-lead">{whereToBuyContent.body}</p>
            <div className="cx-actions">
              <Link className="cx-btn cx-btn--light" href="/contacts">
                Связаться с нами <span aria-hidden="true">→</span>
              </Link>
              <Link className="cx-btn cx-btn--ghost" href="/catalog">
                Смотреть ассортимент
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="cx-marquee wb-marquee">
          {[0, 1].map((row) => (
            <div
              className={`cx-marquee__row${row === 1 ? " cx-marquee__row--outline" : ""}`}
              key={row}
            >
              {[0, 1].map((group) => (
                <div className="cx-marquee__group" key={group}>
                  {(row === 0 ? cities : [...cities].reverse()).map((city) => (
                    <span className="cx-marquee__item" key={city}>
                      {city}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cities-title"
        className="cx-section cx-tone-paper"
      >
        <div className="cx-wrap">
          <Kicker index="01">География</Kicker>
          <div className="cx-split">
            <div className="cx-stack cx-split__sticky">
              <h2 className="cx-h2" data-lines id="cities-title">
                <Lines lines={["По всей", "России"]} />
              </h2>
              <p className="cx-note" data-fade>
                {whereToBuyContent.citiesNote}
              </p>
            </div>
            <ul className="cx-rows" data-stagger>
              {cities.map((city, index) => (
                <li key={city}>
                  <div className="cx-row">
                    <span className="cx-row__index">{pad(index + 1)}</span>
                    <span className="cx-row__title">{city}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="buy-faq-title"
        className="cx-section cx-tone-white"
      >
        <div className="cx-wrap">
          <Kicker index="02">Коротко о главном</Kicker>
          <div className="cx-split">
            <h2
              className="cx-h2 cx-split__sticky"
              data-lines
              id="buy-faq-title"
            >
              <Lines lines={["Покупка", "и доставка"]} />
            </h2>
            <dl className="cx-qa" data-stagger>
              {whereToBuyContent.answers.map((item) => (
                <div key={item.question}>
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Closing
        actions={[
          { label: "Смотреть ассортимент", href: "/catalog" },
          { label: "Партнёрам", href: "/partners" },
        ]}
      />
      <BackToTop />
    </SiteMotion>
  );
}

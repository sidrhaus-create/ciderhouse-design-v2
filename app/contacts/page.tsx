import type { Metadata } from "next";
import Link from "next/link";
import { BackToTop } from "@/components/catalog/back-to-top";
import { SiteMotion } from "@/components/motion/site-motion";
import { Closing } from "@/components/site/closing";
import { Kicker, Lines, pad } from "@/components/site/text";
import { contactsContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: contactsContent.seo.title,
  description: contactsContent.seo.description,
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <SiteMotion className="contacts">
      <section
        aria-labelledby="contacts-title"
        className="cx-pagehero cx-tone-ink ck-hero"
      >
        <div className="cx-wrap">
          <p className="cx-pagehero__meta cx-label">
            <span>Контакты</span>
            <span>{contactsContent.company}</span>
          </p>
          <h1 className="cx-mega" data-lines id="contacts-title">
            <Lines lines={contactsContent.title} />
          </h1>
        </div>
      </section>

      <section
        aria-labelledby="channels-title"
        className="cx-section cx-section--tight cx-tone-ink"
      >
        <div className="cx-wrap">
          <h2 className="visually-hidden" id="channels-title">
            Телефон и почта
          </h2>
          <ul className="cx-rows" data-stagger>
            {contactsContent.channels.map((channel, index) => (
              <li key={channel.href}>
                <a className="cx-row" href={channel.href}>
                  <span className="cx-row__index">{pad(index + 1)}</span>
                  <span className="cx-row__title">{channel.value}</span>
                  <span aria-hidden="true" className="cx-row__aside">
                    →
                  </span>
                  <span className="cx-row__sub">{channel.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="social-title"
        className="cx-section cx-tone-paper"
      >
        <div className="cx-wrap">
          <Kicker index="01">Мы в сети</Kicker>
          <div className="cx-split">
            <div className="cx-stack cx-split__sticky">
              <h2 className="cx-h2" data-lines id="social-title">
                <Lines lines={["Официальные", "каналы"]} />
              </h2>
              <div className="cx-actions" data-fade>
                <Link className="cx-btn cx-btn--brand" href="/partners">
                  Партнёрам <span aria-hidden="true">→</span>
                </Link>
                <Link className="cx-btn cx-btn--ghost" href="/where-to-buy">
                  Где купить
                </Link>
              </div>
            </div>
            <div>
              <ul className="cx-rows" data-stagger>
                {contactsContent.social.map((item, index) => (
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
              {contactsContent.social.map((item) =>
                "note" in item ? (
                  <p className="cx-note ck-note" key={item.href}>
                    {item.note}
                  </p>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      <Closing />
      <BackToTop />
    </SiteMotion>
  );
}

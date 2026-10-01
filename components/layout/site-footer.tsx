"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { productFamilies } from "@/data/catalog-content";
import { homepageContent } from "@/data/homepage-content";
import { foundationNavigation, isPreviewRoute } from "@/lib/navigation";

const footerBrandLinks = productFamilies.map((family) => ({
  href: `/brands/${family.slug}`,
  label: family.navLabel,
}));

export function SiteFooter() {
  const pathname = usePathname();

  if (!isPreviewRoute(pathname)) return <CampaignFooter />;

  return (
    <footer className="site-footer site-footer--foundation">
      <Container className="site-footer__grid" size="wide">
        <div>
          <Link
            aria-label="Cider House — главная"
            className="wordmark wordmark--inverse"
            href="/"
          >
            <Image
              alt=""
              className="wordmark__image"
              height={1000}
              src="/assets/brand/master-logo/cider-house-logo-horizontal-white.svg"
              width={3775}
            />
          </Link>
          <p className="site-footer__statement">
            Системная основа цифровой платформы Cider House.
          </p>
        </div>
        <nav aria-label="Навигация в подвале" className="site-footer__nav">
          {foundationNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-footer__legal">
          <span>18+ · Foundation preview</span>
          <span>© Cider House</span>
        </div>
      </Container>
    </footer>
  );
}

function CampaignFooter() {
  const { contacts, navigation, social, whereToBuy } = homepageContent;
  const currentYear = new Date().getFullYear();
  const pages = navigation.filter((item) => !("kind" in item));

  return (
    <footer className="cx-footer">
      <div className="cx-wrap cx-footer__cta">
        <p className="cx-footer__cta-title">
          {whereToBuy.title[0]}
          <br />
          {whereToBuy.title[1]}
        </p>
        <Link className="cx-btn cx-btn--light" href="/where-to-buy">
          {whereToBuy.cta.label} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="cx-wrap cx-footer__grid">
        <nav aria-label="Бренды" className="cx-footer__group">
          <h2>Бренды</h2>
          {footerBrandLinks.map((brand) => (
            <Link href={brand.href} key={brand.href}>
              {brand.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Разделы" className="cx-footer__group">
          <h2>Разделы</h2>
          {pages.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="cx-footer__group">
          <h2>Контакты</h2>
          <a href={contacts.phoneHref}>{contacts.phone}</a>
          <a href={contacts.emailHref}>{contacts.email}</a>
          <a href={contacts.generalEmailHref}>{contacts.generalEmail}</a>
        </div>
        <div className="cx-footer__group">
          <h2>Мы в сети</h2>
          {social.links.map((item) => (
            <a
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              {item.label}
              <span className="visually-hidden">
                {" "}
                (откроется в новой вкладке)
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="cx-wrap">
        <Link
          aria-label="Cider House — главная"
          className="cx-footer__mark"
          href="/"
        >
          <Image
            alt=""
            height={1000}
            src="/assets/brand/master-logo/cider-house-logo-horizontal-white.svg"
            width={3775}
          />
        </Link>
      </div>

      <div className="cx-wrap cx-footer__bottom" id="legal">
        <p className="cx-footer__age">18+</p>
        <p>
          © <time suppressHydrationWarning>{currentYear}</time>{" "}
          {contacts.company}
        </p>
        <p className="cx-footer__note">
          Информация на сайте не является публичной офертой. Чрезмерное
          употребление алкоголя вредит вашему здоровью.{" "}
          {social.links.flatMap((item) => ("note" in item ? [item.note] : []))}
        </p>
        <div className="cx-footer__legal">
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/legal">Правовая информация</Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { productFamilies } from "@/data/catalog-content";
import { homepageContent } from "@/data/homepage-content";
import { foundationNavigation, isPreviewRoute } from "@/lib/navigation";
import { Container } from "@/components/ui/container";

const footerBrandLinks = productFamilies.map((family) => ({
  href: `/brands/${family.slug}`,
  label: family.navLabel,
}));

export function SiteFooter() {
  const pathname = usePathname();

  if (!isPreviewRoute(pathname)) return <HomepageFooter />;

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

function HomepageFooter() {
  const { contacts, navigation, social } = homepageContent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="home-footer" id="contacts">
      <div className="container container--wide home-footer__top">
        <Link
          aria-label="Cider House — главная"
          className="home-footer__brand"
          href="/"
        >
          <Image
            alt=""
            height={1000}
            src="/assets/brand/master-logo/cider-house-logo-horizontal-white.svg"
            width={3775}
          />
        </Link>
        <p className="home-footer__age">18+</p>
      </div>
      <div className="container container--wide home-footer__primary">
        <div>
          <p className="home-footer__eyebrow">Продукция рядом</p>
          <p className="home-footer__primary-title">
            Найди Cider House
            <br />в своём городе
          </p>
        </div>
        <Link className="home-footer__primary-action" href="/where-to-buy">
          Где купить <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="container container--wide home-footer__grid">
        <nav aria-label="Бренды" className="home-footer__brands">
          <p className="home-footer__group-title">Бренды</p>
          {footerBrandLinks.map((brand) => (
            <Link href={brand.href} key={brand.href}>
              {brand.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Навигация в подвале" className="home-footer__nav">
          <p className="home-footer__group-title">Разделы</p>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="home-footer__contacts">
          <p className="home-footer__group-title">Контакты</p>
          <a href={contacts.phoneHref}>{contacts.phone}</a>
          <a href={contacts.emailHref}>{contacts.email}</a>
          <a href={contacts.generalEmailHref}>{contacts.generalEmail}</a>
        </div>
        <div className="home-footer__social">
          <p className="home-footer__group-title">Социальные сети</p>
          {social.links.map((item) => (
            <a
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container container--wide home-footer__bottom" id="legal">
        <p>
          © <time suppressHydrationWarning>{currentYear}</time>{" "}
          {contacts.company}
        </p>
        <div className="home-footer__legal-links">
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/legal">Правовая информация</Link>
        </div>
        <p className="home-footer__legal-note">
          Информация на сайте не является публичной офертой. Чрезмерное
          употребление алкоголя вредит вашему здоровью.
        </p>
      </div>
    </footer>
  );
}

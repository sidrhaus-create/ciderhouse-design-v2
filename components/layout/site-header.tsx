"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef } from "react";
import { productFamilies } from "@/data/catalog-content";
import { homepageContent } from "@/data/homepage-content";
import { foundationNavigation, isPreviewRoute } from "@/lib/navigation";

const brandLinks = productFamilies.map((family) => ({
  href: `/brands/${family.slug}`,
  label: family.navLabel,
}));

const WHERE_TO_BUY = "/where-to-buy";

type NavItem = { label: string; href: string; kind?: string };

export function SiteHeader() {
  const pathname = usePathname();
  const isPreview = isPreviewRoute(pathname);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuTitleId = useId();
  const navigation: readonly NavItem[] = isPreview
    ? foundationNavigation
    : homepageContent.navigation;
  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    const menu = menuRef.current;
    if (menu?.open) menu.close();
    document.documentElement.classList.remove("is-overlay-open");
    document
      .querySelectorAll<HTMLDetailsElement>("details[data-brands-menu]")
      .forEach((details) => {
        details.open = false;
      });
  }, [pathname]);

  useEffect(() => {
    /* Close the desktop brands disclosure on outside click or Escape. */
    function closeBrands(event: Event) {
      document
        .querySelectorAll<HTMLDetailsElement>(
          ".desktop-nav details[data-brands-menu][open]",
        )
        .forEach((details) => {
          if (
            event.type === "keydown" ||
            !details.contains(event.target as Node)
          ) {
            details.open = false;
          }
        });
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeBrands(event);
    }
    const menu = menuRef.current;
    document.addEventListener("click", closeBrands);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", closeBrands);
      document.removeEventListener("keydown", onKey);
      if (menu?.open) menu.close();
      document.documentElement.classList.remove("is-overlay-open");
    };
  }, []);

  function openMenu() {
    const menu = menuRef.current;
    if (!menu) return;
    document.documentElement.classList.add("is-overlay-open");
    menu.showModal();
  }

  function closeMenu() {
    menuRef.current?.close();
    document.documentElement.classList.remove("is-overlay-open");
  }

  return (
    <header className="site-header site-header--cx">
      <div className="site-header__inner">
        <Link aria-label="Cider House — главная" className="wordmark" href="/">
          <Image
            alt=""
            className="wordmark__image"
            height={1000}
            priority
            src="/assets/brand/master-logo/cider-house-logo-horizontal-white.svg"
            width={3775}
          />
        </Link>
        <nav
          aria-label={
            isPreview ? "Навигация по foundation" : "Основная навигация"
          }
          className="desktop-nav"
        >
          {navigation
            .filter((item) => item.href !== WHERE_TO_BUY)
            .map((item) =>
              item.kind === "brands" ? (
                <details
                  className="desktop-nav__brands"
                  data-brands-menu
                  key={item.href}
                >
                  <summary className="desktop-nav__link">
                    {item.label}
                    <span aria-hidden="true" className="desktop-nav__caret">
                      ▾
                    </span>
                  </summary>
                  <div className="desktop-nav__brands-menu">
                    {brandLinks.map((brand) => (
                      <Link
                        aria-current={
                          pathname === brand.href ? "page" : undefined
                        }
                        href={brand.href}
                        key={brand.href}
                      >
                        {brand.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="desktop-nav__link"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ),
            )}
        </nav>
        {isPreview ? null : (
          <Link className="header-cta" href={WHERE_TO_BUY}>
            Где купить <span aria-hidden="true">→</span>
          </Link>
        )}
        <button
          aria-haspopup="dialog"
          className="menu-button"
          onClick={openMenu}
          type="button"
        >
          <span>Меню</span>
          <span aria-hidden="true" className="menu-button__icon">
            <i />
            <i />
          </span>
        </button>
      </div>

      <dialog
        aria-labelledby={menuTitleId}
        className="mobile-menu mobile-menu--cx"
        onCancel={closeMenu}
        onClose={() =>
          document.documentElement.classList.remove("is-overlay-open")
        }
        ref={menuRef}
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__topline">
            <Image
              alt="Cider House"
              className="mobile-menu__logo"
              height={1000}
              src="/assets/brand/master-logo/cider-house-logo-horizontal-white.svg"
              width={3775}
            />
            <p className="visually-hidden" id={menuTitleId}>
              Навигация
            </p>
            <button
              aria-label="Закрыть меню"
              className="icon-button"
              onClick={closeMenu}
              type="button"
            >
              ×
            </button>
          </div>
          <nav aria-label="Мобильная навигация" className="mobile-menu__nav">
            <Link
              aria-current={pathname === "/" ? "page" : undefined}
              className="mobile-menu__link"
              href="/"
              onClick={closeMenu}
            >
              <span className="mobile-menu__index">00</span>
              Главная
            </Link>
            {navigation.map((item, index) =>
              item.kind === "brands" ? (
                <details
                  className="mobile-menu__brands"
                  data-brands-menu
                  key={item.href}
                >
                  <summary className="mobile-menu__link">
                    <span className="mobile-menu__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mobile-menu__link-label">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="mobile-menu__caret">
                      ▾
                    </span>
                  </summary>
                  <div className="mobile-menu__brands-list">
                    {brandLinks.map((brand) => (
                      <Link
                        aria-current={
                          pathname === brand.href ? "page" : undefined
                        }
                        href={brand.href}
                        key={brand.href}
                        onClick={closeMenu}
                      >
                        {brand.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="mobile-menu__link"
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                >
                  <span className="mobile-menu__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="mobile-menu__foot">
            <p className="mobile-menu__note">
              {isPreview
                ? "Preview shell · native scroll · keyboard ready"
                : "Сидр · медовуха · 0% · 18+"}
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}

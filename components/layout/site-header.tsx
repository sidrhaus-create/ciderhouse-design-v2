"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { homepageContent } from "@/data/homepage-content";
import { foundationNavigation } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuTitleId = useId();
  const navigation = isHomepage
    ? homepageContent.navigation
    : foundationNavigation;

  useEffect(() => {
    if (!isHomepage) return;

    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() =>
        setIsScrolled(window.scrollY > 40),
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [isHomepage]);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu?.open) menu.close();
    document.documentElement.classList.remove("is-overlay-open");
  }, [pathname]);

  useEffect(
    () => () => {
      const menu = menuRef.current;
      if (menu?.open) menu.close();
      document.documentElement.classList.remove("is-overlay-open");
    },
    [],
  );

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
    <header
      className={`site-header ${isHomepage ? "site-header--home" : "site-header--foundation"}`}
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <div className="site-header__inner container container--wide">
        <Link aria-label="Cider House — главная" className="wordmark" href="/">
          {isHomepage ? (
            <>
              <Image
                alt=""
                className="wordmark__image wordmark__image--home-light"
                height={1000}
                priority
                src="/assets/brand/master-logo/cider-house-logo-horizontal-white.svg"
                width={3775}
              />
              <Image
                alt=""
                className="wordmark__image wordmark__image--home-dark"
                height={1000}
                priority
                src="/assets/brand/master-logo/cider-house-logo-horizontal-black.svg"
                width={3094}
              />
            </>
          ) : (
            <Image
              alt=""
              className="wordmark__image"
              height={1000}
              priority
              src="/assets/brand/master-logo/cider-house-logo-horizontal-black.svg"
              width={3094}
            />
          )}
        </Link>
        <nav
          aria-label={
            isHomepage ? "Основная навигация" : "Навигация по foundation"
          }
          className="desktop-nav"
        >
          {navigation.map((item) => (
            <Link
              aria-current={
                !isHomepage && pathname === item.href ? "page" : undefined
              }
              className="desktop-nav__link"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {isHomepage ? (
          <Link className="header-cta" href="/where-to-buy">
            Где купить
          </Link>
        ) : null}
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
        className={`mobile-menu ${isHomepage ? "mobile-menu--home" : ""}`}
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
            <p className="mobile-menu__eyebrow" id={menuTitleId}>
              {isHomepage ? "Навигация" : "Foundation navigation"}
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
            {!isHomepage ? (
              <Link className="mobile-menu__link" href="/" onClick={closeMenu}>
                <span>00</span>
                Главная
              </Link>
            ) : null}
            {navigation.map((item, index) => (
              <Link
                aria-current={
                  !isHomepage && pathname === item.href ? "page" : undefined
                }
                className="mobile-menu__link"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mobile-menu__note">
            {isHomepage
              ? "Сидр и медовуха · 18+"
              : "Preview shell · native scroll · keyboard ready"}
          </p>
        </div>
      </dialog>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef } from "react";
import { foundationNavigation } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);
  const menuTitleId = useId();

  useEffect(() => {
    const menu = menuRef.current;
    return () => {
      if (menu?.open) menu.close();
      document.documentElement.classList.remove("is-overlay-open");
    };
  }, []);

  function openMenu() {
    document.documentElement.classList.add("is-overlay-open");
    menuRef.current?.showModal();
  }

  function closeMenu() {
    menuRef.current?.close();
    document.documentElement.classList.remove("is-overlay-open");
  }

  return (
    <header className="site-header">
      <div className="site-header__inner container container--wide">
        <Link
          aria-label="Cider House foundation — главная"
          className="wordmark"
          href="/"
        >
          CIDER<span>HOUSE</span>
        </Link>
        <nav aria-label="Навигация по foundation" className="desktop-nav">
          {foundationNavigation.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className="desktop-nav__link"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
        className="mobile-menu"
        onCancel={closeMenu}
        onClose={() =>
          document.documentElement.classList.remove("is-overlay-open")
        }
        ref={menuRef}
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__topline">
            <p className="mobile-menu__eyebrow" id={menuTitleId}>
              Foundation navigation
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
            <Link className="mobile-menu__link" href="/" onClick={closeMenu}>
              <span>00</span>
              Foundation
            </Link>
            {foundationNavigation.map((item, index) => (
              <Link
                aria-current={pathname === item.href ? "page" : undefined}
                className="mobile-menu__link"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mobile-menu__note">
            Preview shell · native scroll · keyboard ready
          </p>
        </div>
      </dialog>
    </header>
  );
}

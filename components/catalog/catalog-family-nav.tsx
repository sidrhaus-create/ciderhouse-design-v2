"use client";

import { useEffect, useRef, useState } from "react";

type CatalogFamilyNavProps = {
  items: Array<{ slug: string; label: string }>;
};

export function CatalogFamilyNav({ items }: CatalogFamilyNavProps) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Навигация по направлениям каталога"
      className="catalog-family-nav"
      ref={navRef}
    >
      {items.map((item) => (
        <a
          aria-current={activeSlug === item.slug ? "true" : undefined}
          className="catalog-family-nav__link"
          href={`#${item.slug}`}
          key={item.slug}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

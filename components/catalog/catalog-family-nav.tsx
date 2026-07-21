"use client";

import { useEffect, useRef, useState } from "react";
import type { FamilyTheme } from "@/types/catalog";

type CatalogFamilyNavProps = {
  items: Array<{ slug: string; label: string; theme: FamilyTheme }>;
};

export function CatalogFamilyNav({ items }: CatalogFamilyNavProps) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    linkRefs.current[activeSlug ?? ""]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSlug]);

  const activeTheme =
    items.find((item) => item.slug === activeSlug)?.theme ?? "warm";
  const navTheme =
    activeTheme === "dark" || activeTheme === "purple" ? "dark" : "light";

  return (
    <nav
      aria-label="Навигация по направлениям каталога"
      className="catalog-family-nav"
      data-theme={navTheme}
      ref={navRef}
    >
      {items.map((item) => (
        <a
          aria-current={activeSlug === item.slug ? "true" : undefined}
          className="catalog-family-nav__link"
          href={`#${item.slug}`}
          key={item.slug}
          ref={(element) => {
            linkRefs.current[item.slug] = element;
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

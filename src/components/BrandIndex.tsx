"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { BRANDS, brandType, brandVars, type BrandSlug } from "@/data/brands";
import { PRODUCTS } from "@/data/catalog";
import { Chapter, Pack } from "./primitives";

// what rides next to the active line: one of the brand's own packs (product slug → verified asset)
const PHOTO: Partial<Record<BrandSlug, string>> = {
  "white-phoenix": "white-phoenix-passionfruit-cherry", "double-tree": "double-tree-green-apple", "mister-bee": "mister-bee-mandarin",
  zero: "zero-pomegranate-raspberry", "bumble-coffee": "bumble-coffee-cherry",
};

/** The portfolio as one index: the line you're on switches the whole plane to that brand's colours and sets its name in its own face. */
export function BrandIndex({ heading = "h2", first = false }: { heading?: "h1" | "h2"; first?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const H = heading;

  useEffect(() => {
    const el = root.current!;
    const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
    const ctx = gsap.context(() => {
      rows.forEach((r, i) => ScrollTrigger.create({ trigger: r, start: "top 56%", end: "bottom 56%", onToggle: (s) => { if (s.isActive) setActive(i); } }));
    }, el);
    return () => ctx.revert();
  }, []);

  // the bottle travels along a straight vertical track to the active line
  useEffect(() => {
    const el = root.current, f = float.current;
    if (!el || !f) return;
    const row = el.querySelectorAll<HTMLElement>("[data-row]")[active];
    if (!row) return;
    gsap.to(f, { y: row.offsetTop + row.offsetHeight / 2, duration: 0.8, ease: "power4.out", overwrite: "auto" });
  }, [active]);

  const b = BRANDS[active];
  const photo = PHOTO[b.slug] && PRODUCTS.find((p) => p.slug === PHOTO[b.slug]);

  return (
    <section ref={root} aria-labelledby="brands-index" className="field-brand relative overflow-hidden" style={{ ...brandVars(b), transition: "background-color .5s var(--ease-io), color .5s var(--ease-io)" }}>
      <div className={`wrap relative ${first ? "pb-[clamp(43px,5.3vw,77px)] pt-[clamp(104px,11vw,150px)]" : "sheet-pad"}`}>
        <div className="mb-10 grid grid-cols-1 items-end gap-5 md:mb-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <Chapter n={first ? "—" : "03"} label="Бренды" className="mb-6" />
            <H id="brands-index" className="t-xl" style={{ fontFamily: "var(--f-master)" }}>Шесть<br />характеров</H>
          </div>
          <p className="t-tag md:col-span-4 md:text-right">У каждого бренда — свой цвет,<br />свой шрифт и свой голос</p>
        </div>

        <div className="relative">
          <ul>
            {BRANDS.map((x, i) => {
              const on = i === active;
              return (
                <li key={x.slug} data-row className="border-t border-current last:border-b">
                  <Link
                    href={`/brands/${x.slug}/`}
                    onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                    className="group relative block py-3 transition-opacity duration-500 md:py-4"
                    style={{ opacity: on ? 1 : 0.22 }}
                  >
                    <span className="flex items-baseline gap-4 md:gap-8">
                      <span className="t-tag t-num w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-[clamp(32px,5.8vw,104px)] leading-[0.96] transition-transform duration-700 ${on ? "translate-x-[0.08em]" : ""}`} style={{ ...brandType(x), transitionTimingFunction: "var(--ease-out)" }}>{x.name}</span>
                    </span>
                    <span className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: on ? "1fr" : "0fr", transitionTimingFunction: "var(--ease-out)" }}>
                      <span className="overflow-hidden">
                        <span className="flex flex-col gap-3 pb-2 pl-10 pt-4 md:flex-row md:items-center md:gap-8 md:pl-14">
                          <span className="max-w-[40ch] text-[15px] font-medium leading-snug md:text-[16px]">{x.line}</span>
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="chip">{x.family === "zero" ? "направление 0%" : "алкогольный портфель"}</span>
                            <span className="chip">{x.kind}</span>
                            <span className="chip chip-solid">{x.status === "coming-soon" ? "следить →" : "к бренду →"}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div ref={float} aria-hidden="true" className="pointer-events-none absolute right-[4%] top-0 z-10 hidden md:block">
            {photo && (
              <div key={b.slug} className="-translate-y-1/2 animate-[floatIn_.7s_var(--ease-io)_both]">
                <Pack p={photo} sizes="14vw" className="h-[clamp(260px,46vh,440px)]" />
              </div>
            )}
          </div>
        </div>
        <style>{`@keyframes floatIn{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}`}</style>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="t-tag">Алкогольный портфель · 3 &nbsp;+&nbsp; Направление 0% · 3</p>
          {first ? <Link href="/katalog/" className="btn">Весь ассортимент</Link> : <Link href="/brands/" className="btn">Все бренды</Link>}
        </div>
      </div>
    </section>
  );
}

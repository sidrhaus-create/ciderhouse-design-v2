"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Brand } from "@/data/brands";
import { brandType } from "@/data/brands";
import type { Product } from "@/data/catalog";
import { flavourAccent } from "@/lib/flavour";
import { useMotion } from "@/lib/motion";
import { Pack, Swatch } from "./primitives";

/** A brand's range as an environment: a sticky stage on the brand's plane and a ruled index.
 *  The active line walks onto the stage. Activation never needs hover: the line crossing the focus band becomes active on scroll
 *  (centre of the viewport on desktop, just under the stage on touch); hover and tap are shortcuts. */
export function BrandRange({ b, items, offset = 0 }: { b: Brand; items: Product[]; offset?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const { lenis } = useMotion();
  const [active, setActive] = useState(0);
  const key = items.map((p) => p.slug).join("|");

  useEffect(() => {
    setActive(0);
    const el = root.current;
    if (!el) return;
    const rows = [...el.querySelectorAll<HTMLElement>("[data-row]")];
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    // focus line: the centre of the viewport on desktop, the edge just under the sticky stage on touch layouts
    const update = () => {
      raf = 0;
      const box = el.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight || !rows.length) return;
      const y = mq.matches ? innerHeight / 2 : offset + innerHeight * 0.4 + 30;
      let idx = rows.findIndex((r) => { const b = r.getBoundingClientRect(); return b.top <= y && b.bottom > y; });
      if (idx < 0) idx = rows[0].getBoundingClientRect().top > y ? 0 : rows.length - 1;
      setActive(idx);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [key, offset]);

  const p = items[Math.min(active, items.length - 1)];
  if (!p) return null;
  // flavour names are Russian: Latin-only brand faces (Sauna SmallCaps, Friz Quadrata) hand them to the master face
  const type = b.face.cyr ? brandType(b) : ({ fontFamily: "var(--f-master)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.03em" } as const);
  const short = items.length <= 4; // short ranges get a lower stage: no dead space under three lines
  const title = (x: Product) => x.nameRu;
  const spec = (x: Product) => [x.format.join(" / "), x.volumes.join(" / "), x.abv ?? ""].filter(Boolean).join(" · ");
  const count = `${String(active + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

  // bring a line to the focus band (bottle wall click)
  const jump = (i: number) => {
    const row = root.current?.querySelectorAll<HTMLElement>("[data-row]")[i];
    if (!row) return;
    const y = window.matchMedia("(min-width: 1024px)").matches ? innerHeight / 2 : offset + innerHeight * 0.4 + 30;
    const top = row.getBoundingClientRect().top + window.scrollY - y + row.offsetHeight / 2;
    lenis ? lenis.scrollTo(top, { duration: 0.9 }) : window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={root}>
    {/* bottle wall: the whole range at a glance — pick a bottle, its line goes to the stage */}
    <div className="hidden border-t border-current md:block" role="group" aria-label={`${b.name}: вся линейка`}>
      <div className="flex items-end overflow-x-auto px-[calc(var(--gutter)-8px)] [scrollbar-width:none]">
        {items.map((x, i) => (
          <button key={x.slug} type="button" onClick={() => jump(i)} aria-label={title(x)} aria-pressed={i === active}
            className={`group/w relative shrink-0 px-[clamp(6px,0.9vw,14px)] pb-3 pt-5 transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-50 hover:opacity-100 focus-visible:opacity-100"}`}>
            <Pack p={x} className={`h-[clamp(84px,12vh,124px)] transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover/w:-translate-y-1.5 ${i === active ? "-translate-y-1.5" : ""}`} sizes="44px" />
            <span aria-hidden="true" className={`absolute inset-x-2 bottom-0 h-[3px] ${i === active ? "bg-current" : "bg-transparent"}`} />
          </button>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 border-t border-current lg:grid-cols-12">
      {/* stage */}
      <div className="sticky z-20 border-b border-current bg-[var(--field)] lg:static lg:z-auto lg:col-span-5 lg:border-b-0 lg:border-r" style={{ top: offset }}>
        <div className={`flex h-[40svh] overflow-hidden lg:sticky lg:top-0 lg:flex-col ${short ? "lg:h-[74svh] lg:max-h-[640px]" : "lg:h-[100svh] lg:max-h-[860px]"}`}>
          <div className={`t-tag hidden items-center justify-between px-[var(--gutter)] lg:flex ${short ? "pt-6" : "pt-20"}`}>
            <span className="t-num">{count}</span><span>{b.name}</span>
          </div>
          <div key={p.slug} className="relative w-[44%] shrink-0 lg:w-auto lg:flex-1">
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-[70%] -translate-x-1/2 animate-[planeIn_.7s_var(--ease-io)_both] lg:w-[58%]" style={{ background: flavourAccent(p.name) }} />
            <div className="absolute inset-x-0 bottom-0 top-[5%] flex justify-center animate-[packIn_.8s_var(--ease-out)_both] lg:top-[2%]">
              <Pack p={p} className="h-full" sizes="(max-width: 1024px) 40vw, 24vw" />
            </div>
          </div>
          <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-end bg-[var(--field)] p-4 lg:flex-none lg:border-t lg:border-current lg:px-[var(--gutter)] lg:py-5">
            <p className="t-tag t-num mb-auto lg:hidden">{count}</p>
            <p className="text-[clamp(24px,6.4vw,44px)] leading-[0.98] lg:text-[clamp(22px,2vw,34px)]" style={type}>{title(p)}</p>
            <p className="t-tag mt-3 opacity-80">{spec(p)}</p>
            {p.verified && <Link href={`/katalog/${p.slug}/`} className="t-tag fill-link mt-3 self-start">Подробнее →</Link>}
          </div>
        </div>
      </div>

      {/* index */}
      <ol className={`lg:col-span-7 ${short ? "lg:py-[12svh]" : "lg:py-[22svh]"}`}>
        {items.map((x, i) => {
          const on = i === active;
          const inner = (
            <>
              <span className="t-tag t-num w-6 shrink-0 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-[0.5em] text-[clamp(19px,1.9vw,30px)] leading-[1.06] transition-transform duration-500 [transition-timing-function:var(--ease-out)] lg:group-hover:translate-x-2" style={type}>
                  <Swatch color={flavourAccent(x.name)} />{title(x)}
                </span>
                <span className="t-tag mt-2 block opacity-70">{spec(x)}</span>
              </span>
              {x.verified && <span aria-hidden="true" className="sq shrink-0 self-center">→</span>}
            </>
          );
          const cls = `group flex w-full items-center gap-4 px-[var(--gutter)] py-3 text-left transition-opacity duration-500 md:py-3.5 ${on ? "opacity-100" : "opacity-35"}`;
          return (
            <li key={x.slug} data-row={i} onMouseEnter={() => setActive(i)} className="border-b border-current last:border-b-0">
              {x.verified
                ? <Link href={`/katalog/${x.slug}/`} onFocus={() => setActive(i)} className={cls}>{inner}</Link>
                : <button type="button" onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-pressed={on} className={cls}>{inner}</button>}
            </li>
          );
        })}
      </ol>
      <style>{`@keyframes planeIn{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}@keyframes packIn{from{clip-path:inset(100% 0 0 0);transform:translateY(6%)}to{clip-path:inset(0 0 0 0);transform:none}}`}</style>
    </div>
    </div>
  );
}

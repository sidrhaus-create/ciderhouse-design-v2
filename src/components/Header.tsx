"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { BRANDS, brandType } from "@/data/brands";
import { useMotion } from "@/lib/motion";

const QUICK = [["/brands/", "Бренды"], ["/katalog/", "Ассортимент"], ["/non-alcoholic/", "0%"], ["/production/", "Производство"], ["/map/", "Где купить"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { lenis } = useMotion();
  const panel = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const f = () => { const y = window.scrollY; setHidden(y > 160 && y > last); last = y; };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    open ? lenis?.stop() : lenis?.start();
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = [...panel.current.querySelectorAll<HTMLElement>("a,button")];
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); btn.current?.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); btn.current?.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, lenis]);

  const activeIdx = NAV.findIndex((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)));

  return (
    <>
      <a href="#main" className="skip-link">К содержанию</a>
      <header
        className={`field-black fixed inset-x-0 top-0 z-[90] border-b border-white/25 transition-transform duration-500 ${hidden && !open ? "-translate-y-full" : ""}`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <div className="flex h-14 items-stretch justify-between md:h-16">
          <Link href="/" className="flex items-center gap-3 pl-[var(--gutter)] pr-6" aria-label="CIDERHOUSE — на главную">
            <img src="/assets/brand/ciderhouse-logo-white.svg" alt="CIDERHOUSE" width={524} height={137} className="h-7 w-auto md:h-8" />
          </Link>
          <nav aria-label="Быстрая навигация" className="flex items-stretch">
            {QUICK.map(([href, label]) => {
              const on = pathname.startsWith(href);
              return (
                <Link key={href} href={href} aria-current={on ? "page" : undefined} className="t-tag group relative hidden items-center px-4 lg:flex xl:px-5">
                  {label}
                  <span className={`absolute inset-x-4 bottom-0 h-[3px] origin-left bg-purple transition-transform duration-500 xl:inset-x-5 ${on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} style={{ transitionTimingFunction: "var(--ease-out)" }} />
                </Link>
              );
            })}
            <button
              ref={btn}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="t-tag flex items-center gap-4 bg-purple px-[var(--gutter)] text-white transition-colors duration-300 hover:bg-white hover:text-black md:px-7"
            >
              <span>{open ? "Закрыть" : "Меню"}</span>
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Меню сайта"
        hidden={!open}
        data-lenis-prevent
        className="field-black fixed inset-0 z-[80] overflow-y-auto"
        style={{ animation: open ? "menuIn .7s var(--ease-io) both" : undefined }}
      >
        <style>{`
          @keyframes menuIn{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
          @keyframes menuItem{from{transform:translateY(110%)}to{transform:none}}
          .menu-row{background:linear-gradient(var(--ch-purple),var(--ch-purple)) 0 0/0% 100% no-repeat;transition:background-size .5s var(--ease-out)}
          .menu-row:hover,.menu-row:focus-visible{background-size:100% 100%}
        `}</style>
        <div className="grid min-h-full grid-cols-1 pt-14 md:pt-16 lg:grid-cols-12">
          <nav aria-label="Основное меню" className="lg:col-span-8 lg:border-r lg:border-white/25">
            <ul>
              {NAV.map((n, i) => {
                const active = i === activeIdx;
                return (
                  <li key={n.href} className="overflow-hidden border-b border-white/25">
                    <Link
                      href={n.href}
                      className="menu-row group flex items-center justify-between gap-4 px-[var(--gutter)] py-[min(1.5vh,14px)]"
                      aria-current={active ? "page" : undefined}
                      style={{ animation: open ? `menuItem .8s var(--ease-out) ${0.1 + i * 0.035}s both` : undefined }}
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="t-tag t-num w-6 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[clamp(28px,min(7.6vw,5.9vh),68px)] font-extrabold uppercase leading-[0.96] tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-3">{n.label}</span>
                      </span>
                      <span className="t-tag flex shrink-0 items-center gap-4 whitespace-nowrap">
                        <span className="hidden opacity-70 sm:inline">{active ? "вы здесь" : n.hint}</span>
                        <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 ${active ? "bg-purple group-hover:bg-white" : "border border-current"}`} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <aside className="flex flex-col justify-between gap-10 px-[var(--gutter)] py-8 lg:col-span-4" aria-label="Бренды">
            <div>
              <p className="t-tag mb-5 opacity-60">Бренды · {SITE.name}</p>
              <ul className="border-t border-white/25">
                {BRANDS.map((b) => (
                  <li key={b.slug} className="border-b border-white/25">
                    <Link href={`/brands/${b.slug}/`} className="group flex items-center justify-between gap-4 py-3">
                      <span className="text-[clamp(22px,2.1vw,32px)] leading-none" style={brandType(b)}>{b.name}</span>
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-voice max-w-[16ch]">Мы создаём настоящий сидр</p>
              <a href={`mailto:${SITE.wholesaleEmail}`} className="btn mt-6">Опт · {SITE.wholesaleEmail}</a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, useMotion } from "@/lib/motion";
import { brandBySlug, brandType, brandVars, siteLabel, type BrandSlug } from "@/data/brands";
import { BrandLink } from "./BrandLink";
import { PRODUCTS, productsOf } from "@/data/catalog";
import { Pack } from "./primitives";

const ORDER: BrandSlug[] = ["double-tree", "white-phoenix", "mister-bee", "zero"];
const LABEL: Partial<Record<BrandSlug, string>> = { zero: "0%" };
const P = "/assets/photography/";
const photoSet = (name: string) => ({ src: `${P}${name}-900.webp`, srcSet: `${P}${name}-900.webp 900w, ${P}${name}-1800.webp 1800w` });
const packs = (...slugs: string[]) => slugs.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

/** Official photograph as a campaign crop; the image is slightly wider than its frame so it can drift inside it. */
function Photo({ name, alt, className = "", sizes = "(max-width: 1024px) 88vw, 55vw", pos = "50% 50%" }: { name: string; alt: string; className?: string; sizes?: string; pos?: string }) {
  const set = name.startsWith("/") ? { src: `${name}-1100.webp`, srcSet: `${name}-640.webp 640w, ${name}-1100.webp 1100w` } : photoSet(name);
  return (
    <div className={`overflow-hidden ${className}`}>
      <img data-cor-photo {...set} sizes={sizes} alt={alt} loading="lazy" decoding="async" className="h-full w-[112%] max-w-none object-cover" style={{ objectPosition: pos, marginLeft: "-6%" }} />
    </div>
  );
}

/** The brand corridor: four brand worlds side by side. Desktop — vertical scroll drives the track sideways inside one pinned frame;
 *  touch layouts — a native swipe rail with scroll-snap. The index underneath always shows where you are and jumps on click. */
export function BrandCorridor() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const { lenis } = useMotion();
  const [active, setActive] = useState(0);
  const N = ORDER.length;

  // desktop: pinned horizontal journey. The pin wraps the inner frame (never the root React removes) and is reverted in a layout-effect cleanup.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      const tween = gsap.to(t, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: frame.current, start: "top top", end: () => `+=${Math.round(window.innerHeight * 0.75 * (N - 1))}`,
          pin: true, scrub: 0.6, invalidateOnRefresh: true,
          snap: { snapTo: 1 / (N - 1), duration: { min: 0.25, max: 0.6 }, delay: 0.12, ease: "power2.inOut" },
          onUpdate: (s) => setActive(Math.round(s.progress * (N - 1))),
        },
      });
      st.current = tween.scrollTrigger ?? null;
      // secondary motion only: photographs drift inside their frames, bottles counter-drift a little
      gsap.utils.toArray<HTMLElement>("[data-scene]", t).forEach((scene) => {
        const base = { containerAnimation: tween, trigger: scene, start: "left right", end: "right left", scrub: true };
        gsap.fromTo(scene.querySelectorAll("[data-cor-photo]"), { xPercent: -4 }, { xPercent: 4, ease: "none", scrollTrigger: base });
        gsap.fromTo(scene.querySelectorAll("[data-cor-packs]"), { x: 46 }, { x: -46, ease: "none", scrollTrigger: base });
      });
      return () => { st.current = null; };
    });
    return () => mm.revert();
  }, [N]);

  // touch layouts: the native rail reports the active panel
  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (window.matchMedia("(min-width: 1024px)").matches) return;
        const scenes = [...r.querySelectorAll<HTMLElement>("[data-scene]")];
        const mid = r.scrollLeft + r.clientWidth / 2;
        setActive(Math.max(0, scenes.findIndex((s) => s.offsetLeft <= mid && s.offsetLeft + s.offsetWidth > mid)));
      });
    };
    r.addEventListener("scroll", on, { passive: true });
    return () => { r.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  const jump = (i: number) => {
    const s = st.current;
    if (s) { // desktop: move the page to the scroll position of that scene
      const y = s.start + ((s.end - s.start) * i) / (N - 1);
      lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y, behavior: "smooth" });
    } else { // rail: move the rail itself
      const r = rail.current, scene = r?.querySelectorAll<HTMLElement>("[data-scene]")[i];
      if (r && scene) r.scrollTo({ left: scene.offsetLeft - (r.clientWidth - scene.offsetWidth) / 2, behavior: "smooth" });
    }
  };

  const scene = "relative shrink-0 snap-center overflow-hidden w-[88vw] lg:w-screen lg:h-full field-brand";
  const body = "relative grid h-full grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:px-[var(--gutter)] lg:pb-16 lg:pt-[88px]";
  const copyBox = "relative z-10 flex flex-col gap-4 p-5 lg:gap-5 lg:p-0";
  const nameCls = "text-[clamp(34px,5vw,88px)] leading-[0.94]";
  const packH = "h-[24svh] lg:h-[clamp(220px,42svh,400px)]";

  const Copy = ({ slug, n, children }: { slug: BrandSlug; n: number; children?: ReactNode }) => {
    const b = brandBySlug(slug)!;
    const count = productsOf(slug).length;
    return (
      <>
        <p className="t-tag flex items-center gap-3"><span className="t-num">{String(n).padStart(2, "0")} / {String(N).padStart(2, "0")}</span><span className="h-px w-8 bg-current" />{b.kind}</p>
        <h3 className={nameCls} style={brandType(b)}>{b.name}</h3>
        <p className="max-w-[34ch] text-[15px] leading-snug lg:text-[17px]">{b.line}</p>
        {children}
        <div className="mt-1 flex flex-wrap items-center gap-4">
          <BrandLink b={b} className="btn btn-solid">{b.site ? siteLabel(b) : "К бренду"}</BrandLink>
          <span className="t-tag t-num opacity-80">{String(count).padStart(2, "0")} в ассортименте</span>
        </div>
      </>
    );
  };

  const dt = brandBySlug("double-tree")!, wp = brandBySlug("white-phoenix")!, mb = brandBySlug("mister-bee")!, zero = brandBySlug("zero")!;

  return (
    <section ref={root} aria-labelledby="corridor-title" className="field-black relative overflow-hidden">
      <div className="wrap flex items-end justify-between gap-4 pb-5 pt-10 lg:hidden">
        <h2 className="t-l">Четыре мира<br />одного дома</h2>
        <p className="t-tag pb-1">листайте →</p>
      </div>
      <div ref={frame} className="relative lg:h-[100svh] lg:overflow-hidden">
        <h2 id="corridor-title" className="sr-only">Бренды CIDERHOUSE: Double Tree, White Phoenix, Mister Bee и направление 0%</h2>
        <div ref={rail} className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:h-full lg:snap-none lg:overflow-visible">
          <div ref={track} className="flex w-max gap-3 px-[6vw] lg:h-full lg:gap-0 lg:px-0">

            {/* 01 — Double Tree: dark, structural. Photograph on the left, the bottle group steps over its edge. */}
            <article data-scene className={scene} style={brandVars(dt)} aria-label="Double Tree">
              <div className={body}>
                <div className="relative h-[40svh] lg:col-span-7 lg:-ml-[var(--gutter)] lg:-mt-[88px] lg:-mb-16 lg:h-auto">
                  <Photo name="double-tree-apple-bottles-cans" alt="Double Tree: бутылки и банки яблочного сидра с зелёными яблоками" className="absolute inset-0" pos="50% 62%" />
                </div>
                <div className={`${copyBox} lg:col-span-4 lg:col-start-9 lg:justify-center lg:border-l lg:border-current lg:pl-8`}>
                  <Copy slug="double-tree" n={1} />
                </div>
                <div data-cor-packs className="pointer-events-none absolute right-3 top-[19svh] z-10 flex items-end gap-1 lg:bottom-16 lg:left-[47%] lg:right-auto lg:top-auto lg:gap-2">
                  {packs("double-tree-green-apple", "double-tree-dark-cherry", "double-tree-red-apple").map((p, i) => <Pack key={p.slug} p={p} sizes="12vw" className={i === 1 ? packH : "h-[21svh] lg:h-[clamp(190px,37svh,350px)]"} />)}
                </div>
              </div>
            </article>

            {/* 02 — White Phoenix: light paper, atmospheric. Text first, two photographs, bottles standing in front of the image. */}
            <article data-scene className={scene} style={brandVars(wp)} aria-label="White Phoenix">
              <div className={body}>
                <div className={`${copyBox} order-2 lg:order-1 lg:col-span-4 lg:justify-end lg:pb-6`}>
                  {wp.logo && <img src={wp.logo} alt="Логотип White Phoenix" className="hidden h-12 w-auto self-start lg:block" />}
                  <Copy slug="white-phoenix" n={2} />
                </div>
                <div className="relative order-1 h-[40svh] lg:order-2 lg:col-span-8 lg:h-auto">
                  <Photo name="white-phoenix-mango-citrus-fruit-bowl" alt="White Phoenix «Манго — цитрус» среди манго и цитрусов" className="absolute inset-y-0 left-0 hidden w-[44%] lg:block lg:top-[14%] lg:bottom-[20%]" sizes="26vw" />
                  <Photo name="white-phoenix-black-cherry-cocktail" alt="White Phoenix «Тёмная вишня» с коктейлем и вишней" className="absolute inset-0 lg:left-[50%] lg:-mr-[var(--gutter)] lg:-mt-[88px] lg:-mb-16" pos="50% 40%" />
                  <div data-cor-packs className="pointer-events-none absolute bottom-2 left-3 z-10 flex items-end gap-1 lg:bottom-0 lg:left-[30%] lg:gap-2">
                    {packs("white-phoenix-passionfruit-cherry", "white-phoenix-dragon-fruit-kiwi").map((p) => <Pack key={p.slug} p={p} sizes="12vw" className={packH} />)}
                  </div>
                </div>
              </div>
            </article>

            {/* 03 — Mister Bee: classic and symmetric, built from the packaging itself (no lifestyle photography exists for it). */}
            <article data-scene className={scene} style={brandVars(mb)} aria-label="Mister Bee">
              <div className={body}>
                <div className="relative order-1 h-[40svh] lg:order-2 lg:col-span-6 lg:col-start-4 lg:h-auto">
                  <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 top-[10%] lg:top-[4%]" style={{ background: mb.theme.accent }} />
                  <div aria-hidden="true" className="absolute inset-x-[12%] bottom-0 top-[10%] border border-current lg:top-[4%] lg:translate-x-3 lg:-translate-y-3" />
                  <div data-cor-packs className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center gap-2 lg:gap-4">
                    {packs("mister-bee-orange-grapefruit", "mister-bee-mandarin", "mister-bee-cherry-blossom").map((p, i) => <Pack key={p.slug} p={p} sizes="12vw" className={i === 1 ? "h-[34svh] lg:h-[clamp(260px,52svh,480px)]" : "h-[30svh] lg:h-[clamp(230px,46svh,430px)]"} />)}
                  </div>
                </div>
                <div className={`${copyBox} order-2 lg:order-1 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:justify-end lg:pb-6`}>
                  <Copy slug="mister-bee" n={3} />
                </div>
                <div className="relative z-10 order-3 hidden flex-col justify-end pb-6 text-right lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:flex">
                  <p className="t-tag">на этикетке</p>
                  <p className="mt-3 text-[clamp(20px,1.8vw,28px)] leading-[1.1]" style={brandType(mb)}>Hand crafted<br />brewed mead</p>
                </div>
              </div>
            </article>

            {/* 04 — 0%: clean and graphic. A wide studio frame, the 0% mark and the approved slogan. */}
            <article data-scene className={scene} style={brandVars(zero)} aria-label="Направление 0%">
              <div className={`${body} voice-zero`}>
                <div className="relative order-1 h-[40svh] lg:order-2 lg:col-span-8 lg:col-start-5 lg:-mr-[var(--gutter)] lg:-mt-[88px] lg:h-[62svh]">
                  <Photo name="/assets/zero/still-trio" alt="Студийная съёмка: три бутылки ZER° CIDER 0,0%" className="absolute inset-0" sizes="(max-width: 1024px) 88vw, 66vw" />
                </div>
                <div className={`${copyBox} order-2 lg:order-1 lg:col-span-4 lg:row-span-2 lg:justify-center`}>
                  <Copy slug="zero" n={4}>
                    <p className="max-w-[20ch] text-[clamp(17px,1.5vw,22px)] font-light italic leading-snug text-purple" style={{ fontFamily: "var(--f-master)" }}>Свобода выбирать вкус, а не градусы</p>
                  </Copy>
                </div>
                <div className="relative order-3 hidden items-center gap-6 lg:col-span-8 lg:col-start-5 lg:flex">
                  <img src="/assets/brand/zero-percent-480.webp" alt="Знак 0% безалкогольной линейки" width={480} height={480} loading="lazy" className="h-[clamp(90px,16svh,150px)] w-auto" />
                  <ul className="flex flex-wrap gap-2">
                    {productsOf("zero").map((p) => <li key={p.slug}><Link href={`/katalog/${p.slug}/`} className="chip transition-colors duration-300 hover:bg-black hover:text-white">{p.nameRu} · {p.abv}</Link></li>)}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* persistent index: where you are, and a way to jump */}
        <nav aria-label="Бренды" className="relative z-20 flex items-stretch field-black border-t border-current/25 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-12">
          <span className="t-tag hidden items-center px-[var(--gutter)] opacity-60 lg:flex">Бренды дома</span>
          <ol className="flex flex-1 items-stretch overflow-x-auto [scrollbar-width:none]">
            {ORDER.map((slug, i) => {
              const on = i === active;
              return (
                <li key={slug} className="flex flex-1 items-stretch">
                  <button type="button" onClick={() => jump(i)} aria-current={on ? "true" : undefined} className={`t-tag relative flex w-full items-center gap-2 whitespace-nowrap border-l border-current/25 px-3 py-3.5 text-left transition-opacity duration-300 lg:px-5 ${on ? "opacity-100" : "opacity-55 hover:opacity-100"}`}>
                    <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="hidden sm:inline">{LABEL[slug] ?? brandBySlug(slug)!.name}</span>
                    <span className="sm:hidden">{LABEL[slug] ?? brandBySlug(slug)!.name.split(" ")[0]}</span>
                    <span aria-hidden="true" className={`absolute inset-x-0 top-[-1px] h-[3px] origin-left bg-purple transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`} style={{ transitionTimingFunction: "var(--ease-out)" }} />
                  </button>
                </li>
              );
            })}
          </ol>
          <Link href="/brands/" className="t-tag hidden items-center border-l border-current/25 px-[var(--gutter)] transition-colors duration-300 hover:bg-[var(--on)] hover:text-[var(--field)] lg:flex">Все бренды →</Link>
        </nav>
      </div>
    </section>
  );
}

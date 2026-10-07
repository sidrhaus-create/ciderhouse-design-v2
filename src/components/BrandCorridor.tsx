"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, useMotion } from "@/lib/motion";
import { brandBySlug, brandType, brandVars, siteLabel, type BrandSlug } from "@/data/brands";
import { BrandLink } from "./BrandLink";
import { Formats } from "./Formats";
import { BRAND_FORMATS } from "@/data/formats";
import { productsOf, partyLine, mainLine } from "@/data/catalog";
import { FlavourLegend, RangeStrip } from "./primitives";
import { flavourAccent } from "@/lib/flavour";
import { StudioImg } from "./Studio";
import type { ShotKey } from "@/data/photos";

const ORDER: BrandSlug[] = ["double-tree", "white-phoenix", "mister-bee", "zero"];
const LABEL: Partial<Record<BrandSlug, string>> = { zero: "0%" };
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
      // secondary motion only: photographs drift inside their frames
      gsap.utils.toArray<HTMLElement>("[data-scene]", t).forEach((scene) => {
        const base = { containerAnimation: tween, trigger: scene, start: "left right", end: "right left", scrub: true };
        gsap.fromTo(scene.querySelectorAll("[data-cor-photo]"), { xPercent: -2 }, { xPercent: 2, ease: "none", scrollTrigger: base });
      });
      return () => { st.current = null; };
    });
    return () => mm.revert();
  }, [N]);

  // tablet / phone: the cards stack; the index below reports which card is nearest the middle of the screen
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
        const mid = window.innerHeight / 2;
        const i = scenes.findIndex((s) => { const b = s.getBoundingClientRect(); return b.top <= mid && b.bottom > mid; });
        if (i >= 0) setActive(i);
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  const jump = (i: number) => {
    const s = st.current;
    if (s) { // desktop: move the page to the scroll position of that scene
      const y = s.start + ((s.end - s.start) * i) / (N - 1);
      lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y, behavior: "smooth" });
    } else { // stacked: scroll the page to that card
      const scene = rail.current?.querySelectorAll<HTMLElement>("[data-scene]")[i];
      scene?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ── One construction for every brand card ───────────────────────────────────────────────────────────────────
     Desktop (≥1024): a 12-column scene, 100vh, moved sideways by the scroll. Columns 1–4: the copy, centred against the
     photograph (index · mark · name · line · formats · range · action). Columns 5–12: one photograph bleeding to the right
     and bottom edges. Tablet (768–1023): the same two columns, stacked as full-width cards, the photo a 4:5 frame.
     Phone: the photograph above (4:5), the copy below. Brand colours and faces differ; the construction does not. */
  const scene = "relative w-full overflow-hidden field-brand lg:h-full lg:w-screen lg:shrink-0";
  const body = "relative grid grid-cols-1 md:grid-cols-12 md:items-center lg:h-full lg:gap-x-8 lg:px-[var(--gutter)] lg:pb-[64px] lg:pt-[88px]";
  const copyBox = "relative z-10 order-2 flex flex-col gap-4 px-[var(--gutter)] py-7 md:order-1 md:col-span-5 md:py-10 lg:col-span-4 lg:gap-5 lg:px-0 lg:py-0";
  const photoBox = "relative order-1 aspect-[4/5] w-full overflow-hidden md:order-2 md:col-span-7 md:self-stretch md:aspect-auto md:min-h-[520px] lg:col-span-8 lg:col-start-5 lg:min-h-0 lg:-mr-[var(--gutter)] [@media(min-width:1024px)_and_(max-height:820px)]:col-span-7 [@media(min-width:1024px)_and_(max-height:820px)]:col-start-6";
  const nameCls = "text-[clamp(30px,4.2vw,76px)] leading-[0.94]";

  const plural = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "вкус" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "вкуса" : "вкусов");

  /** The copy of a card, in one rhythm: index · mark · name · line · formats · range · action. */
  const Copy = ({ slug, n, lockup, mark, range, children }: { slug: BrandSlug; n: number; lockup?: { src: string; w: number; h: number; cls: string }; mark?: ReactNode; range?: ReactNode; children?: ReactNode }) => {
    const b = brandBySlug(slug)!;
    const items = productsOf(slug);
    const count = items.length;
    return (
      <>
        <p className="t-tag flex items-center gap-3"><span className="t-num">{String(n).padStart(2, "0")} / {String(N).padStart(2, "0")}</span><span className="h-px w-8 bg-current" />{b.kind}</p>
        {mark}
        {lockup
          ? <h3 className="pt-1"><img src={lockup.src} alt={b.name} width={lockup.w} height={lockup.h} loading="lazy" className={`w-auto ${lockup.cls}`} /></h3>
          : <h3 className={nameCls} style={brandType(b)}>{b.name}</h3>}
        <p className="max-w-[34ch] text-[15px] leading-snug lg:text-[17px]">{b.line}</p>
        {children}
        {BRAND_FORMATS[slug] && <Formats ids={BRAND_FORMATS[slug]!} strong="keg" label={`${String(count).padStart(2, "0")} ${plural(count)}`} className="mt-1" />}
        {range ?? <RangeStrip products={b.subline ? mainLine(items) : items} href={b.site ? undefined : `/brands/${slug}/`} className="mt-2" />}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <BrandLink b={b} className="btn btn-solid">{b.site ? siteLabel(b) : "К бренду"}</BrandLink>
          {b.subline && <span className="chip">+ {b.subline.name} · {partyLine(items).length}</span>}
        </div>
      </>
    );
  };

  /** The photograph of a card. `zoom` enlarges the subject inside the frame (crops only the studio plane around it). */
  const Picture = ({ k, caption, pos = "50% 50%", zoom = 1, sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 58vw, 62vw" }: { k: ShotKey; caption: string; pos?: string; zoom?: number; sizes?: string }) => (
    <div className={photoBox}>
      <StudioImg k={k} sizes={sizes} pos={pos} decorative className="absolute inset-0 h-full w-full object-cover" data-cor-photo="" style={{ objectPosition: pos, transform: `scale(${zoom})` }} />
      <p className="t-tag absolute bottom-0 left-0 z-10 max-w-[82%] bg-[var(--ch-ink)] px-4 py-2.5 text-[var(--ch-paper)]">{caption}</p>
    </div>
  );

  const dt = brandBySlug("double-tree")!, wp = brandBySlug("white-phoenix")!, mb = brandBySlug("mister-bee")!, zero = brandBySlug("zero")!;
  const zeroLegend = (
    <FlavourLegend
      className="mt-2 w-full max-w-[440px] md:max-lg:grid-cols-1!"
      items={productsOf("zero").map((p) => ({ id: p.slug, name: p.nameRu, sub: p.character, color: flavourAccent(p.name), href: `/katalog/${p.slug}/` }))}
    />
  );

  return (
    <section ref={root} aria-labelledby="corridor-title" className="field-black relative overflow-hidden">
      <div className="wrap flex items-end justify-between gap-4 pb-6 pt-12 lg:hidden">
        <h2 className="t-l">Четыре мира<br />одного дома</h2>
        <p className="t-tag pb-1">{N} бренда</p>
      </div>
      <div ref={frame} className="relative lg:h-[100svh] lg:overflow-hidden">
        <h2 id="corridor-title" className="sr-only">Бренды CIDERHOUSE: Double Tree, White Phoenix, Mister Bee и направление 0%</h2>
        <div ref={rail} className="lg:h-full">
          <div ref={track} className="flex flex-col gap-3 lg:h-full lg:w-max lg:flex-row lg:gap-0">

            {/* 01 — Double Tree: the 0,75 l line on the master purple */}
            <article data-scene className={scene} style={brandVars(dt)} aria-label="Double Tree">
              <div className={body}>
                <div className={copyBox}>
                  <Copy slug="double-tree" n={1} mark={dt.logo && <img src={dt.logo} alt="" width={120} height={40} loading="lazy" className="h-9 w-auto self-start" />} />
                </div>
                <Picture k="dt-075-standing-purple" caption="Бутылки 0,75 л · яблоко, груша, гранат, вишня" pos="50% 54%" zoom={1.08} />
              </div>
            </article>

            {/* 02 — White Phoenix: four flavours on white, label paper behind the copy */}
            <article data-scene className={scene} style={brandVars(wp)} aria-label="White Phoenix">
              <div className={body}>
                <div className={copyBox}>
                  <Copy slug="white-phoenix" n={2} mark={wp.logo && <img src={wp.logo} alt="" width={160} height={48} loading="lazy" className="h-10 w-auto self-start" />} />
                </div>
                <Picture k="wp-four-white" caption="Помело — ананас · чёрная вишня · горький лимон · кокос — цитрус" pos="50% 4%" />
              </div>
            </article>

            {/* 03 — Mister Bee: the honey line; the range strip shows the line is wider than three */}
            <article data-scene className={scene} style={brandVars(mb)} aria-label="Mister Bee">
              <div className={body}>
                <div className={copyBox}>
                  <Copy slug="mister-bee" n={3} />
                </div>
                <Picture k="mb-trio-beige-wide" caption="Клюква · классик · лимон · медовуха 0,45 л" pos="50% 58%" zoom={1.06} />
              </div>
            </article>

            {/* 04 — 0%: the official ZER° CIDER lockup in place of a typeset name; the three flavours named in Russian */}
            <article data-scene className={scene} style={brandVars(zero)} aria-label="Направление 0%">
              <div className={`${body} voice-zero`}>
                <div className={copyBox}>
                  <Copy slug="zero" n={4} lockup={{ src: zero.logo!, w: 373, h: 105, cls: "h-[clamp(40px,4.2vw,72px)]" }} range={zeroLegend}>
                    <p className="max-w-[22ch] text-[clamp(17px,1.5vw,22px)] font-light italic leading-snug text-purple" style={{ fontFamily: "var(--f-master)" }}>Свобода выбирать вкус, а не градусы</p>
                  </Copy>
                </div>
                <Picture k="zero-trio-fruit-sage" caption="Безалкогольный сидр 0,0 % · три вкуса" pos="50% 50%" zoom={1.06} />
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

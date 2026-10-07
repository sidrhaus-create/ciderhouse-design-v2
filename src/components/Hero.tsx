"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { onHouseEnter } from "./Threshold";
import { Bottle, FlavourLegend } from "./primitives";
import { PhoenixMark } from "./HeroLogo";
import { BRANDS } from "@/data/brands";
import { VERIFIED } from "@/data/catalog";
import { flavourAccent } from "@/lib/flavour";

/** The opening: one poster in two masses of equal height. Left — the editorial column (kicker, headline, lead, actions, and the
 *  house index on its last line); right — the ZER° still life on the purple plane with its legend on the same last line.
 *  Both columns are --hero-h tall and share one baseline, so the composition reads as one object, not two. The phoenix is a quiet
 *  mark bridging the gap. Reveal: phoenix → copy → plane → bottles. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // the finished composition is the markup itself
    const q = gsap.utils.selector(el);
    const phone = !window.matchMedia("(min-width: 768px)").matches;

    gsap.set(q("[data-h='phoenix']"), { opacity: 0, y: 48, scale: 1.06, transformOrigin: "50% 100%", clipPath: "inset(100% 0 0 0)" });
    gsap.set(q("[data-h='plane']"), { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(q("[data-h='bottle']"), { yPercent: 112 });
    gsap.set(q("[data-h='fade']"), { opacity: 0, y: 14 });

    let ctx: gsap.Context | undefined;
    const off = onHouseEnter(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.timeScale(phone ? 1.6 : 1);
        tl.to(q("[data-h='phoenix']"), { opacity: 0.08, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "power3.inOut" }, 0)
          .to(q("[data-h='fade']"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.6)
          .to(q("[data-h='plane']"), { scaleY: 1, duration: 0.9, ease: "power4.inOut" }, 0.8)
          .to(q("[data-h='bottle']"), { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.08 }, 0.95);

        // scroll: the plane widens into a field, the bottles grow a little, the mark drifts slower than the page
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.4 };
        tl.add(() => {
          const plane = el.querySelector<HTMLElement>("[data-h='plane']")!;
          gsap.to(plane, { scaleX: () => (innerWidth / plane.offsetWidth) * 1.3, ease: "none", scrollTrigger: { ...st, invalidateOnRefresh: true } });
          gsap.to(q("[data-h='trio']"), { scale: 1.1, yPercent: -4, transformOrigin: "50% 100%", ease: "none", scrollTrigger: st });
          gsap.to(q("[data-h='phoenix']"), { yPercent: 22, ease: "none", scrollTrigger: st });
        });
      }, el);
    });

    // fine pointers: the still life drifts along one axis, very little
    const fine = window.matchMedia("(pointer: fine)").matches;
    const stage = el.querySelector<HTMLElement>("[data-h='stage']");
    const xTo = stage && gsap.quickTo(stage, "x", { duration: 0.9, ease: "power3" });
    const move = (e: PointerEvent) => xTo?.((e.clientX / innerWidth - 0.5) * -16);
    if (fine) window.addEventListener("pointermove", move, { passive: true });

    // the left column's rhythm: one gap, measured so that the headline starts exactly at the top of the purple plane and the
    // index ends on the legend's baseline — kicker · headline · lead · actions · index, evenly spaced
    const col = el.querySelector<HTMLElement>("[data-h='col']")!;
    const planeBox = el.querySelector<HTMLElement>("[data-h='planebox']")!;
    const rhythm = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) { col.style.removeProperty("--g"); return; }
      const items = Array.from(col.querySelectorAll<HTMLElement>("[data-h='fade']")).slice(1); // headline … index
      const used = items.reduce((a, n) => a + n.offsetHeight, 0);
      const span = col.getBoundingClientRect().height - (planeBox.getBoundingClientRect().top - col.getBoundingClientRect().top);
      col.style.setProperty("--g", `${Math.max(16, (span - used) / (items.length - 1))}px`);
    };
    const ro = new ResizeObserver(rhythm);
    ro.observe(el); ro.observe(col);
    rhythm();

    return () => { off(); ctx?.revert(); ro.disconnect(); window.removeEventListener("pointermove", move); ScrollTrigger.refresh(); };
  }, []);

  const order = ["zero-cherry", "zero-green-apple", "zero-pomegranate-raspberry"].map((s) => VERIFIED.find((p) => p.slug === s)!);
  const legend = order.map((p) => ({ id: p.slug, name: p.nameRu, color: flavourAccent(p.name), href: `/katalog/${p.slug}/` }));

  return (
    <section
      ref={root}
      className="field-white relative isolate flex flex-col overflow-hidden [--hero-h:clamp(300px,52svh,460px)] md:[--hero-h:clamp(340px,46svh,470px)] lg:[--hero-h:clamp(460px,66svh,780px)]"
      aria-labelledby="hero-title"
    >
      <div className="wrap relative grid flex-1 grid-cols-1 gap-x-8 gap-y-8 pb-10 pt-[88px] md:grid-cols-12 md:gap-y-5 md:pb-[clamp(36px,5svh,64px)] md:pt-[calc(64px+clamp(16px,2.5svh,32px))]">
        {/* the phoenix: a translucent brand mark between the copy and the still life, spanning the gap */}
        <div data-h="phoenix" aria-hidden="true" className="pointer-events-none absolute left-[-6%] top-[72px] z-0 h-[calc(var(--hero-h)*0.7)] text-purple [opacity:0.08] md:left-[33%] md:top-[calc(50%-var(--hero-h)*0.56)] md:h-[calc(var(--hero-h)*1.02)]">
          <PhoenixMark className="block h-full w-auto" />
        </div>

        {/* LEFT — the editorial column, exactly as tall as the still life. One even rhythm from the kicker to the index, anchored
            to the bottom so the index shares the legend's baseline and the headline sits level with the top of the purple plane */}
        <div data-h="col" className="relative z-10 flex flex-col gap-6 md:col-span-5 md:justify-end md:gap-[var(--g,clamp(22px,5.5svh,64px))] md:self-stretch">
          <p data-h="fade" className="t-tag flex items-center gap-3"><span className="t-num">01</span><span className="inline-block h-px w-8 bg-current" />Дом</p>
          <h1 id="hero-title" data-h="fade" className="text-[clamp(34px,4.1vw,70px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            <span className="sr-only">CIDERHOUSE — </span>Мы создаём<br />настоящий сидр
          </h1>
          <p data-h="fade" className="max-w-[34ch] text-[clamp(16px,1.2vw,19px)] leading-[1.5]">
            White Phoenix, Mister Bee, Double Tree и направление 0% — четыре характера в одном доме. Сидр и медовуха собственного производства.
          </p>
          <div data-h="fade" className="flex flex-wrap">
            <Link href="/katalog/" className="btn btn-solid">Ассортимент</Link>
            <Link href="/brands/" className="btn -ml-px bg-white">Бренды</Link>
          </div>
          {/* the house index — the left column's last line; its baseline is the legend's baseline on the right */}
          <ol data-h="fade" className="hidden min-h-[52px] flex-wrap items-center gap-x-6 gap-y-1 border-t border-current md:flex" aria-label="Бренды дома">
            {BRANDS.map((b, i) => (
              <li key={b.slug} className="flex items-center gap-2 whitespace-nowrap text-[12.5px] font-semibold tracking-[-0.01em]"><span className="t-num text-[10px] opacity-50">{String(i + 1).padStart(2, "0")}</span>{b.slug === "zero" ? "ZER° 0%" : b.name}</li>
            ))}
          </ol>
        </div>

        {/* RIGHT — the still life: a large plane behind the bottles, the legend as its last line */}
        <div className="relative z-10 flex flex-col md:col-span-7">
          <div className="relative h-[var(--hero-h)]">
            <div data-h="planebox" aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] bottom-0 h-[calc(var(--hero-h)*0.7)] md:inset-x-auto md:left-1/2 md:w-[min(100%,46vw)] md:-translate-x-1/2">
              <div data-h="plane" className="h-full w-full bg-purple" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
              <div data-h="stage">
                <div data-h="trio" className="flex translate-y-[5%] items-end justify-center gap-[clamp(10px,1.6vw,28px)]">
                  {order.map((p, i) => (
                    <div key={p.slug} data-h="bottle" className={i === 1 ? "z-10" : "translate-y-[3%]"}>
                      <Bottle base={p.image!} alt="" priority sizes="(max-width: 768px) 26vw, 15vw" className={i === 1 ? "h-[calc(var(--hero-h)*0.98)]" : "h-[calc(var(--hero-h)*0.9)]"} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div data-h="fade" className="relative z-20 mt-4 md:mx-auto md:w-[min(100%,46vw)] md:mt-3">
            <FlavourLegend
              tone="plate"
              items={legend}
              note="0,0 %"
              brand={<img src="/assets/brand/zerocider-logo.svg" alt="ZER° CIDER" width={374} height={112} className="h-6 w-auto md:h-7" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

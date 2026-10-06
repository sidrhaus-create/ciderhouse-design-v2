"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { onHouseEnter } from "./Threshold";
import { Bottle, Fit, Plate, Swatch } from "./primitives";
import { VERIFIED } from "@/data/catalog";
import { flavourAccent } from "@/lib/flavour";

const chars = (w: string) => w.split("").map((c, i) => <span key={i} data-h="ch" className="inline-block">{c}</span>);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(el);
    if (reduced) return;

    gsap.set(q("[data-h='ch']"), { yPercent: 115 });
    gsap.set(q("[data-h='plane']"), { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(q("[data-h='bottle']"), { yPercent: 112 });
    gsap.set(q("[data-h='pop']"), { clipPath: "inset(0 100% 0 0)" });
    gsap.set(q("[data-h='fade']"), { opacity: 0, y: 14 });

    let ctx: gsap.Context | undefined;
    const off = onHouseEnter(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(q("[data-h='ch']"), { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.035 })
          .to(q("[data-h='plane']"), { scaleY: 1, duration: 1, ease: "power4.inOut" }, 0.1)
          .to(q("[data-h='bottle']"), { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.09 }, 0.45)
          .to(q("[data-h='pop']"), { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power4.inOut", stagger: 0.07 }, 0.9)
          .to(q("[data-h='fade']"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, 0.9);

        // scroll: the purple plane widens into a full-bleed field, the bottles scale up, the wordmark sinks behind them
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.4 };
        tl.add(() => {
          const plane = el.querySelector<HTMLElement>("[data-h='plane']")!;
          gsap.to(plane, { scaleX: () => (innerWidth / plane.offsetWidth) * 1.3, ease: "none", scrollTrigger: { ...st, invalidateOnRefresh: true } });
          gsap.to(q("[data-h='trio']"), { scale: 1.12, yPercent: -4, transformOrigin: "50% 100%", ease: "none", scrollTrigger: st });
          gsap.to(q("[data-h='word']"), { yPercent: 26, ease: "none", scrollTrigger: st });
          q("[data-par]").forEach((p) => gsap.to(p, { y: () => -Number((p as HTMLElement).dataset.par) * innerHeight * 0.45, ease: "none", scrollTrigger: st }));
        });
      }, el);
    });

    // pointer moves the still life along one axis only
    const fine = window.matchMedia("(pointer: fine)").matches;
    const stage = el.querySelector<HTMLElement>("[data-h='stage']");
    const xTo = stage && gsap.quickTo(stage, "x", { duration: 0.9, ease: "power3" });
    const move = (e: PointerEvent) => xTo?.((e.clientX / innerWidth - 0.5) * -24);
    if (fine) window.addEventListener("pointermove", move, { passive: true });

    return () => { off(); ctx?.revert(); window.removeEventListener("pointermove", move); ScrollTrigger.refresh(); };
  }, []);

  const order = ["zero-cherry", "zero-green-apple", "zero-pomegranate-raspberry"].map((s) => VERIFIED.find((p) => p.slug === s)!);

  return (
    <section ref={root} className="field-white relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      <div className="wrap pt-[72px] md:pt-[84px]" data-h="fade">
        <div className="flex items-center justify-between border-b border-current pb-3">
          <p className="t-tag">Производитель сидра и медовухи</p>
          <p className="t-tag hidden md:block">4 бренда · сидр, медовуха и 0%</p>
        </div>
      </div>

      {/* the plane: one purple rectangle the still life stands on */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[52svh] w-[84vw] -translate-x-1/2 md:left-[60%] md:h-[52svh] md:w-[33vw]">
        <div data-h="plane" className="h-full w-full bg-purple" />
      </div>

      <h1 id="hero-title" data-h="word" className="wrap relative z-10 mt-4 md:mt-5">
        <span className="sr-only">CIDERHOUSE — мы создаём настоящий сидр</span>
        <span aria-hidden="true" className="hidden md:block"><Fit reveal={false} className="font-black">{chars("CIDERHOUSE")}</Fit></span>
        <span aria-hidden="true" className="md:hidden"><Fit reveal={false} className="font-black">{chars("CIDER")}</Fit><Fit reveal={false} className="font-black">{chars("HOUSE")}</Fit></span>
      </h1>

      {/* the still life: original photography of the ZER° trio, upright, on the plane */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center md:inset-x-auto md:left-[60%] md:-translate-x-1/2">
        <div data-h="stage">
          <div data-h="trio" className="flex translate-y-[6%] items-end justify-center gap-[1.2svh] md:gap-[2.4svh]">
            {order.map((p, i) => (
              <div key={p.slug} data-h="bottle" className={i === 1 ? "z-10" : "translate-y-[3%]"}>
                <Bottle base={p.image!} alt="" priority sizes="(max-width: 768px) 30vw, 16vw" className={i === 1 ? "h-[46svh] md:h-[68svh]" : "h-[42svh] md:h-[62svh]"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* plates — strict labels on the grid */}
      <div className="absolute inset-0 z-30 [&>*]:absolute [&>*]:pointer-events-none [&_.plate]:pointer-events-auto">
        <div data-par="0.5" className="right-[var(--gutter)] top-[46%] md:top-[42%]">
          <div data-h="pop"><Plate bg="var(--ch-paper)" line="var(--ch-ink)" className="px-4 py-3"><img src="/assets/brand/zero-lockup-purple.svg" alt="ZER° CIDER" width={373} height={105} className="h-[clamp(26px,2.6vw,40px)] w-auto" /></Plate></div>
        </div>
        <div data-par="0.8" className="left-[var(--gutter)] top-[44%] md:hidden">
          <div data-h="pop"><Plate bg="var(--ch-paper)" line="var(--ch-ink)" className="text-[15px]">сидр &amp; медовуха</Plate></div>
        </div>
        {/* flavour plates: one ruled column on the right edge, aligned to the grid */}
        {order.map((p, i) => (
          <div key={p.slug} data-par={[0.3, 0.45, 0.6][i]} className={["top-[60%]", "top-[calc(60%+46px)]", "top-[calc(60%+92px)]"][i] + " right-[var(--gutter)] hidden md:block"}>
            <div data-h="pop">
              <Plate bg="var(--ch-paper)" line="var(--ch-ink)" className="w-[clamp(180px,15vw,230px)] justify-start gap-[0.6em] text-[clamp(12px,1vw,15px)]"><Swatch color={flavourAccent(p.name)} />{p.nameRu}</Plate>
            </div>
          </div>
        ))}
      </div>

      {/* editorial column: everything a visitor needs sits left of the still life, above the fold */}
      <div className="wrap relative z-30 mt-auto pb-5 md:pb-9">
        <div className="flex flex-col items-center gap-4 md:max-w-[30vw] md:items-start md:gap-5">
          <p data-h="fade" className="t-tag hidden md:block">01 <span className="mx-2 inline-block h-px w-8 bg-current align-middle" /> Дом</p>
          <p data-h="fade" className="hidden text-[clamp(26px,2.6vw,44px)] font-light italic leading-[1.05] tracking-[-0.02em] md:block">Мы создаём<br />настоящий сидр</p>
          <p data-h="fade" className="hidden max-w-[34ch] text-[15px] leading-snug md:block">
            White Phoenix, Mister Bee, Double Tree и направление 0% — в одном доме.
          </p>
          <div data-h="fade" className="flex gap-0">
            <Link href="/katalog/" className="btn btn-solid">Ассортимент</Link>
            <Link href="/brands/" className="btn -ml-px bg-white">Бренды</Link>
          </div>
        </div>
      </div>
      <p data-h="fade" className="t-tag absolute bottom-0 left-1/2 z-30 hidden -translate-x-1/2 whitespace-nowrap bg-black px-3 py-1.5 text-white md:left-[60%] xl:block">
        На фото: ZER° CIDER 0,0% — вишня · зелёное яблоко · гранат — малина
      </p>
    </section>
  );
}

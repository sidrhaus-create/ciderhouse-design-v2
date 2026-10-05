"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/motion";
import { VERIFIED } from "@/data/catalog";
import { flavourAccent } from "@/lib/flavour";
import { Bottle } from "./primitives";

const ORDER = ["zero-cherry", "zero-green-apple", "zero-pomegranate-raspberry"];
const FIELD = ["field-white", "field-purple", "field-black"];

/** One pinned full-screen scene: three master planes wipe across, each flavour name travels behind a bottle
 *  that is taller than the viewport and passes through the frame — products as objects, not thumbnails. */
export function BottleScene() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const beats = ORDER.map((s) => VERIFIED.find((p) => p.slug === s)!);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current!;
    const ctx = gsap.context(() => {
      const planes = gsap.utils.toArray<HTMLElement>("[data-plane]", el);
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);
      const bottles = gsap.utils.toArray<HTMLElement>("[data-bottle]", el);
      // Pin the inner frame, never the component's root: ScrollTrigger re-parents a pinned node into a .pin-spacer,
      // and React must still find the root where it rendered it when the route changes (otherwise removeChild throws).
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: frame.current, start: "top top", end: "+=240%", pin: true, scrub: 0.5 } });
      beats.forEach((_, i) => {
        if (i > 0) tl.fromTo(planes[i], { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.34, ease: "power2.inOut" }, i - 0.17);
        tl.fromTo(words[i], { xPercent: 22 }, { xPercent: -42, duration: 1.3 }, i - 0.15);
        // every bottle is centred and travels its own full height: entrances overlap exits, so the frame is never empty
        const last = i === beats.length - 1;
        tl.fromTo(bottles[i], { xPercent: -50, yPercent: i === 0 ? -45 : 50 }, { xPercent: -50, yPercent: last ? -54 : -150, duration: i === 0 ? 1.15 : last ? 1.25 : 1.8 }, i === 0 ? 0 : i - 0.65);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="Линейка ZER° CIDER 0,0% — три вкуса" className="relative">
      <div ref={frame} className="relative h-[100svh] overflow-hidden">
      {beats.map((p, i) => (
        <div key={p.slug} data-plane className={`${FIELD[i]} absolute inset-0 overflow-hidden`} style={{ zIndex: i }}>
          <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-[34vw] -translate-x-1/2 md:w-[22vw]" style={{ background: flavourAccent(p.name) }} />
          <p data-word aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap pl-[4vw] text-[30vw] font-black uppercase leading-none tracking-[-0.05em] md:text-[19vw]">{p.nameRu}</p>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-current px-[var(--gutter)] py-4 md:py-5">
            <p className="t-tag"><span className="t-num mr-3">{String(i + 1).padStart(2, "0")} / 03</span>{p.character} · {p.abv}</p>
            <Link href={`/katalog/${p.slug}/`} className="t-tag fill-link">{p.nameRu} →</Link>
          </div>
        </div>
      ))}
      {/* bottles ride above every plane, so they cross the wipes */}
      {beats.map((p, i) => (
        <div key={p.slug} data-bottle aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2" style={{ zIndex: 10 + i, transform: "translate(-50%, -50%)" }}>
          {/* taller than the viewport on purpose, but never wider than the label needs to stay readable */}
          <Bottle base={p.image!} alt="" sizes="(max-width: 768px) 70vw, 36vw" priority={i === 0} className="h-[min(118svh,240vw)]" />
        </div>
      ))}
      </div>
    </section>
  );
}

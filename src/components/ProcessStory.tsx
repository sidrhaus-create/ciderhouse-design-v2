"use client";
import { useRef, useState } from "react";
import { PROCESS } from "@/data/site";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/motion";
import { ProcessArt } from "./ProcessArt";

/** The full production story: one continuous narrative. Desktop — a sticky drawing board on the left redraws itself for the stage
 *  you are reading, and a liquid line climbs with the scroll; touch layouts — the same stages as a plain vertical sequence, each
 *  drawing once when it enters the screen.
 *  Motion: ScrollTriggers created inside one gsap.context and reverted on unmount. No pinning and no DOM re-parenting — the board is
 *  `position: sticky`, GSAP only scrubs a transform and toggles state, React owns every node.
 *  With reduced motion every illustration is shown complete and every stage stays fully readable (globals.css). */
export function ProcessStory() {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const N = PROCESS.length;

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // the stage crossing the middle of the screen is the one on the board
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s, i) => {
        ScrollTrigger.create({ trigger: s, start: "top center", end: "bottom center", onToggle: (t) => { if (t.isActive) setActive(i); } });
      });
      // the liquid line fills as the story advances
      if (fill.current && list.current) {
        gsap.fromTo(fill.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: list.current, start: "top center", end: "bottom center", scrub: 0.4 } });
      }
      // inline illustrations (touch layouts) draw once when they scroll in
      gsap.utils.toArray<SVGElement>("[data-step] [data-art]").forEach((a) => {
        ScrollTrigger.create({ trigger: a, start: "top 82%", once: true, onEnter: () => a.classList.add("is-on") });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const s = PROCESS[active];

  return (
    <div ref={root} className="grid grid-cols-1 border-t border-current lg:grid-cols-12">
      {/* drawing board */}
      <div className="hidden lg:col-span-6 lg:block lg:border-r lg:border-current">
        <div className="sticky top-0 flex h-[100svh] max-h-[820px] flex-col">
          <div className="t-tag flex items-center justify-between px-[var(--gutter)] pt-20">
            <span className="t-num">{s.n} / {String(N).padStart(2, "0")}</span>
            <span>Технологическая схема</span>
          </div>
          <div className="relative flex-1">
            {/* blueprint grid */}
            <div aria-hidden="true" className="absolute inset-6 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
            <span aria-hidden="true" className="t-num absolute right-[var(--gutter)] top-2 text-[clamp(90px,11vw,170px)] font-black leading-none tracking-[-0.06em] opacity-[0.08]">{s.n}</span>
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}>
                <ProcessArt i={i} on={i === active} className="h-[min(56svh,440px)] w-auto" />
              </div>
            ))}
            {/* the liquid line */}
            <span aria-hidden="true" className="absolute bottom-6 left-[var(--gutter)] top-6 w-px bg-current opacity-25" />
            <span ref={fill} aria-hidden="true" className="absolute bottom-6 left-[calc(var(--gutter)-1px)] top-6 w-[3px] origin-top bg-purple" style={{ transform: "scaleY(0)" }} />
          </div>
          <div className="border-t border-current px-[var(--gutter)] py-5">
            <p className="text-[clamp(20px,1.9vw,30px)] font-extrabold uppercase leading-[1.04] tracking-[-0.03em]">{s.title}</p>
            <ol className="mt-4 flex gap-1.5" aria-hidden="true">
              {PROCESS.map((p, i) => (
                <li key={p.n} className="flex-1">
                  <span className={`block h-[3px] transition-colors duration-500 ${i <= active ? "bg-purple" : "bg-current opacity-20"}`} />
                  <span className={`t-tag t-num mt-2 block transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}>{p.n}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* the story */}
      <ol ref={list} className="lg:col-span-6 lg:py-[20svh]">
        {PROCESS.map((p, i) => {
          const on = i === active;
          return (
            <li key={p.n} data-step className={`flex gap-4 border-b border-current px-[var(--gutter)] py-7 transition-opacity duration-500 last:border-b-0 lg:min-h-[38svh] lg:items-center lg:py-10 ${on ? "opacity-100" : "lg:opacity-30"}`}>
              <ProcessArt i={i} className="h-20 w-20 shrink-0 sm:h-28 sm:w-28 lg:hidden" />
              <div className="min-w-0">
                <p className="t-tag flex items-center gap-3"><span className="t-num text-purple">{p.n}</span><span className="h-px w-8 bg-current" />{p.glyph && <span className="chip">{p.glyph}</span>}</p>
                <h3 className="mt-3 text-[clamp(19px,2.4vw,40px)] font-extrabold uppercase leading-[1.04] tracking-[-0.03em] [overflow-wrap:anywhere]">{p.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed lg:text-[17px]">{p.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

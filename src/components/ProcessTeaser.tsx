"use client";
import { useEffect, useRef } from "react";
import { PROCESS } from "@/data/site";
import { ProcessArt } from "./ProcessArt";

/** Compressed production sequence: a few key moments on one line of liquid that fills as the strip crosses the screen.
 *  `pick` chooses which verified stages to show (indexes into PROCESS). Used as the homepage gateway and as a small
 *  fragment on other pages — same visual language, different length. No pinning. */
export function ProcessTeaser({ pick = [0, 2, 3, 4], compact = false }: { pick?: number[]; compact?: boolean }) {
  const root = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const arts = [...el.querySelectorAll<SVGElement>("[data-art]")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      if (b.bottom < 0 || b.top > innerHeight) return;
      // the strip is "read" while it travels from 85% to 35% of the viewport height
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - b.top) / (innerHeight * 0.5)));
      if (fill.current) fill.current.style.transform = `scaleX(${p.toFixed(4)})`;
      arts.forEach((a, i) => { if (p >= (i + 0.35) / arts.length) a.classList.add("is-on"); });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute inset-x-0 top-[-2px] z-10 block h-[3px] origin-left" ref={fill} style={{ transform: "scaleX(0)", background: "var(--liquid, var(--ch-purple))" }} />
    <ol ref={root} className={`grid border-l border-t border-current ${compact ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
      {pick.map((i) => {
        const p = PROCESS[i];
        return (
          <li key={p.n} className={`flex flex-col border-b border-r border-current ${compact ? "p-3 md:p-4" : "p-4 md:p-6"}`}>
            <p className="t-tag flex items-center justify-between"><span className="t-num text-[var(--ui-accent)]">{p.n}</span>{p.glyph && !compact && <span className="opacity-70">{p.glyph}</span>}</p>
            <ProcessArt i={i} className={compact ? "mx-auto my-2 h-16 w-16 md:h-24 md:w-24" : "mx-auto my-4 h-[clamp(110px,14vw,190px)] w-auto"} />
            <p className={`mt-auto font-extrabold uppercase leading-[1.05] tracking-[-0.02em] ${compact ? "text-[11px] md:text-[13px]" : "text-[clamp(14px,1.3vw,19px)]"}`}>{p.title}</p>
          </li>
        );
      })}
    </ol>
    </div>
  );
}

"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/motion";
import { PROCESS } from "@/data/site";

/** Production as a conveyor: eight crates ride the belt sideways while you scroll down (swipe on touch). */
export function Conveyor({ className = "", header }: { className?: string; header?: ReactNode }) {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const belt = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      const st = { trigger: pin.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.5, invalidateOnRefresh: true };
      gsap.to(t, { x: () => -dist(), ease: "none", scrollTrigger: st });
      gsap.to(belt.current, { backgroundPositionX: () => `${-dist()}px`, ease: "none", scrollTrigger: { ...st, pin: false } });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={pin} className={`relative overflow-hidden lg:h-[100svh] ${className}`}>
      <div className="flex h-full flex-col justify-between pb-[clamp(40px,7vh,90px)] pt-[clamp(60px,7.3vw,96px)] lg:pb-[5vh] lg:pt-[clamp(92px,13vh,130px)]">
        {header && <div className="wrap">{header}</div>}
        <ol ref={track} className="flex snap-x snap-mandatory gap-0 overflow-x-auto px-[var(--gutter)] pb-6 pt-8 lg:mt-auto [scrollbar-width:none] lg:w-max lg:snap-none lg:gap-0 lg:overflow-visible lg:pr-[14vw]">
          {PROCESS.map((p, i) => (
            <li key={p.n} data-crate className="relative flex h-[min(58vh,430px)] lg:h-[min(44vh,430px)] w-[78vw] max-w-[360px] shrink-0 snap-center flex-col justify-between -ml-px border border-current bg-[var(--field)] p-5 first:ml-0 lg:w-[25vw] lg:max-w-[400px] lg:p-6">
              <div className="flex items-start justify-between">
                <span className="t-num text-[clamp(44px,4.2vw,72px)] font-black leading-[0.8] tracking-[-0.05em] text-[var(--ui-accent)]">{p.n}</span>
                {p.glyph && <span className="chip chip-solid">{p.glyph}</span>}
              </div>
              <div>
                <h3 className="text-[clamp(22px,1.9vw,30px)] font-extrabold uppercase leading-[1] tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-3 text-[14.5px] leading-snug">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* the belt */}
        <div aria-hidden="true" className="relative mx-0 hidden lg:block">
          <div className="h-px bg-current" />
          <div ref={belt} className="h-5 border-b border-current" style={{ backgroundImage: "linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "44px 100%" }} />
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/** A poster sentence printed word by word as you scroll; accent words arrive as inverted plates, wiped in from the left. */
export function Manifesto({ text, accents = [], className = "" }: { text: string; accents?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top 82%", end: "bottom 48%", scrub: true };
      gsap.fromTo(el.querySelectorAll("[data-w]"), { opacity: 0.16 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: st });
      el.querySelectorAll<HTMLElement>("[data-st]").forEach((s) =>
        gsap.fromTo(s, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "power4.inOut", duration: 0.7, scrollTrigger: { trigger: s, start: "top 74%", toggleActions: "play none none reverse" } })
      );
    }, el);
    return () => ctx.revert();
  }, []);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const key = accents.find((a) => w.toLowerCase().startsWith(a.toLowerCase()));
        const tail = key ? w.slice(key.length) : "";
        return (
          <span key={i}>
            {key ? (
              <>
                <span data-st className="inline-block bg-[var(--on)] px-[0.14em] text-[var(--field)]">{w.slice(0, key.length)}</span>
                {tail && <span data-w>{tail}</span>}
              </>
            ) : (
              <span data-w>{w}</span>
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

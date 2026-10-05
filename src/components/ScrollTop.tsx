"use client";
import { useEffect, useState } from "react";
import { useMotion } from "@/lib/motion";

/** Compact "back to top": appears after a meaningful scroll, smooth unless the visitor prefers reduced motion. */
export function ScrollTop() {
  const [on, setOn] = useState(false);
  const { lenis, reduced } = useMotion();
  useEffect(() => {
    const f = () => setOn(window.scrollY > Math.max(900, window.innerHeight * 1.2));
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const up = () => {
    if (lenis && !reduced) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };
  return (
    <button type="button" onClick={up} aria-label="Наверх" title="Наверх" tabIndex={on ? 0 : -1} aria-hidden={!on} className={`to-top ${on ? "is-on" : ""}`}>
      <span aria-hidden="true">↑</span>
    </button>
  );
}

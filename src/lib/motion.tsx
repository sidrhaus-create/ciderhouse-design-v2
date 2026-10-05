"use client";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

/** Layout effect on the client, plain effect during SSR. Use it for anything that pins or re-parents DOM. */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Ctx = { lenis: Lenis | null; reduced: boolean };
const MotionCtx = createContext<Ctx>({ lenis: null, reduced: false });
export const useMotion = () => useContext(MotionCtx);

export function usePrefersReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setR(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReduced();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  // smooth scroll (desktop pointer only; touch keeps native momentum)
  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const l = new Lenis({ lerp: 0.12, wheelMultiplier: 0.95 });
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => { gsap.ticker.remove(tick); l.destroy(); setLenis(null); };
  }, [reduced]);

  // route change: top + refresh triggers + reveal observer
  useEffect(() => {
    if (!window.location.hash) {
      lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    }
    // wipes start fully clipped (zero visible area), so their parent is observed instead of the element itself
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const t = e.target as HTMLElement;
        if (t.dataset.wipeHost !== undefined) t.querySelectorAll(":scope > [data-slap]").forEach((c) => c.classList.add("is-in"));
        if (t.dataset.wipeHost === undefined || t.matches("[data-reveal],[data-split]")) t.classList.add("is-in");
        io.unobserve(t);
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]:not(.is-in),[data-split]:not(.is-in)").forEach((el) => io.observe(el));
    document.querySelectorAll<HTMLElement>("[data-slap]:not(.is-in)").forEach((el) => {
      const host = el.parentElement;
      if (host) { host.dataset.wipeHost = ""; io.observe(host); }
    });
    const par = reduced ? [] : gsap.utils.toArray<HTMLElement>("[data-par-y]").map((el) =>
      gsap.fromTo(el, { y: 0 }, { y: () => Number(el.dataset.parY) * window.innerHeight, ease: "none", scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } })
    );
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { io.disconnect(); cancelAnimationFrame(r); clearTimeout(t); par.forEach((p) => { p.scrollTrigger?.kill(); p.kill(); }); };
  }, [pathname, lenis, reduced]);

  return (
    <MotionCtx.Provider value={{ lenis, reduced }}>
      {children}
      <div key={pathname} aria-hidden="true" className="route-wipe" />
    </MotionCtx.Provider>
  );
}

/** Make every `[data-drag]` inside `root` a draggable plate (fine pointers only — touch keeps scrolling). */
export function throwables(root: HTMLElement) {
  if (!window.matchMedia("(pointer: fine)").matches) return () => {};
  const items = gsap.utils.toArray<HTMLElement>("[data-drag]", root);
  const ds = items.flatMap((el) =>
    Draggable.create(el, {
      type: "x,y",
      bounds: root,
      inertia: true,
      edgeResistance: 0.7,
      zIndexBoost: false,
      onPress() { el.classList.add("is-held"); },
      onRelease() { el.classList.remove("is-held"); },
    })
  );
  return () => ds.forEach((d) => d.kill());
}

export { gsap, ScrollTrigger, Draggable };

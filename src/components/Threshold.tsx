"use client";
import { useEffect, useRef, useState } from "react";

const KEY = "ch-age-ok";
const read = () => { try { return localStorage.getItem(KEY) === "1"; } catch { return false; } };
const write = () => { try { localStorage.setItem(KEY, "1"); } catch {} };

/** First-visit threshold: the counter runs up to 18 on a purple plane, then the question. The plane leaves upward as one hard wipe.
 *  Fires `house:enter` when the visitor is in. */
export function Threshold() {
  const [state, setState] = useState<"pending" | "fill" | "ask" | "leave" | "done" | "no">("pending");
  const [age, setAge] = useState(0);
  const yes = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (read()) { setState("done"); (window as any).__houseIn = true; window.dispatchEvent(new Event("house:enter")); return; }
    setState("fill");
    document.documentElement.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 1 : 1300;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setAge(Math.round((1 - Math.pow(1 - k, 2.2)) * 18));
      if (k < 1) raf = requestAnimationFrame(step); else setState("ask");
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => { if (state === "ask") yes.current?.focus({ preventScroll: true }); }, [state]);

  const enter = () => {
    write();
    setState("leave");
    document.documentElement.style.overflow = "";
    (window as any).__houseIn = true;
    window.dispatchEvent(new Event("house:enter"));
    setTimeout(() => setState("done"), 950);
  };

  if (state === "done" || state === "pending") return null;
  const asked = state !== "fill";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="threshold-q"
      className="field-purple fixed inset-0 z-[120] overflow-hidden"
      style={{ clipPath: state === "leave" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)", transition: "clip-path .9s var(--ease-io)" }}
    >
      <div className="wrap relative flex h-full flex-col justify-between py-5 md:py-7">
        <div className="flex items-center justify-between gap-4 border-b border-current pb-4">
          <img src="/assets/brand/ciderhouse-logo-white.svg" alt="CIDERHOUSE" width={524} height={137} className="h-8 w-auto md:h-9" />
          <span className="t-tag text-right">Сайт содержит информацию об алкогольной продукции</span>
        </div>

        <p aria-hidden="true" className="t-num pointer-events-none flex items-start font-black leading-[0.78] tracking-[-0.06em]" style={{ fontSize: "min(44vw, 58svh)" }}>
          {String(age).padStart(2, "0")}
          <span className="overflow-hidden"><span className="block transition-transform duration-700" style={{ transform: asked ? "none" : "translateY(110%)", transitionTimingFunction: "var(--ease-out)" }}>+</span></span>
        </p>

        <div className="grid grid-cols-1 items-end gap-6 border-t border-current pt-5 md:grid-cols-12" style={{ opacity: asked ? 1 : 0, transition: "opacity .4s linear" }} aria-hidden={!asked}>
          <div className="md:col-span-7">
            <h2 id="threshold-q" className="t-l">Вам уже исполнилось 18&nbsp;лет?</h2>
            {state === "no" ? <p className="t-m mt-3">Тогда будем рады видеть вас позже.</p> : null}
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <button ref={yes} onClick={enter} disabled={!asked} className="btn btn-solid">Да, мне есть 18</button>
            {state !== "no" && <button onClick={() => setState("no")} disabled={!asked} className="btn btn-plain">Нет</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Subscribe to the moment the visitor is "in the house" (after threshold). */
export function onHouseEnter(cb: () => void) {
  if ((window as any).__houseIn) { cb(); return () => {}; }
  window.addEventListener("house:enter", cb, { once: true });
  return () => window.removeEventListener("house:enter", cb);
}

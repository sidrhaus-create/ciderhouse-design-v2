"use client";
import { useEffect, useRef, useState } from "react";

const N = 49;

/** Studio film of the ZER° trio (49 original frames). Plays once when it enters view, then the visitor can scrub it by dragging. */
export function ZeroReel({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const frame = useRef(N - 1);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  const draw = (i: number) => {
    const c = cv.current, im = imgs.current[i];
    if (!c || !im || !im.complete || !im.naturalWidth) return;
    const ctx = c.getContext("2d")!;
    // cover-fit without distortion
    const r = Math.max(c.width / im.naturalWidth, c.height / im.naturalHeight);
    const w = im.naturalWidth * r, h = im.naturalHeight * r;
    ctx.drawImage(im, (c.width - w) / 2, (c.height - h) / 2, w, h);
    frame.current = i;
  };

  const play = (from = 0) => {
    let i = from, last = 0;
    const tick = (t: number) => {
      if (t - last > 1000 / 24) { draw(i); i++; last = t; }
      if (i < N) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    const red = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(red);
    if (red) return;
    const el = box.current!;
    const size = () => {
      const c = cv.current; if (!c) return; const r = el.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
      draw(frame.current);
    };
    const ro = new ResizeObserver(size); ro.observe(el);
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      const small = window.innerWidth < 900;
      let loaded = 0;
      imgs.current = Array.from({ length: N }, (_, k) => {
        const im = new Image();
        im.decoding = "async";
        im.src = `/assets/zero/reel/${String(k + 1).padStart(2, "0")}${small ? "-s" : ""}.webp`;
        im.onload = () => { loaded++; if (loaded === N) { setReady(true); size(); play(0); } };
        return im;
      });
    }, { rootMargin: "300px" });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  // drag to scrub
  const drag = useRef<{ x: number; f: number } | null>(null);
  const onDown = (e: React.PointerEvent) => { if (!ready) return; drag.current = { x: e.clientX, f: frame.current }; (e.target as HTMLElement).setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !box.current) return;
    const dx = (e.clientX - drag.current.x) / box.current.clientWidth;
    draw(Math.max(0, Math.min(N - 1, Math.round(drag.current.f + dx * N * 1.4))));
  };
  const onUp = () => { drag.current = null; };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") draw(Math.max(0, frame.current - 2));
    if (e.key === "ArrowRight") draw(Math.min(N - 1, frame.current + 2));
  };

  return (
    <div
      ref={box}
      className={`relative overflow-hidden ${className}`}
      data-cursor
      tabIndex={reduced ? -1 : 0}
      role="img"
      aria-label="Студийный фильм: три бутылки ZER° CIDER 0,0% — вишня, зелёное яблоко, гранат — малина. Перетаскивайте или используйте стрелки, чтобы управлять камерой."
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onKeyDown={onKey}
      style={{ touchAction: "pan-y", cursor: ready ? "grab" : undefined }}
    >
      {/* poster = final frame, also the reduced-motion / no-JS view */}
      <img src="/assets/zero/still-trio-1100.webp" srcSet="/assets/zero/still-trio-640.webp 640w, /assets/zero/still-trio-1100.webp 1100w" sizes="(max-width: 900px) 100vw, 60vw" alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`} />
      <canvas ref={cv} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {ready && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <span className="t-tag">← тяните — управляйте камерой →</span>
          <button className="t-tag pointer-events-auto border border-current/60 px-3 py-1.5" onClick={() => play(0)}>Повторить дубль</button>
        </div>
      )}
    </div>
  );
}

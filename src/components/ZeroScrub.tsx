"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/motion";
import { VERIFIED } from "@/data/catalog";
import { Chapter, Swatch } from "./primitives";
import { flavourAccent } from "@/lib/flavour";

const N = 49;

/** ZER° on the home page: the studio film (49 original frames) is scrubbed by the scroll while the gauge runs 0,5 → 0,0. */
export function ZeroScrub() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const frame = useRef(0);
  const [ready, setReady] = useState(false);
  const [cold, setCold] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current!, c = cv.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const draw = (i: number) => {
      frame.current = i;
      const im = imgs.current[i];
      if (!im || !im.complete || !im.naturalWidth) return;
      const g = c.getContext("2d")!;
      const r = Math.max(c.width / im.naturalWidth, c.height / im.naturalHeight);
      const w = im.naturalWidth * r, h = im.naturalHeight * r;
      g.drawImage(im, (c.width - w) / 2, (c.height - h) / 2, w, h);
    };
    const size = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
      draw(frame.current);
    };
    const ro = new ResizeObserver(size); ro.observe(c);

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
        im.onload = () => { loaded++; if (k === frame.current) draw(k); if (loaded === N) { setReady(true); size(); } };
        return im;
      });
    }, { rootMargin: "900px" });
    io.observe(el);

    const apply = (p: number) => {
      draw(Math.round(p * (N - 1)));
      const abv = Math.max(0, 0.5 * (1 - p / 0.86));
      if (num.current) num.current.textContent = abv.toFixed(1).replace(".", ",");
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setCold(p > 0.86);
    };
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({ trigger: pin.current, start: "top top", end: "+=110%", pin: true, scrub: 0.3, onUpdate: (s) => apply(s.progress) });
    });
    mm.add("(max-width: 1023px)", () => {
      ScrollTrigger.create({ trigger: c, start: "top 78%", end: "bottom 30%", scrub: 0.3, onUpdate: (s) => apply(s.progress) });
    });
    return () => { mm.revert(); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <section ref={root} aria-labelledby="zero-title" className="relative field-white voice-zero">
      <div ref={pin} className="relative overflow-hidden lg:h-[100svh]">
        <div className="wrap grid h-full grid-cols-1 items-center gap-8 py-[clamp(60px,7.3vw,96px)] lg:grid-cols-12 lg:gap-10 lg:py-0">
          <div className="lg:col-span-5">
            <Chapter n="04" label="Направление 0%" className="mb-6" />
            <h2 id="zero-title" className="sr-only">ZER° CIDER — безалкогольный сидр 0,0%</h2>
            <p aria-hidden="true" className="font-bold leading-[0.8] tracking-[-0.05em] text-[clamp(96px,13vw,220px)]">
              <span ref={num} className="t-num inline-block">0,5</span><span className="text-[0.42em] text-plum">%</span>
            </p>
            <div className="mt-[clamp(18px,3vw,44px)] flex items-center gap-3">
              <span className="relative block h-2 flex-1 overflow-hidden border border-current"><span ref={bar} className="absolute inset-0 origin-left bg-plum" style={{ transform: "scaleX(0)" }} /></span>
              <span className="t-tag w-[13.5em] shrink-0 chip text-center transition-colors duration-300" style={cold ? { background: "var(--ch-purple)", color: "var(--ch-paper)", borderColor: "var(--ch-purple)" } : undefined}>
                {cold ? "остановлено холодом" : "брожение идёт"}
              </span>
            </div>
            <p className="t-lead mt-6">Брожение доходит до 0,5% — и его останавливают холодом. Дальше напиток бережно доводят до 0,0%, сохраняя вкус и характер сидра.</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <a href="https://zerocider.ru" target="_blank" rel="noopener noreferrer" data-external="" className="btn btn-solid">zerocider.ru</a>
              <Link href="/non-alcoholic/" className="btn -ml-px">Направление 0%</Link>
              <Link href="/production/" className="btn">Как это сделано</Link>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative aspect-[1100/618] w-full overflow-hidden border border-current bg-black ">
              <img src="/assets/zero/still-caps-1100.webp" srcSet="/assets/zero/still-caps-640.webp 640w, /assets/zero/still-caps-1100.webp 1100w" sizes="(max-width: 1024px) 100vw, 58vw" alt="Студийная съёмка: три бутылки ZER° CIDER 0,0%" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`} />
              <canvas ref={cv} aria-hidden="true" className="absolute inset-0 h-full w-full" />
              <span className="t-tag absolute left-0 top-0 bg-white px-3 py-2 text-black">плёнка · 49 кадров · листайте</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {VERIFIED.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/katalog/${p.slug}/`} className="block" aria-label={`${p.nameRu} — ${p.character}, 0,0%`}>
                    <span className="chip bg-white text-black transition-colors duration-300 hover:bg-black hover:text-white"><Swatch color={flavourAccent(p.name)} className="text-[14px]" />{p.nameRu} · {p.character}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

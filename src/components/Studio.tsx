import Link from "next/link";
import type { ReactNode } from "react";
import { FLAVOUR_SHOTS, shot, type ShotKey } from "@/data/photos";
import { VERIFIED } from "@/data/catalog";
import { Chapter } from "./primitives";

/** A studio photograph with intrinsic size (no layout shift). Crops are set by the frame around it, never by stretching. */
export function StudioImg({ k, sizes, className = "", pos, priority = false, decorative = false }: { k: ShotKey; sizes: string; className?: string; pos?: string; priority?: boolean; decorative?: boolean }) {
  const s = shot(k);
  return <img {...s} alt={decorative ? "" : s.alt} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async" className={className} style={pos ? { objectPosition: pos } : undefined} />;
}

/** A full-bleed photographic divider: one frame and one hairline caption that names what is in it. The image drifts slightly. */
export function PhotoBand({ k, caption, pos = "50% 50%", children, height = "h-[46svh] md:h-[64svh]" }: { k: ShotKey; caption: string; pos?: string; children?: ReactNode; height?: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--ch-sand)]" aria-label={caption}>
      <figure className={`relative ${height}`}>
        <StudioImg k={k} sizes="100vw" pos={pos} className="absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover" />
        <figcaption className="t-tag absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-[var(--ch-ink)] px-[var(--gutter)] py-3 text-[var(--ch-paper)]">
          <span>{caption}</span>
          {children}
        </figcaption>
      </figure>
    </section>
  );
}

/** 0%: one still-life per flavour. Three tall frames; each opens the flavour's page. */
export function ZeroTriptych() {
  return (
    <section className="field-white relative" aria-labelledby="z-shots">
      <div className="wrap pb-8 pt-[clamp(50px,5.9vw,90px)]">
        <Chapter n="—" label="Три вкуса" className="mb-6" />
        <h2 id="z-shots" className="t-xl">Вкус в кадре</h2>
      </div>
      <ul className="flex snap-x snap-mandatory overflow-x-auto border-y border-current [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible">
        {VERIFIED.map((p, i) => (
          <li key={p.slug} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }} className="w-[78vw] shrink-0 snap-start border-r border-current last:border-r-0 md:w-auto">
            <Link href={`/katalog/${p.slug}/`} className="group block">
              <span className="relative block aspect-[3/4] overflow-hidden">
                <StudioImg k={FLAVOUR_SHOTS[p.slug]} sizes="(max-width: 768px) 78vw, 34vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]" />
              </span>
              <span className="flex items-center justify-between gap-4 border-t border-current px-[var(--gutter)] py-4 md:px-6">
                <span className="text-[clamp(20px,2vw,30px)] font-bold leading-none tracking-[-0.02em]">{p.nameRu}</span>
                <span className="t-tag flex items-center gap-3">{p.character}<span aria-hidden="true" className="sq transition-transform duration-500 group-hover:translate-x-1">→</span></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

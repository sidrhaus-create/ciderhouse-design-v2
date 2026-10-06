import type { ReactNode } from "react";
import { brandType, brandVars, siteLabel, type Brand } from "@/data/brands";
import { productsOf } from "@/data/catalog";
import { COVERS, coverImg, type CoverSrc } from "@/data/photos";
import { BrandLink } from "./BrandLink";

/** Brand covers: the brands are introduced through their studio photography, not through colour blocks.
 *  One construction everywhere — a photograph in a hairline frame and a solid strip of the brand's own plane with the name set in
 *  the brand's face. Text never sits on the photograph itself, so the picture stays clean and the name stays readable. */

function CoverImg({ c, sizes, pos, className = "", priority = false }: { c: CoverSrc; sizes: string; pos?: string; className?: string; priority?: boolean }) {
  const i = coverImg(c);
  return <img {...i} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async" className={className} style={pos ? { objectPosition: pos } : undefined} />;
}

const IMG = "absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.035]";

/** The photographic part of a cover: a brand's frame. */
export function CoverPicture({ b, variant = "tile", sizes, priority = false }: { b: Brand; variant?: "tile" | "wide"; sizes: string; priority?: boolean }) {
  const c = COVERS[b.slug];
  if (!c) return null;
  return <CoverImg c={variant === "tile" ? c.tile : c.wide} sizes={sizes} pos={variant === "tile" ? c.tilePos : c.widePos} priority={priority} className={IMG} />;
}

/** A campaign tile: photograph above, the brand's strip below. The whole tile is one link (external for brands with their own site). */
export function BrandTile({ b, n, aspect = "aspect-[4/5]", sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", big = false, delay = 0, variant = "tile" }: { b: Brand; n: number; aspect?: string; sizes?: string; big?: boolean; delay?: number; variant?: "tile" | "wide" }) {
  const count = productsOf(b.slug).length;
  const meta = b.status === "coming-soon" ? "скоро" : count ? `${String(count).padStart(2, "0")} в линейке` : b.kind;
  return (
    <BrandLink b={b} data-reveal style={{ ...brandVars(b), ["--d" as string]: `${delay}s` }} className="field-brand group relative flex h-full flex-col">
      <span className={`relative block overflow-hidden ${aspect}`}>
        <CoverPicture b={b} variant={variant} sizes={sizes} />
        <span className="chip chip-solid t-num absolute left-4 top-4">{String(n).padStart(2, "0")}</span>
        {b.site && <span className="chip chip-solid absolute right-4 top-4">↗ {siteLabel(b)}</span>}
      </span>
      <span className="flex flex-1 flex-col justify-between gap-5 border-t border-current px-5 py-5 md:px-6">
        <span className="t-tag flex items-center justify-between gap-4 opacity-80"><span>{b.kind}{b.subline ? ` + ${b.subline.name}` : ""}</span><span className="t-num">{meta}</span></span>
        <span className="flex items-end justify-between gap-4">
          {b.slug === "zero" && b.logo
            ? <img src={b.logo} alt={b.name} width={373} height={105} className={`w-auto transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-2 ${big ? "h-[clamp(40px,4.4vw,76px)]" : "h-[clamp(30px,2.8vw,48px)]"}`} />
            : <span className={`block leading-[0.95] transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-2 ${big ? "text-[clamp(34px,4.2vw,72px)]" : "text-[clamp(28px,2.6vw,44px)]"}`} style={brandType(b)}>{b.name}</span>}
          <span aria-hidden="true" className="sq shrink-0 transition-transform duration-500 group-hover:translate-x-1.5">{b.site ? "↗" : "→"}</span>
        </span>
        <span className="grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-out)] lg:[grid-template-rows:0fr] lg:group-hover:[grid-template-rows:1fr] lg:group-focus-visible:[grid-template-rows:1fr]">
          <span className="block overflow-hidden"><span className="block max-w-[36ch] text-[14.5px] leading-snug">{b.line}</span></span>
        </span>
      </span>
    </BrandLink>
  );
}

/** The cover of a brand's section in the catalogue: a wide photograph, then the brand's strip with name, count and actions. */
export function CatalogCover({ b, children, aside }: { b: Brand; children?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="group relative border-t border-current">
      <div className="relative h-[40svh] overflow-hidden md:h-[54svh]">
        <CoverPicture b={b} variant="wide" sizes="100vw" />
      </div>
      <div className="wrap flex flex-col gap-5 border-t border-current py-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="t-tag mb-3 opacity-80">{b.kind}</p>
          <h2 id={`g-${b.slug}`} className="text-[clamp(34px,5.6vw,96px)] leading-[0.92]" style={brandType(b)}>{b.slug === "zero" && b.logo ? <img src={b.logo} alt={b.name} width={373} height={105} className="h-[clamp(40px,5.2vw,92px)] w-auto" /> : b.name}</h2>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          {children}
          <div className="flex items-center gap-3">{aside}</div>
        </div>
      </div>
    </header>
  );
}

/** The poster's cover panel: the brand's wide photograph with the content strip set into its lower-left corner on desktop. */
export function PosterCover({ b, children }: { b: Brand; children: ReactNode }) {
  const has = !!COVERS[b.slug];
  return (
    <div className="group relative border-t border-current">
      <div className={`relative overflow-hidden ${has ? "h-[52svh] md:h-[74svh]" : "h-[40svh] md:h-[56svh]"}`}>
        <CoverPicture b={b} variant="wide" sizes="100vw" priority />
      </div>
      <div className="relative border-t border-current md:absolute md:bottom-0 md:left-0 md:max-w-[min(560px,46vw)] md:border-r">
        <div className="field-brand px-[var(--gutter)] py-6 md:px-8 md:py-7" style={brandVars(b)}>{children}</div>
      </div>
    </div>
  );
}

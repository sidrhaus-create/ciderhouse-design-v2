import Link from "next/link";
import { brandBySlug } from "@/data/brands";
import { isValidElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { BOTTLE_RATIO, srcSet, type Product } from "@/data/catalog";

export { Fit } from "./Fit";

const textLen = (n: ReactNode): number => {
  if (typeof n === "string" || typeof n === "number") return String(n).length;
  if (Array.isArray(n)) return n.reduce((a, c) => a + textLen(c), 0);
  if (isValidElement(n)) return textLen((n.props as { children?: ReactNode }).children);
  return 0;
};

/** Display text split into explicit lines (controls Russian line breaks) with masked reveal. */
export function Split({
  lines, as: Tag = "h2", className = "", delay = 0, id, fit = true, max,
}: { lines: ReactNode[]; as?: ElementType; className?: string; delay?: number; id?: string; fit?: boolean; max?: string }) {
  const n = Math.max(...lines.map(textLen), 3);
  const mega = className.includes("t-mega"), xl = className.includes("t-xl");
  const cap = max ?? (mega ? "clamp(64px, 17vw, 320px)" : xl ? "clamp(44px, 9vw, 168px)" : undefined);
  const style = { "--d": `${delay}s`, ...(fit && cap ? { fontSize: `min(${cap}, calc((100vw - 2 * var(--gutter)) * var(--fitf, 1) / ${(n * 0.72).toFixed(2)}))` } : {}) } as CSSProperties;
  return (
    <Tag id={id} data-split className={className} style={style}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask" style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: ElementType }) {
  return <Tag data-reveal className={className} style={{ "--d": `${delay}s` } as CSSProperties}>{children}</Tag>;
}

/** Original product cutout, cropped above the studio reflection. Never stretched: set a height, width follows. */
export function Bottle({
  base, alt, sizes = "(max-width: 768px) 40vw, 22vw", className = "", priority = false, style,
}: { base: string; alt: string; sizes?: string; className?: string; priority?: boolean; style?: CSSProperties }) {
  return (
    <div className={`bottle ${className}`} style={style}>
      <img
        src={`${base}-600.webp`}
        srcSet={srcSet(base)}
        sizes={sizes}
        width={BOTTLE_RATIO.w}
        height={BOTTLE_RATIO.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

const packAlt = (p: Product) => `${brandBySlug(p.brand)?.name ?? "CIDERHOUSE"} — ${p.nameRu}`;

/** A product's original pack shot, whatever its source: the ZER° cutouts (cropped above the reflection) or archive packshots. Height-driven, never stretched. */
export function Pack({ p, className = "", sizes, priority = false }: { p: Product; className?: string; sizes?: string; priority?: boolean }) {
  if (p.image) return <Bottle base={p.image} alt={packAlt(p)} sizes={sizes} priority={priority} className={className} />;
  if (!p.pack) return null;
  return (
    <img
      src={`${p.pack.src}-700.webp`}
      srcSet={`${p.pack.src}-700.webp ${Math.round((700 * p.pack.w) / p.pack.h)}w, ${p.pack.src}-1400.webp ${Math.round((1400 * p.pack.w) / p.pack.h)}w`}
      sizes={sizes}
      width={p.pack.w}
      height={p.pack.h}
      alt={packAlt(p)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`w-auto max-w-none select-none ${className}`}
    />
  );
}

/** Plate: a strict rectangular label — ruled by default, filled when `bg` is given. The only "badge" in the system. */
export function Plate({
  children, bg, fg, line, className = "", style, drag = false, slap = false, delay = 0, as: Tag = "span",
}: {
  children: ReactNode; bg?: string; fg?: string; line?: string;
  className?: string; style?: CSSProperties; drag?: boolean; slap?: boolean; delay?: number; as?: ElementType;
}) {
  const vars: Record<string, string> = { "--d": `${delay}s` };
  if (bg) { vars["--pl-bg"] = bg; vars["--pl-line"] = line ?? bg; } else if (line) vars["--pl-line"] = line;
  if (fg) vars["--pl-fg"] = fg;
  const s = { ...vars, ...style } as CSSProperties;
  return (
    <Tag className={`plate ${className}`} style={s} {...(drag ? { "data-drag": "" } : {})} {...(slap ? { "data-slap": "" } : {})}>
      {children}
    </Tag>
  );
}

/** Small colour square: the flavour accent next to a name. */
export function Swatch({ color, className = "" }: { color: string; className?: string }) {
  return <span aria-hidden="true" className={`inline-block h-[0.62em] w-[0.62em] shrink-0 ${className}`} style={{ background: color }} />;
}

/** Placeholder for an original asset that has not been retrieved yet. Deliberately NOT a fake render. */
export function AssetSlot({ label, className = "", tone = "currentColor" }: { label: string; className?: string; tone?: string }) {
  return (
    <div className={`relative flex items-end justify-center ${className}`} role="img" aria-label={`Фото продукта будет добавлено: ${label}`}>
      <svg viewBox="0 0 120 470" className="h-full w-auto opacity-50" aria-hidden="true">
        <path d="M52 6h16v58c0 14 28 40 28 92v290c0 10-8 18-18 18H42c-10 0-18-8-18-18V156c0-52 28-78 28-92z" fill="none" stroke={tone} strokeWidth="1" strokeDasharray="4 6" />
      </svg>
      <span className="chip absolute bottom-[14%] left-1/2 -translate-x-1/2 whitespace-nowrap">фото · слот</span>
    </div>
  );
}

export function Marquee({ children, duration = 40, gap = "4vw", reverse = false, className = "" }: { children: ReactNode; duration?: number; gap?: string; reverse?: boolean; className?: string }) {
  const style = { "--mq-dur": `${duration}s`, "--mq-gap": gap } as CSSProperties;
  const dir = reverse ? { animationDirection: "reverse" as const } : undefined;
  return (
    <div className={`marquee ${className}`} style={style}>
      <div className="marquee__track" style={dir}>{children}</div>
      <div className="marquee__track" style={dir} aria-hidden="true">{children}</div>
    </div>
  );
}

/** Section marker: number — rule — label. */
export function Chapter({ n, label, className = "" }: { n: string; label: string; className?: string }) {
  return (
    <div className={`t-tag flex items-center gap-3 ${className}`}>
      <span className="t-num">{n}</span>
      <span className="h-px w-10 bg-current" />
      <span>{label}</span>
    </div>
  );
}

export function Degree({ className = "" }: { className?: string }) {
  return <span className={`inline-block align-top ${className}`} aria-hidden="true">°</span>;
}

export function ToVerify() {
  return (
    <span className="t-tag inline-flex items-center border border-dashed border-current px-2 py-[3px] text-[9px] opacity-70" title="Название из открытых источников, сверяется с ciderhouse.ru">
      сверяется
    </span>
  );
}

/** Flavour legend: one plate — an optional brand cell, then equal cells with a swatch and the flavour name.
 *  `tone="plate"` sets it on the ink plane (under the hero still life); `tone="line"` draws it as a ruled row on the current plane.
 *  Used wherever the three 0% flavours are named next to the bottles (hero, 0% film, the 0% brand card). */
export function FlavourLegend({ items, brand, note, tone = "line", className = "" }: {
  items: { id: string; name: string; sub?: string; color: string; href?: string }[];
  brand?: ReactNode; note?: string; tone?: "plate" | "line"; className?: string;
}) {
  const n = items.length;
  const plate = tone === "plate";
  const cell = plate ? "bg-[var(--ch-ink)] text-[var(--ch-paper)]" : "bg-[var(--field)]";
  return (
    <div
      className={`legend grid gap-px max-lg:grid-cols-3 ${plate ? "bg-[color-mix(in_srgb,var(--ch-paper)_22%,var(--ch-ink))]" : "border border-current bg-current"} ${className}`}
      style={{ ["--legend-cols" as string]: `${brand ? "minmax(0,1.25fr) " : ""}repeat(${n}, minmax(0,1fr))` }}
      role="list"
      aria-label="Вкусы"
    >
      {brand && (
        <p className={`flex min-w-0 items-center gap-3 px-4 py-3.5 ${plate ? "bg-[var(--ch-purple)] text-[var(--ch-paper)]" : "bg-[var(--on)] text-[var(--field)]"} max-lg:col-span-3`}>
          {brand}
          {note && <span className="ml-auto text-[13px] font-bold tracking-[-0.01em]">{note}</span>}
        </p>
      )}
      {items.map((it) => {
        const inner = (
          <>
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0" style={{ background: it.color }} />
            <span className="min-w-0 leading-[1.2]">
              <span className="block text-[13px] font-semibold tracking-[-0.01em]">{it.name}</span>
              {it.sub && <span className="block text-[11px] opacity-60">{it.sub}</span>}
            </span>
          </>
        );
        const cls = `flex min-w-0 items-center gap-3 px-4 py-3.5 ${cell}`;
        return it.href
          ? <Link key={it.id} role="listitem" href={it.href} className={`${cls} transition-colors duration-300 ${plate ? "hover:bg-[var(--ch-purple)]" : "hover:bg-[var(--on)] hover:text-[var(--field)]"}`}>{inner}</Link>
          : <span key={it.id} role="listitem" className={cls}>{inner}</span>;
      })}
    </div>
  );
}

/** Range strip: the first packshots of a line in a row, then the full count — says "there is more" without a second photograph. */
export function RangeStrip({ products, max = 5, href, className = "" }: { products: Product[]; max?: number; href?: string; className?: string }) {
  const shown = products.filter((p) => p.pack || p.image).slice(0, max);
  const word = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "вкус" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "вкуса" : "вкусов");
  return (
    <Link href={href ?? "/katalog/"} className={`group flex items-end gap-4 self-start ${className}`} aria-label={`В линейке ${products.length} ${word(products.length)} — смотреть все`}>
      <span className="flex items-end gap-[clamp(6px,0.6vw,10px)]" aria-hidden="true">
        {shown.map((p) => (
          <span key={p.slug} className="flex h-[clamp(46px,5vw,64px)] items-end transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-1"><Pack p={p} className="h-full" sizes="40px" /></span>
        ))}
      </span>
      <span className="pb-0.5 leading-none">
        <span className="t-num block text-[22px] font-bold tracking-[-0.02em]">{String(products.length).padStart(2, "0")}</span>
        <span className="t-tag block text-[9.5px] opacity-70">{word(products.length)} · все →</span>
      </span>
    </Link>
  );
}

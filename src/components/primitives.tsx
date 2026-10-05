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

/** A product's original pack shot, whatever its source: the ZER° cutouts (cropped above the reflection) or archive packshots. Height-driven, never stretched. */
export function Pack({ p, className = "", sizes, priority = false }: { p: Product; className?: string; sizes?: string; priority?: boolean }) {
  if (p.image) return <Bottle base={p.image} alt={p.name} sizes={sizes} priority={priority} className={className} />;
  if (!p.pack) return null;
  return (
    <img
      src={`${p.pack.src}-700.webp`}
      srcSet={`${p.pack.src}-700.webp ${Math.round((700 * p.pack.w) / p.pack.h)}w, ${p.pack.src}-1400.webp ${Math.round((1400 * p.pack.w) / p.pack.h)}w`}
      sizes={sizes}
      width={p.pack.w}
      height={p.pack.h}
      alt={p.name}
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

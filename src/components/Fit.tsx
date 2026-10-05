"use client";
import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

const textLen = (n: ReactNode): number => {
  if (typeof n === "string" || typeof n === "number") return String(n).length;
  if (Array.isArray(n)) return n.reduce((a: number, c) => a + textLen(c), 0);
  if (n && typeof n === "object" && "props" in n) return textLen((n.props as { children?: ReactNode }).children);
  return 0;
};

/** Poster line set edge to edge: the type is measured and scaled to fill its column exactly.
 *  Before JS runs, a per-character estimate keeps the layout close to final. */
export function Fit({
  children, as: Tag = "span", className = "", id, max = 900, delay = 0, reveal = true, style,
}: { children: ReactNode; as?: ElementType; className?: string; id?: string; max?: number; delay?: number; reveal?: boolean; style?: CSSProperties }) {
  const box = useRef<HTMLElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const b = box.current!, el = inner.current!;
    let raf = 0;
    const fit = () => {
      const w = b.clientWidth;
      if (!w) return;
      // the size lives on the mask, so its em-based padding (room for Ё, Й, descenders) scales with the type
      const mask = el.parentElement!;
      mask.style.fontSize = "100px";
      const tw = el.offsetWidth;
      if (tw) mask.style.fontSize = `${Math.min(max, (100 * w) / tw).toFixed(2)}px`;
    };
    const queue = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(queue);
    ro.observe(b);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [max, children]);

  const n = Math.max(textLen(children), 2);
  return (
    <Tag ref={box} id={id} {...(reveal ? { "data-split": "" } : {})} className={`fit t-poster leading-[0.86] ${className}`} style={{ "--d": `${delay}s`, ...style } as CSSProperties}>
      <span className="line-mask" suppressHydrationWarning style={{ fontSize: `min(${max}px, calc(100cqw / ${(n * 0.7).toFixed(2)}))` }}>
        <span ref={inner}>{children}</span>
      </span>
    </Tag>
  );
}

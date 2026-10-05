import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/data/catalog";
import { flavourAccent } from "@/lib/flavour";
import { Bottle, Swatch, ToVerify } from "./primitives";

/** Verified products: ruled cells, the bottle standing on a plane of its flavour accent that wipes across on hover. */
export function ProductCards({ items }: { items: Product[] }) {
  return (
    <ul className="grid grid-cols-1 border-l border-t border-current sm:grid-cols-3">
      {items.map((p) => {
        const c = flavourAccent(p.name);
        return (
          <li key={p.slug} className="border-b border-r border-current">
            <Link href={`/katalog/${p.slug}/`} className="group relative flex h-full flex-col overflow-hidden p-5 md:p-6">
              <span className="flex items-start justify-between">
                <span className="chip">{p.character}</span>
                <span className="text-[34px] font-extrabold leading-[0.8] tracking-[-0.04em]">{p.abv}</span>
              </span>
              <span className="relative my-6 flex h-[min(52vh,440px)] items-end justify-center">
                <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-[46%] -translate-x-1/2 transition-[width] duration-700 [transition-timing-function:var(--ease-out)] group-hover:w-full" style={{ background: c }} />
                <Bottle base={p.image!} alt={p.name} sizes="(max-width:640px) 40vw, 14vw" className="relative h-[108%] translate-y-[4%] transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.05]" />
              </span>
              <span className="t-l">{p.nameRu}</span>
              <span className="t-tag mt-3 flex items-center justify-between gap-3 border-t border-current pt-3">
                <span className="truncate">{p.name}</span>
                <span aria-hidden="true" className="sq">→</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Names found in open sources: a ruled index — swatch, name, original name, format. No photos, no flavour claims. */
export function FlavourList({ items, nameStyle = { fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase" } }: { items: Product[]; nameStyle?: CSSProperties }) {
  return (
    <ol className="grid grid-cols-1 gap-x-[var(--gutter)] border-t border-current md:grid-cols-2">
      {items.map((p, i) => (
        <li key={p.slug} className="group flex items-baseline gap-4 border-b border-current py-3 md:py-4">
          <span className="t-tag t-num w-6 shrink-0 opacity-60">{String(i + 1).padStart(2, "0")}</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-[0.5em] font-display text-[clamp(22px,2.3vw,36px)] leading-[1.02] transition-transform duration-500 group-hover:translate-x-2" style={nameStyle}>
              <Swatch color={flavourAccent(p.name)} />{p.nameRu}
            </span>
            <span className="t-tag mt-1.5 block opacity-70">{p.name}</span>
          </span>
          <span className="t-tag shrink-0 text-right opacity-70">{p.format.join(" / ")}{p.volumes.length ? <><br />{p.volumes.join(" / ")}</> : null}</span>
        </li>
      ))}
    </ol>
  );
}

export function VerifyNote() {
  return (
    <p className="mt-8 flex max-w-[62ch] flex-wrap items-center gap-3 text-sm"><ToVerify /> названия, форматы и объёмы найдены в открытых источниках и сверяются с официальным каталогом ciderhouse.ru</p>
  );
}

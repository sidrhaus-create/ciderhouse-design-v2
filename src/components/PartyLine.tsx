import type { Brand } from "@/data/brands";
import { brandType, brandVars } from "@/data/brands";
import type { Product } from "@/data/catalog";
import { BrandRange } from "./BrandRange";
import { Chapter } from "./primitives";
import { StudioImg } from "./Studio";

/** D TREE PARTY — the party sub-line of Double Tree: its own label world (fruit characters, Russian label copy), shown as a
 *  sub-chapter inside Double Tree. The group frame introduces it; the range runs on the brand's plane like the main line.
 *  `compact` is the catalogue version (no group frame, a tighter header). */
export function PartyLine({ b, items, compact = false, n = "02", offset = 0 }: { b: Brand; items: Product[]; compact?: boolean; n?: string; offset?: number }) {
  if (!items.length || !b.subline) return null;
  return (
    <section id="party" className="field-brand relative scroll-mt-4 border-t border-current" style={brandVars(b)} aria-labelledby="party-title">
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-12">
          <figure data-reveal className="relative aspect-[3/2] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[58svh] md:border-r md:border-current">
            <StudioImg k="party-five-purple" sizes="(max-width: 768px) 100vw, 58vw" pos="50% 60%" className="absolute inset-0 h-full w-full object-cover" />
          </figure>
          <div className="flex flex-col justify-between gap-8 px-[var(--gutter)] py-8 md:col-span-5 md:px-8">
            <Chapter n={n} label="Суб-линейка" />
            <div>
              <h2 id="party-title" className="text-[clamp(38px,5vw,84px)] leading-[0.92]" style={brandType(b)}>{b.subline.name}</h2>
              <p className="t-m mt-5 max-w-[26ch]">{b.subline.note[0].toUpperCase() + b.subline.note.slice(1)}: {items.length} вкусов, своя этикетка — и тот же дом.</p>
              <p className="t-tag mt-6 flex items-center gap-3 opacity-80"><span className="t-num">{String(items.length).padStart(2, "0")}</span><span className="h-px w-8 bg-current" />бутылка 0,45 л</p>
            </div>
          </div>
        </div>
      )}
      {compact && (
        <div className="wrap flex flex-wrap items-end justify-between gap-4 border-b border-current pb-5 pt-8">
          <div>
            <p className="t-tag mb-3 opacity-80">Суб-линейка · {b.subline.note}</p>
            <h3 id="party-title" className="text-[clamp(30px,4vw,64px)] leading-[0.92]" style={brandType(b)}>{b.subline.name}</h3>
          </div>
          <span className="chip t-num">{String(items.length).padStart(2, "0")} в индексе</span>
        </div>
      )}
      <BrandRange b={b} items={items} offset={offset} />
    </section>
  );
}

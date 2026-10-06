import type { Metadata } from "next";
import Link from "next/link";
import { BrandLink } from "@/components/BrandLink";
import { notFound } from "next/navigation";
import { BRANDS, brandBySlug, brandType, brandVars } from "@/data/brands";
import { mainLine, partyLine, productsOf } from "@/data/catalog";
import { BrandPoster } from "@/components/BrandPoster";
import { BrandRange } from "@/components/BrandRange";
import { PartyLine } from "@/components/PartyLine";
import { Chapter, Fit } from "@/components/primitives";
import { ProcessTeaser } from "@/components/ProcessTeaser";
import { BRAND_FORMATS } from "@/data/formats";

export const dynamicParams = false;
const HERE = BRANDS.filter((b) => !b.site); // brands with an official site redirect there: src/app/brands/<slug>/page.tsx
export function generateStaticParams() { return HERE.map((b) => ({ slug: b.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = brandBySlug((await params).slug)!;
  return { title: b.name, description: `${b.name} — ${b.kind}. ${b.line}`, alternates: { canonical: `/brands/${b.slug}/` } };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = brandBySlug((await params).slug);
  if (!b) notFound();
  const i = BRANDS.indexOf(b);
  const next = BRANDS[(i + 1) % BRANDS.length];
  const items = productsOf(b.slug);
  const main = mainLine(items);
  const count = `${main.length} ${main.length === 3 ? "характера" : "позиций"}`;

  return (
    <>
      <BrandPoster b={b} index={i} total={BRANDS.length} />

      {/* the range stays on the brand's own plane, in its own face */}
      {items.length > 0 && (
        <section id="line" className="field-brand relative scroll-mt-4 border-t border-current" style={brandVars(b)} aria-labelledby="line-title">
          <div className="wrap pb-8 pt-[clamp(50px,5.9vw,90px)]">
            <Chapter n="01" label="Линейка" className="mb-6" />
            <h2 id="line-title" className="t-xl" style={{ fontFamily: "var(--f-master)" }}>{count}</h2>
            {BRAND_FORMATS[b.slug]?.includes("keg") && <p className="mt-3 max-w-[52ch] text-[14px] leading-snug opacity-75">Линейка выпускается и в кегах — для баров и магазинов разливных напитков. Ниже — бутылки.</p>}
          </div>
          <BrandRange b={b} items={mainLine(items)} />
        </section>
      )}

      <PartyLine b={b} items={partyLine(items)} />

      {items.length > 0 && b.family === "alcohol" && (
        <section className="field-white relative border-t border-current" aria-labelledby="made-title">
          <div className="wrap grid grid-cols-1 items-end gap-8 py-[clamp(44px,5vw,80px)] md:grid-cols-12">
            <div className="md:col-span-4">
              <Chapter n={partyLine(items).length ? "03" : "02"} label="Производство" className="mb-5" />
              <h2 id="made-title" className="t-l">Как это<br />сделано</h2>
              <p className="mt-4 max-w-[34ch] text-[15px] leading-snug">{b.kind === "медовуха" ? "Мёд" : "Основа"}, натуральные соки, брожение и лабораторная проверка каждой партии.</p>
              <Link href="/production/" className="t-tag fill-link mt-5 inline-block">Как создаётся CIDERHOUSE →</Link>
            </div>
            <div className="md:col-span-8"><ProcessTeaser pick={[1, 2, 3]} compact /></div>
          </div>
        </section>
      )}

      <BrandLink b={next} className="field-brand group relative block overflow-hidden border-t border-current" style={brandVars(next)}>
        <div className="wrap relative pb-10 pt-12">
          <p className="t-tag mb-4">Следующий бренд →</p>
          <Fit max={170} style={brandType(next)} className="transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-[1.5vw]">{next.name}</Fit>
        </div>
      </BrandLink>
    </>
  );
}

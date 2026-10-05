import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, brandBySlug, brandType, brandVars } from "@/data/brands";
import { productsOf } from "@/data/catalog";
import { BrandPoster } from "@/components/BrandPoster";
import { BrandRange } from "@/components/BrandRange";
import { Chapter, Fit } from "@/components/primitives";

export const dynamicParams = false;
export function generateStaticParams() { return BRANDS.map((b) => ({ slug: b.slug })); }

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
  const count = `${items.length} ${items.length === 3 ? "характера" : "позиций"}`;

  return (
    <>
      <BrandPoster b={b} index={i} total={BRANDS.length} />

      {/* the range stays on the brand's own plane, in its own face */}
      {items.length > 0 && (
        <section id="line" className="field-brand relative scroll-mt-4 border-t border-current" style={brandVars(b)} aria-labelledby="line-title">
          <div className="wrap pb-8 pt-[clamp(50px,5.9vw,90px)]">
            <Chapter n="01" label="Линейка" className="mb-6" />
            <h2 id="line-title" className="t-xl" style={{ fontFamily: "var(--f-master)" }}>{count}</h2>
          </div>
          <BrandRange b={b} items={items} />
        </section>
      )}

      <Link href={`/brands/${next.slug}/`} className="field-brand group relative block overflow-hidden border-t border-current" style={brandVars(next)}>
        <div className="wrap relative pb-10 pt-12">
          <p className="t-tag mb-4">Следующий бренд →</p>
          <Fit max={170} style={brandType(next)} className="transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-[1.5vw]">{next.name}</Fit>
        </div>
      </Link>
    </>
  );
}

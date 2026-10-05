import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VERIFIED, productBySlug } from "@/data/catalog";
import { SITE } from "@/data/site";
import { MarketRows } from "@/components/Blocks";
import { flavourAccent } from "@/lib/flavour";
import { Bottle, Chapter, Fit, Reveal, Swatch } from "@/components/primitives";

export const dynamicParams = false;
export function generateStaticParams() { return VERIFIED.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug)!;
  return {
    title: `${p.nameRu} — ZER° CIDER 0,0%`,
    description: p.description,
    alternates: { canonical: `/katalog/${p.slug}/` },
    openGraph: { images: [{ url: `${p.image}-600.webp`, alt: p.name }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p || !p.verified) notFound();
  const idx = VERIFIED.indexOf(p);
  const next = VERIFIED[(idx + 1) % VERIFIED.length];
  const accent = flavourAccent(p.name), nextAccent = flavourAccent(next.name);
  const lines = p.nameRu.includes(" · ") ? p.nameRu.split(" · ") : p.nameRu.split(" ");
  const specs: [string, string][] = [["Характер", p.character ?? "—"], ["Крепость", p.abv ?? "—"], ["Идеален для", p.idealFor ?? "—"]];
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, alternateName: `ZER° CIDER ${p.nameRu}`,
    description: p.description, image: `${SITE.url}${p.image}-900.webp`, brand: { "@type": "Brand", name: "ZER° CIDER" },
    manufacturer: { "@type": "Organization", name: "CIDERHOUSE" },
  };

  return (
    <article className="voice-zero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* system: white / black / purple — flavour: one accent plane behind the bottle */}
      <section className="field-white relative z-10">
        <div className="wrap grid min-h-[92svh] grid-cols-1 gap-x-8 pt-[clamp(84px,9vw,120px)] md:grid-cols-12">
          <div className="flex flex-col justify-between gap-8 pb-8 md:col-span-7">
            <nav aria-label="Хлебные крошки" className="t-tag flex flex-wrap items-center gap-3 border-b border-current pb-4">
              <Link className="fill-link" href="/katalog/">Ассортимент</Link><span aria-hidden="true">/</span>
              <Link className="fill-link" href="/brands/zero/">ZER° CIDER</Link><span aria-hidden="true">/</span>
              <span className="flex items-center gap-2"><Swatch color={accent} className="text-[14px]" />{p.nameRu}</span>
            </nav>
            <div>
              <p className="t-tag mb-4 flex items-center gap-3"><span className="text-purple">{p.abv}</span><span className="h-px w-10 bg-current" />{p.character} · безалкогольный сидр</p>
              <h1><span className="sr-only">{p.nameRu}</span><span aria-hidden="true">{lines.map((l, i) => <Fit key={i} max={220} delay={i * 0.08}>{l}</Fit>)}</span></h1>
              <p className="t-tag mt-5">{p.name}</p>
            </div>
            <Reveal className="border-t border-current pt-5">
              <p className="t-m max-w-[20ch]">{p.motto}</p>
            </Reveal>
          </div>

          <div className="relative flex min-h-[64svh] items-end justify-center md:col-span-5 md:min-h-0">
            <div aria-hidden="true" data-slap className="absolute inset-y-0 left-1/2 w-[64%] -translate-x-1/2" style={{ background: accent }} />
            <span aria-hidden="true" className="t-num absolute left-0 top-[10%] bg-purple px-3 py-2 text-[clamp(34px,4.4vw,68px)] font-bold leading-none tracking-[-0.04em] text-white">{p.abv}</span>
            <div data-par-y="0.1" className="relative z-10 translate-y-[13%]"><Bottle base={p.image!} alt={`${p.name} — оригинальная фотография бутылки`} priority sizes="(max-width:768px) 52vw, 26vw" className="h-[60svh] md:h-[80svh]" /></div>
          </div>
        </div>
      </section>

      <section className="field-black relative">
        <div className="wrap grid grid-cols-1 gap-10 pb-[clamp(50px,5.9vw,90px)] pt-[clamp(120px,15vw,220px)] md:grid-cols-12">
          <div className="md:col-span-3"><Chapter n="01" label="Вкус" /></div>
          <div className="md:col-span-9">
            <Reveal as="p" className="t-m balance">{p.description}</Reveal>
            <dl className="mt-12 grid grid-cols-1 border-l border-t border-current sm:grid-cols-3">
              {specs.map(([k, v], i) => (
                <div key={k} data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }} className="border-b border-r border-current p-5">
                  <dt className="t-tag opacity-70">{k}</dt>
                  <dd className="mt-8 text-[clamp(20px,1.9vw,28px)] font-bold leading-[1.1] tracking-[-0.02em]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="field-white relative">
        <div className="wrap grid grid-cols-1 gap-10 py-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <div className="md:col-span-3"><Chapter n="02" label="Где купить" /></div>
          <div className="md:col-span-9"><MarketRows /></div>
        </div>
      </section>

      <Link href={`/katalog/${next.slug}/`} className="field-purple group relative block overflow-hidden">
        <div className="wrap flex items-end justify-between gap-6 pt-12">
          <div className="min-w-0 flex-1 pb-12">
            <p className="t-tag mb-4 flex items-center gap-3"><Swatch color={nextAccent} className="text-[14px]" />Следующий характер →</p>
            <p className="t-xl transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-4">{next.nameRu}</p>
          </div>
          <Bottle base={next.image!} alt="" sizes="12vw" className="h-[38vh] shrink-0 translate-y-[18%] transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-y-[8%]" />
        </div>
      </Link>
    </article>
  );
}

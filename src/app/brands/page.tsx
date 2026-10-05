import type { Metadata } from "next";
import Link from "next/link";
import { BrandLink } from "@/components/BrandLink";
import { BRANDS, brandType } from "@/data/brands";
import { BrandIndex } from "@/components/BrandIndex";
import { Chapter } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Бренды",
  description: "Бренды CIDERHOUSE: White Phoenix, Mister Bee, Double Tree и направление 0% — ZER° CIDER, Bumble Coffee (Black Phoenix), Migliore.",
  alternates: { canonical: "/brands/" },
};

const FAMILIES = [
  { id: "alcohol" as const, title: "Алкогольный портфель", note: "сидр, медовуха и самостоятельные линейки" },
  { id: "zero" as const, title: "Направление 0%", note: "безалкогольный сидр, кофе в банке и новый запуск" },
];

export default function Brands() {
  return (
    <>
      <BrandIndex heading="h1" first />

      <section className="field-purple relative" aria-labelledby="families-title">
        <div className="wrap py-[clamp(50px,5.9vw,90px)]">
          <Chapter n="02" label="Архитектура портфеля" className="mb-6" />
          <h2 id="families-title" className="t-xl mb-10">Два портфеля —<br />один дом</h2>
          <div className="grid grid-cols-1 border-l border-t border-current md:grid-cols-2">
            {FAMILIES.map((f, k) => (
              <div key={f.id} data-reveal className="border-b border-r border-current p-6 md:p-8" style={{ ["--d" as string]: `${k * 0.08}s` }}>
                <p className="t-tag mb-4 opacity-80">{String(k + 1).padStart(2, "0")} · {f.note}</p>
                <h3 className="t-l">{f.title}</h3>
                <ul className="mt-8 border-t border-current">
                  {BRANDS.filter((b) => b.family === f.id).map((b) => (
                    <li key={b.slug} className="border-b border-current last:border-b-0">
                      <BrandLink b={b} className="group flex items-center justify-between gap-4 py-3">
                        <span className="text-[clamp(24px,2.6vw,40px)] leading-none transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-2" style={brandType(b)}>{b.name}</span>
                        <span aria-hidden="true" className="sq">{b.site ? "↗" : "→"}</span>
                      </BrandLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

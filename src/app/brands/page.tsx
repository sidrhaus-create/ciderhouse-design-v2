import type { Metadata } from "next";
import Link from "next/link";
import { BrandTile } from "@/components/BrandCover";
import { StudioImg } from "@/components/Studio";
import { Chapter } from "@/components/primitives";
import { BRANDS, brandBySlug } from "@/data/brands";
import { HOUSE_COVER } from "@/data/photos";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Бренды",
  description: "Бренды CIDERHOUSE: Double Tree, White Phoenix, Mister Bee и направление 0% — ZER° CIDER.",
  alternates: { canonical: "/brands/" },
};

const b = (s: string) => brandBySlug(s)!;

/** The portfolio as a spread of campaign tiles: the house line-up first, then the alcohol portfolio and the 0% direction. */
export default function Brands() {
  const alcohol = BRANDS.filter((x) => x.family === "alcohol");
  const zero = BRANDS.filter((x) => x.family === "zero");
  return (
    <>
      {/* the house: one line-up photograph, the name of the house, the two portfolios */}
      <section className="field-white relative" aria-labelledby="brands-title">
        <div className="wrap pt-[clamp(92px,9vw,128px)]">
          <div className="mb-[clamp(18px,2vw,30px)] flex items-center justify-between gap-6 border-b border-current pb-4">
            <Chapter n="—" label="Бренды" />
            <p className="t-tag hidden items-center gap-3 md:flex"><span className="t-num">{String(BRANDS.length).padStart(2, "0")}</span><span className="h-px w-10 bg-current" /><span>характеров · один дом</span></p>
          </div>
          <div className="grid grid-cols-1 items-end gap-x-10 gap-y-6 pb-8 md:grid-cols-12">
            <h1 id="brands-title" data-reveal className="t-poster balance text-[clamp(34px,6.4vw,112px)] leading-[0.92] md:col-span-7">Четыре<br />характера</h1>
            <p className="t-m balance md:col-span-5 md:pb-[0.6vw]" data-reveal>Сидр, медовуха и направление 0%. У каждого бренда — свой цвет, свой шрифт и свой голос; дом один.</p>
          </div>
        </div>
        <figure data-reveal className="relative h-[44svh] overflow-hidden border-y border-current md:h-[66svh]">
          <StudioImg k={HOUSE_COVER} sizes="100vw" priority pos="50% 62%" className="absolute inset-0 h-full w-full object-cover" />
          <figcaption className="t-tag absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-[var(--ch-ink)] px-[var(--gutter)] py-3 text-[var(--ch-paper)]">
            <span>{SITE.name} · сидр и медовуха</span><span className="opacity-70">Double Tree · White Phoenix</span>
          </figcaption>
        </figure>
      </section>

      {/* alcohol portfolio: Double Tree leads, two tiles beside it */}
      <section className="field-white relative" aria-labelledby="alc-title">
        <div className="wrap flex flex-col gap-4 pb-6 pt-[clamp(44px,5.4vw,84px)] md:flex-row md:items-end md:justify-between">
          <div>
            <Chapter n="01" label="Алкогольный портфель" className="mb-5" />
            <h2 id="alc-title" className="t-l">Сидр и медовуха</h2>
          </div>
          <p className="t-tag md:text-right">{alcohol.length} бренда · бутылки и кеги</p>
        </div>
        <div className="grid grid-cols-1 gap-px border-y border-current bg-current sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:row-span-2"><BrandTile b={b("double-tree")} n={1} big aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(62vw,760px)]" sizes="(max-width: 1024px) 100vw, 58vw" /></div>
          <div className="lg:col-span-5"><BrandTile b={b("white-phoenix")} n={2} aspect="aspect-[4/5] sm:aspect-[4/3]" sizes="(max-width: 640px) 100vw, 42vw" delay={0.08} /></div>
          <div className="lg:col-span-5"><BrandTile b={b("mister-bee")} n={3} aspect="aspect-[4/5] sm:aspect-[4/3]" sizes="(max-width: 640px) 100vw, 42vw" delay={0.16} /></div>
        </div>
      </section>

      {/* 0% direction: three equal tiles */}
      <section className="field-black relative" aria-labelledby="zero-title">
        <div className="wrap flex flex-col gap-4 pb-6 pt-[clamp(44px,5.4vw,84px)] md:flex-row md:items-end md:justify-between">
          <div>
            <Chapter n="02" label="Направление 0%" className="mb-5" />
            <h2 id="zero-title" className="t-l">Без градуса</h2>
          </div>
          <Link href="/non-alcoholic/" className="btn self-start md:self-auto">Направление 0%</Link>
        </div>
        <div className="border-y border-current">
          {zero.map((x) => <BrandTile key={x.slug} b={x} n={alcohol.length + 1} big variant="wide" aspect="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" sizes="100vw" />)}
        </div>
        <div className="wrap py-6"><p className="max-w-[60ch] text-[14.5px] leading-snug opacity-75">ZER° CIDER живёт на собственном сайте — ссылка откроется в новой вкладке.</p></div>
      </section>
    </>
  );
}

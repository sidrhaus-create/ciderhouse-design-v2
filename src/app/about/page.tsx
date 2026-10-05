import type { Metadata } from "next";
import Link from "next/link";
import { BrandLink } from "@/components/BrandLink";
import { PageHero } from "@/components/PageHero";
import { ProcessTeaser } from "@/components/ProcessTeaser";
import { Chapter, Reveal } from "@/components/primitives";
import { BRANDS, brandType } from "@/data/brands";
import { ABOUT_FACTS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "О компании",
  description: `CIDERHOUSE — на рынке с ${SITE.since} года. Разрабатываем и производим сидр и медовуху с натуральными фруктовыми соками: бутылки и кеги, производство в Краснодарском крае и Тверской области.`,
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <>
      <PageHero
        id="a-title"
        label="О компании"
        lines={[`С ${SITE.since} года`]}
        lead="CIDERHOUSE разрабатывает и производит сидр и медовуху. Мы ищем необычные сочетания вкусов и делаем их на натуральных фруктовых соках."
        aside={<><span>{SITE.name}</span><span className="h-px w-10 bg-current" /><span>{SITE.tagline}</span></>}
      />

      {/* the house in four facts */}
      <section className="field-purple relative" aria-label="Коротко о компании">
        <dl className="grid grid-cols-1 border-t border-current/40 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_FACTS.map((f, i) => (
            <div key={f.k} data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }} className="min-w-0 border-b border-r border-current/40 px-[var(--gutter)] py-6 lg:py-8">
              <dd className="text-[clamp(22px,2.5vw,42px)] font-black uppercase leading-[0.95] tracking-[-0.04em]">{f.v}</dd>
              <dt className="t-tag mt-5">{f.k}</dt>
              <p className="mt-2 max-w-[26ch] text-[13.5px] leading-snug opacity-80">{f.note}</p>
            </div>
          ))}
        </dl>
      </section>

      <section className="field-white relative" aria-labelledby="a-what">
        <div className="wrap grid grid-cols-1 gap-10 py-[clamp(56px,7vw,112px)] md:grid-cols-12">
          <div className="md:col-span-5">
            <Chapter n="01" label="Что мы делаем" className="mb-6" />
            <h2 id="a-what" className="t-xl">Сидр<br />и медовуха</h2>
          </div>
          <div className="md:col-span-7 md:pt-[clamp(40px,4vw,64px)]">
            <Reveal as="p" className="t-m balance">Мы создаём напитки естественного брожения: сидр — на яблочном соке, медовуху — на мёде. Вкус дают натуральные фруктовые и ягодные соки, поэтому в линейках дома рядом стоят классика и неожиданные пары.</Reveal>
            <Reveal as="p" className="mt-6 max-w-[56ch] text-[16px] leading-relaxed">Напитки выпускаем в бутылках и кегах — для полки магазина и для бара. Производство работает в Краснодарском крае и Тверской области.</Reveal>
            <div className="mt-8 flex flex-wrap">
              <Link href="/katalog/" className="btn btn-solid">Ассортимент</Link>
              <Link href="/map/" className="btn -ml-px">Где купить</Link>
            </div>
          </div>
        </div>
      </section>

      {/* brands of the house */}
      <section className="field-black relative" aria-labelledby="a-brands">
        <div className="wrap pb-2 pt-[clamp(56px,7vw,112px)]">
          <Chapter n="02" label="Бренды дома" className="mb-6" />
          <h2 id="a-brands" className="t-xl mb-10">Один дом —<br />разные характеры</h2>
        </div>
        <ul className="grid grid-cols-1 border-t border-current sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b) => (
            <li key={b.slug} className="border-b border-current sm:border-r">
              <BrandLink b={b} className="group flex h-full min-h-[150px] flex-col justify-between gap-6 px-[var(--gutter)] py-6">
                <span className="t-tag flex items-center justify-between opacity-70"><span>{b.kind}</span><span aria-hidden="true">{b.site ? "↗" : "→"}</span></span>
                <span className="text-[clamp(26px,2.6vw,40px)] leading-none transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-2" style={brandType(b)}>{b.name}</span>
              </BrandLink>
            </li>
          ))}
        </ul>
      </section>

      {/* production: a fragment of the same drawing system */}
      <section className="field-white relative" aria-labelledby="a-prod">
        <div className="wrap py-[clamp(56px,7vw,112px)]">
          <div className="mb-8 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <Chapter n="03" label="Производство" className="mb-6" />
              <h2 id="a-prod" className="t-xl">Как это<br />сделано</h2>
            </div>
            <div className="md:col-span-5 md:pb-2">
              <p className="t-m">Сок и мёд, брожение по европейской технологии, лабораторная проверка каждой партии.</p>
              <Link href="/production/" className="btn btn-solid mt-6">Как создаётся CIDERHOUSE</Link>
            </div>
          </div>
          <ProcessTeaser pick={[0, 2, 3, 4]} />
        </div>
      </section>

      <section className="field-purple relative" aria-labelledby="a-cta">
        <div className="wrap grid grid-cols-1 items-end gap-10 py-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <h2 id="a-cta" className="t-xl md:col-span-8">Работать<br />с нами</h2>
          <div className="flex flex-wrap md:col-span-4 md:justify-end">
            <Link href="/contact/" className="btn btn-solid">Контакты</Link>
            <Link href="/clients/" className="btn -ml-px">Партнёры</Link>
          </div>
        </div>
      </section>
    </>
  );
}

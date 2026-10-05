import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MarketRows } from "@/components/Blocks";
import { Chapter } from "@/components/primitives";
import { PARTNERS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Где купить",
  description: "Где купить Cider House: федеральные сети, маркетплейсы OZON, Wildberries, Яндекс Маркет, опт и HoReCa.",
  alternates: { canonical: "/map/" },
};

export default function WhereToBuy() {
  return (
    <>
      <PageHero
        id="map-title"
       
        label="Где купить"
        lines={["Где найти"]}
        lead="Три дороги к бутылке: полка магазина, маркетплейс с доставкой или прямой контракт для бизнеса."
      />

      <section className="relative field-white" aria-labelledby="m-01">
        <div className="wrap grid grid-cols-1 gap-8 pb-[clamp(40px,4.6vw,70px)] pt-[clamp(46px,5.3vw,77px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="01" label="Офлайн" className="mb-5" />
            <h2 id="m-01" className="t-l">Полки<br />сетей</h2>
            <p className="mt-5 max-w-[30ch] text-sm opacity-70">Наличие конкретных позиций зависит от магазина и региона.</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:col-span-8 md:gap-4">
            {PARTNERS.map((p, i) => (
              <li key={p.slug} data-reveal className="flex aspect-[16/10] items-center justify-center border border-current bg-white p-5 transition-[translate] duration-300 hover:-translate-y-1.5" style={{ ["--d" as string]: `${(i % 3) * 0.06}s` }}>
                <img src={`/assets/partners/${p.slug}.svg`} alt={p.name} loading="lazy" className="max-h-[58%] w-auto max-w-[78%] object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative field-black" aria-labelledby="m-02">
        <div className="wrap grid grid-cols-1 gap-8 pb-[clamp(40px,4.6vw,70px)] pt-[clamp(46px,5.3vw,77px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="02" label="Онлайн" className="mb-5" />
            <h2 id="m-02" className="t-l">Маркет-<br />плейсы</h2>
            <p className="mt-5 max-w-[30ch] text-sm opacity-70">Безалкогольная линейка ZER° CIDER 0,0%.</p>
          </div>
          <div className="md:col-span-8"><MarketRows /></div>
        </div>
      </section>

      <section className="relative overflow-hidden field-purple" aria-labelledby="m-03">
        <div className="wrap relative pb-[clamp(40px,4.6vw,70px)] pt-[clamp(46px,5.3vw,77px)]">
          <Chapter n="03" label="Для бизнеса" className="mb-5" />
          <h2 id="m-03" className="t-xl">Опт и HoReCa</h2>
          <div className="mt-8 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <p className="t-m balance md:col-span-6">Для магазинов, баров и ресторанов — напрямую от производителя.</p>
            <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
              <a className="btn" href={`mailto:${SITE.wholesaleEmail}`}>{SITE.wholesaleEmail}</a>
              <Link className="btn btn-solid" href="/contact/">Сотрудничество</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

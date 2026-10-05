import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PartnersBand } from "@/components/PartnersBand";
import { Chapter, Plate } from "@/components/primitives";
import { PARTNERS } from "@/data/site";
import { FormatMark } from "@/components/Formats";
import { FORMATS, brandsWith, type FormatId } from "@/data/formats";

export const metadata: Metadata = {
  title: "Партнёры",
  description: "Партнёры CIDERHOUSE — федеральные торговые сети: X5 Group, Пятёрочка, Перекрёсток, Магнит, Лента, О'КЕЙ, ВинЛаб, ДА!, Монетка.",
  alternates: { canonical: "/clients/" },
};

export default function Clients() {
  return (
    <>
      <PageHero
        id="cl-title"
       
        label="Партнёры"
        lines={["Нам доверяют"]}
        lead={<>{PARTNERS.length} федеральных и региональных сетей, на полках которых стоят наши продукты.</>}
      />

      <section className="relative overflow-hidden field-white" aria-label="Логотипы сетей">
        <div className="space-y-2 pb-[clamp(35px,4vw,61px)] pt-[clamp(40px,4.6vw,70px)]">
          <PartnersBand />
          <PartnersBand reverse />
        </div>
      </section>

      <section className="relative field-black" aria-labelledby="cl-formats">
        <div className="wrap pb-8 pt-[clamp(50px,5.9vw,90px)]">
          <Chapter n="01" label="Для полки и для бара" className="mb-5" />
          <h2 id="cl-formats" className="t-xl">Форматы<br />для партнёров</h2>
        </div>
        <ul className="grid grid-cols-1 border-t border-current md:grid-cols-3">
          {(["bottle-045", "bottle-075", "keg"] as FormatId[]).map((f) => (
            <li key={f} data-reveal className={`flex min-h-[300px] flex-col justify-between gap-8 border-b border-current px-[var(--gutter)] py-7 md:border-r ${f === "keg" ? "bg-purple text-white [--field:var(--ch-purple)] [--on:var(--ch-paper)]" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[clamp(24px,2.6vw,42px)] font-extrabold uppercase leading-[0.98] tracking-[-0.035em]">{FORMATS[f].label}</h3>
                <FormatMark id={f} className="h-16 w-14" />
              </div>
              <div>
                <p className="t-tag mb-3 opacity-70">Линейки</p>
                <ul className="flex flex-wrap gap-2">{brandsWith(f).map((b) => <li key={b.slug} className="chip">{b.name}</li>)}</ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="wrap flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[60ch] text-[14.5px] leading-snug opacity-80">Состав вкусов в каждом формате и условия поставки пришлём по запросу.</p>
          <Link href="/contact/" className="btn btn-solid self-start md:self-auto">Запросить условия</Link>
        </div>
      </section>

      <section className="relative field-white" aria-labelledby="cl-list">
        <div className="wrap grid grid-cols-1 gap-10 pb-[clamp(43px,5.3vw,77px)] pt-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="02" label="Список" className="mb-5" />
            <h2 id="cl-list" className="t-l">Сети</h2>
            <Link href="/contact/" className="btn btn-solid mt-8">Стать партнёром</Link>
          </div>
          <ol className="md:col-span-8">
            {PARTNERS.map((p, i) => (
              <li key={p.slug} data-reveal className="group flex items-end justify-between gap-4 border-t border-current py-2 last:border-b">
                <span className="t-l transition-transform duration-500 group-hover:translate-x-3">{p.name}</span>
                <span className="t-tag t-num mb-3 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

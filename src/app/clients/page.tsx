import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PartnersBand } from "@/components/PartnersBand";
import { Chapter, Plate } from "@/components/primitives";
import { PARTNERS } from "@/data/site";

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

      <section className="relative field-white" aria-labelledby="cl-list">
        <div className="wrap grid grid-cols-1 gap-10 pb-[clamp(43px,5.3vw,77px)] pt-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="01" label="Список" className="mb-5" />
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

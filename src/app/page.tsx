import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Tape } from "@/components/Tape";
import { Manifesto } from "@/components/Manifesto";
import { BrandCorridor } from "@/components/BrandCorridor";
import { ZeroScrub } from "@/components/ZeroScrub";
import { Conveyor } from "@/components/Conveyor";
import { PartnersBand } from "@/components/PartnersBand";
import { Chapter, Reveal } from "@/components/primitives";
import { SITE } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* 02 — manifesto on the master purple */}
      <section className="field-purple relative" aria-labelledby="manifesto-title">
        <div className="wrap grid grid-cols-1 gap-8 py-[clamp(69px,7.9vw,128px)] md:grid-cols-12">
          <div className="md:col-span-3">
            <Chapter n="02" label="Манифест" />
            <h2 id="manifesto-title" className="sr-only">Манифест CIDERHOUSE</h2>
          </div>
          <Manifesto
            className="text-[clamp(24px,3.5vw,60px)] font-extrabold uppercase leading-[1.08] tracking-[-0.03em] md:col-span-8"
            accents={["сидр", "медовуху", "ноль", "цвет"]}
            text="Один дом — шесть характеров. Мы делаем сидр и медовуху, учим ноль градусов звучать вкусно и даём каждому бренду свой цвет и свой голос."
          />
        </div>
      </section>

      <Tape />

      {/* 03 — the brand corridor: four worlds, one sideways journey */}
      <BrandCorridor />

      {/* 04 — zero: scroll-scrubbed studio film */}
      <ZeroScrub />

      {/* 05 — production conveyor */}
      <section aria-labelledby="prod-title" className="field-black relative">
        <Conveyor
          header={
            <div className="flex flex-col gap-5 border-b border-current pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Chapter n="05" label="Производство" className="mb-6" />
                <h2 id="prod-title" className="t-xl">От яблока<br />до бутылки</h2>
              </div>
              <div className="flex items-center gap-6">
                <p className="t-tag hidden text-right lg:block">Восемь шагов<br />листайте →</p>
                <Link href="/production/" className="btn">Весь процесс</Link>
              </div>
            </div>
          }
        />
      </section>

      {/* 06 — shelves */}
      <section aria-labelledby="shelf-title" className="field-white relative overflow-hidden">
        <div className="wrap flex flex-col gap-6 pb-10 pt-[clamp(60px,7.3vw,109px)] md:flex-row md:items-end md:justify-between">
          <div>
            <Chapter n="06" label="Партнёры" className="mb-6" />
            <h2 id="shelf-title" className="t-xl">На полках<br />страны</h2>
          </div>
          <Link href="/clients/" className="btn self-start md:self-auto">Все партнёры</Link>
        </div>
        <div className="border-y border-black pb-0">
          <PartnersBand />
        </div>
        <div className="-mt-px border-b border-black mb-[clamp(84px,11vw,170px)]">
          <PartnersBand reverse />
        </div>
      </section>

      {/* 07 — wholesale */}
      <section aria-labelledby="opt-title" className="field-purple relative overflow-hidden">
        <div className="wrap relative pb-[clamp(60px,7.3vw,109px)] pt-[clamp(60px,7.3vw,109px)]">
          <div className="mb-6 flex items-center justify-between">
            <Chapter n="07" label="Сотрудничество" />
            <span className="t-tag">Напрямую от производителя</span>
          </div>
          <h2 id="opt-title" className="t-xl">Опт · HoReCa · сети</h2>
          <div className="mt-8 grid grid-cols-1 items-end gap-8 border-t border-current pt-8 md:grid-cols-12">
            <Reveal className="t-m balance md:col-span-6">Для магазинов, баров и ресторанов. Напишите — пришлём условия и актуальный ассортимент.</Reveal>
            <div className="flex flex-wrap md:col-span-6 md:justify-end">
              <a className="btn btn-solid" href={`mailto:${SITE.wholesaleEmail}`}>{SITE.wholesaleEmail}</a>
              <Link className="btn -ml-px" href="/contact/">Условия</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Tape } from "@/components/Tape";
import { Manifesto } from "@/components/Manifesto";
import { BrandCorridor } from "@/components/BrandCorridor";
import { ZeroScrub } from "@/components/ZeroScrub";
import { ProcessTeaser } from "@/components/ProcessTeaser";
import { HomeNews } from "@/components/HomeNews";
import { PhotoBand } from "@/components/Studio";
import { Formats } from "@/components/Formats";
import { PartnersBand } from "@/components/PartnersBand";
import { Chapter, Reveal } from "@/components/primitives";
import { SITE, EMAIL, CONTACTS, mailto } from "@/data/site";

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
            text="Один дом — четыре характера. Мы делаем сидр и медовуху, учим ноль градусов звучать вкусно и даём каждому бренду свой цвет и свой голос."
          />
        </div>
      </section>

      <Tape />

      {/* 03 — the brand corridor: four worlds, one sideways journey */}
      <BrandCorridor />

      {/* 04 — zero: scroll-scrubbed studio film */}
      <ZeroScrub />

      {/* 05 — production: a compressed sequence, the gateway to the full story */}
      <section aria-labelledby="prod-title" className="field-black relative">
        <div className="wrap py-[clamp(56px,7vw,112px)]">
          <div className="mb-8 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <Chapter n="05" label="Производство" className="mb-6" />
              <h2 id="prod-title" className="t-xl">От сока и мёда<br />до бутылки</h2>
            </div>
            <div className="md:col-span-5 md:pb-2">
              <p className="t-m">Яблочный сок и мёд, натуральные соки, брожение, лаборатория, розлив.</p>
              <Link href="/production/" className="btn btn-solid mt-6">Как создаётся CIDERHOUSE</Link>
            </div>
          </div>
          <ProcessTeaser />
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Formats ids={["bottle-045", "bottle-075", "keg"]} />
            <Link href="/katalog/" className="t-tag fill-link self-start md:self-auto">Ассортимент по форматам →</Link>
          </div>
        </div>
      </section>

      {/* 06 — news: what is happening in the house now */}
      <HomeNews n="06" />

      <PhotoBand k="dt-075-lying-purple" caption="Double Tree · бутылки 0,75 л" pos="50% 50%">
        <Link href="/brands/double-tree/" className="fill-link">К бренду →</Link>
      </PhotoBand>

      {/* 07 — shelves */}
      <section aria-labelledby="shelf-title" className="field-white relative overflow-hidden">
        <div className="wrap flex flex-col gap-6 pb-10 pt-[clamp(60px,7.3vw,109px)] md:flex-row md:items-end md:justify-between">
          <div>
            <Chapter n="07" label="Партнёры" className="mb-6" />
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

      {/* 08 — wholesale */}
      <section aria-labelledby="opt-title" className="field-purple relative overflow-hidden">
        <div className="wrap relative pb-[clamp(60px,7.3vw,109px)] pt-[clamp(60px,7.3vw,109px)]">
          <div className="mb-6 flex items-center justify-between">
            <Chapter n="08" label="Сотрудничество" />
            <span className="t-tag">Напрямую от производителя</span>
          </div>
          <h2 id="opt-title" className="t-xl">Опт · HoReCa · сети</h2>
          <div className="mt-8 grid grid-cols-1 items-end gap-8 border-t border-current pt-8 md:grid-cols-12">
            <Reveal className="t-m balance md:col-span-6">Для магазинов, баров и ресторанов. Напишите — пришлём условия и актуальный ассортимент.</Reveal>
            <div className="flex flex-wrap md:col-span-6 md:justify-end">
              <a className="btn btn-solid" href={mailto("Сотрудничество с CIDERHOUSE")}>{EMAIL}</a>
              <a className="btn -ml-px" href={CONTACTS.phone.href}>{CONTACTS.phone.label}</a>
              <Link className="btn -ml-px" href="/contact/#form">Написать</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

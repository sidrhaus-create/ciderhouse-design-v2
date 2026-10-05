import type { Metadata } from "next";
import Link from "next/link";
import { BrandLink } from "@/components/BrandLink";
import { ZeroReel } from "@/components/ZeroReel";
import { MarketRows } from "@/components/Blocks";
import { ProcessTeaser } from "@/components/ProcessTeaser";
import { Bottle, Chapter, Fit, Swatch } from "@/components/primitives";
import { VERIFIED } from "@/data/catalog";
import { BRANDS, brandType, brandVars } from "@/data/brands";
import { ZERO_FACTS } from "@/data/site";
import { flavourAccent } from "@/lib/flavour";

export const metadata: Metadata = {
  title: "Безалкогольное направление 0%",
  description: "ZER° CIDER — безалкогольный сидр 0,0% от CIDERHOUSE: зелёное яблоко, вишня, гранат — малина. А также Bumble Coffee (Black Phoenix) и Migliore.",
  alternates: { canonical: "/non-alcoholic/" },
};

// established slogan of the non-alcoholic direction (brand guide) — quoted exactly; the guide sets it in the Marianna script, which is not in the project
const SLOGAN = "Свобода выбирать вкус, а не градусы";

export default function Zero() {
  const zeroWorld = BRANDS.filter((b) => b.family === "zero");
  return (
    <div className="voice-zero">
      <section className="field-white relative isolate overflow-hidden" aria-labelledby="z-title">
        <div className="wrap pt-[clamp(84px,9vw,120px)]">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-current pb-4">
            <Chapter n="0%" label="Безалкогольное направление" />
            <img src="/assets/brand/zero-lockup-purple.svg" alt="Логотип ZER° CIDER" width={373} height={105} className="h-9 w-auto md:h-12" />
          </div>
          <h1 id="z-title">
            <span className="sr-only">ZER° CIDER — безалкогольный сидр 0,0%</span>
            <span aria-hidden="true"><Fit max={260}>ZER<span className="text-purple">°</span> CIDER</Fit></span>
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-8 border-t border-current pt-6 md:grid-cols-12">
            <div className="flex flex-col justify-between gap-8 pb-8 md:col-span-5">
              <div>
                <p className="t-voice max-w-[16ch] text-purple">{SLOGAN}</p>
                <p className="t-m balance mt-6" data-reveal>Безалкогольный сидр 0,0% от CIDERHOUSE — под марками White Phoenix и Double Tree. Настоящий вкус без единого градуса.</p>
              </div>
              <img src="/assets/brand/zero-percent-900.webp" srcSet="/assets/brand/zero-percent-480.webp 480w, /assets/brand/zero-percent-900.webp 900w" sizes="(max-width: 768px) 40vw, 18vw" alt="Фирменный знак 0% безалкогольной линейки" width={900} height={901} loading="lazy" className="w-[clamp(110px,12vw,190px)]" />
              <div className="flex flex-wrap">
                <a href="https://zerocider.ru" target="_blank" rel="noopener noreferrer" data-external="" className="btn btn-solid">zerocider.ru</a>
                <a href="#z-buy" className="btn -ml-px">Где купить</a>
                <Link href="/production/" className="btn -ml-px">Технология 0,0%</Link>
              </div>
            </div>
            <div className="relative flex items-end justify-center gap-[1.6vw] md:col-span-7">
              <div aria-hidden="true" data-slap className="absolute inset-y-0 left-1/2 w-[86%] -translate-x-1/2 bg-purple" />
              {VERIFIED.map((p, i) => (
                <Link key={p.slug} href={`/katalog/${p.slug}/`} className="group relative flex flex-col items-center" aria-label={`${p.nameRu} — подробнее`}>
                  <Bottle base={p.image!} alt={`ZER° CIDER — ${p.nameRu}`} priority={i === 1} sizes="(max-width:768px) 28vw, 13vw" className="h-[40svh] translate-y-[4%] transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-y-0 md:h-[56svh]" />
                  <span className="chip absolute bottom-4 hidden whitespace-nowrap bg-white text-black md:inline-flex"><Swatch color={flavourAccent(p.name)} className="text-[14px]" />{p.nameRu}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="field-purple relative" aria-labelledby="z-facts">
        <div className="wrap py-[clamp(50px,5.9vw,90px)]">
          <Chapter n="01" label="В чём фишка" className="mb-6" />
          <h2 id="z-facts" className="t-xl mb-10">Ноль градусов.<br />Сто процентов сидра.</h2>
          <ol className="grid grid-cols-1 border-l border-t border-current sm:grid-cols-2 lg:grid-cols-4">
            {ZERO_FACTS.map((f, i) => (
              <li key={f.k} data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }} className="flex min-h-[240px] flex-col justify-between border-b border-r border-current p-5">
                <span className="t-num text-[64px] font-bold leading-[0.8] tracking-[-0.05em]">{f.k}</span>
                <span>
                  <h3 className="text-[clamp(20px,1.7vw,26px)] font-bold leading-[1.05] tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-snug opacity-85">{f.text}</p>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="t-tag mb-3">Как это сделано</p>
              <p className="text-[15px] leading-snug opacity-90">Яблочный сок, брожение и лабораторная проверка каждой партии.</p>
              <Link href="/production/" className="t-tag fill-link mt-4 inline-block">Как создаётся CIDERHOUSE →</Link>
            </div>
            <div className="md:col-span-8"><ProcessTeaser pick={[0, 2, 3]} compact /></div>
          </div>
        </div>
      </section>

      <section className="field-white relative" aria-labelledby="z-film">
        <div className="wrap grid grid-cols-1 items-end gap-8 py-[clamp(50px,5.9vw,90px)] lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Chapter n="02" label="Студия" className="mb-6" />
            <h2 id="z-film" className="t-l">Три<br />характера<br />в кадре</h2>
            <p className="t-lead mt-6">Плёнка из 49 кадров. Перетащите — и камера опустится от крышек к этикеткам.</p>
            <p className="t-tag mt-6">Тяните кадр →</p>
          </div>
          <ZeroReel className="aspect-[1100/618] w-full border border-black bg-black lg:col-span-8" />
        </div>
      </section>

      <section className="field-black relative" aria-labelledby="z-world">
        <div className="wrap py-[clamp(50px,5.9vw,90px)]">
          <Chapter n="03" label="Экосистема 0%" className="mb-6" />
          <h2 id="z-world" className="t-xl mb-10">Мир без градуса</h2>
          <ul className="grid grid-cols-1 border-l border-t border-white md:grid-cols-3">
            {zeroWorld.map((b) => (
              <li key={b.slug} className="border-b border-r border-white">
                <BrandLink b={b} className="field-brand group flex min-h-[42vh] flex-col justify-between p-6" style={brandVars(b)}>
                  <span className="chip self-start">{b.kind}</span>
                  <span>
                    <span className="block text-[clamp(34px,3.8vw,64px)] leading-[0.95]" style={brandType(b)}>{b.name}</span>
                    <span className="mt-3 block text-[15px] font-medium leading-snug">{b.line}</span>
                  </span>
                  <span className="t-tag flex items-center gap-3">{b.status === "coming-soon" ? "скоро" : "к бренду"}<span aria-hidden="true" className="sq">→</span></span>
                </BrandLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="z-buy" className="field-white relative scroll-mt-4" aria-labelledby="z-buy-title">
        <div className="wrap grid grid-cols-1 gap-10 py-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <div className="md:col-span-4">
            <Chapter n="04" label="Где купить" className="mb-6" />
            <h2 id="z-buy-title" className="t-voice max-w-[14ch] text-purple">{SLOGAN}</h2>
          </div>
          <div className="md:col-span-8"><MarketRows /></div>
        </div>
      </section>
    </div>
  );
}

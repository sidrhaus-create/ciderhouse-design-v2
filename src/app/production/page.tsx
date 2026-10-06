import type { Metadata } from "next";
import Link from "next/link";
import { ProcessStory } from "@/components/ProcessStory";
import { PageHero } from "@/components/PageHero";
import { Chapter } from "@/components/primitives";
import { PROCESS } from "@/data/site";
import { Formats } from "@/components/Formats";

const N = String(PROCESS.length).padStart(2, "0");

export const metadata: Metadata = {
  title: "Производство",
  description: "Как создаётся CIDERHOUSE: яблочный сок и мёд, натуральные фруктовые соки, брожение по европейской технологии, лабораторный контроль каждой партии, розлив в бутылки и кеги.",
  alternates: { canonical: "/production/" },
};

// the story in four plain facts — all of them are stages of PROCESS (src/data/site.ts), nothing estimated
const SPEC: [string, string, string][] = [
  ["Сок и мёд", "основа", "яблочный сок — для сидра, мёд — для медовухи"],
  ["Соки", "натуральные", "фруктовые и ягодные — для вкуса"],
  ["Каждая партия", "лаборатория", "контроль качества на каждом этапе"],
  ["Бутылки и кеги", "розлив", "Краснодарский край и Тверская область"],
];

export default function Production() {
  return (
    <>
      <PageHero
        id="pr-title"
        field="black"
        label="Производство"
        lines={["Всё бродит"]}
        lead="От яблочного сока и мёда — до бутылки и кега. Шесть этапов, из которых складывается каждый напиток дома."
        aside={<><span>Технологическая схема</span><span className="h-px w-10 bg-current" /><span className="t-num">01 — {N}</span></>}
      />

      {/* spec strip: the story in four facts */}
      <section className="field-purple relative" aria-label="Производство коротко">
        <dl className="grid grid-cols-2 border-t border-current/40 lg:grid-cols-4">
          {SPEC.map(([v, k, note], i) => (
            <div key={k} data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }} className="min-w-0 overflow-hidden border-b border-r border-current/40 px-[var(--gutter)] py-6 lg:py-8">
              <dd className="text-[clamp(20px,2.5vw,42px)] font-black uppercase leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere]">{v}</dd>
              <dt className="t-tag mt-5">{k}</dt>
              <p className="mt-2 max-w-[26ch] text-[13.5px] leading-snug opacity-80">{note}</p>
            </div>
          ))}
        </dl>
      </section>

      <section className="field-white relative" aria-labelledby="process-title">
        <div className="wrap flex flex-col gap-5 pb-8 pt-[clamp(56px,7vw,112px)] md:flex-row md:items-end md:justify-between">
          <div>
            <Chapter n="01" label="Процесс" className="mb-6" />
            <h2 id="process-title" className="t-xl">Шесть этапов</h2>
          </div>
          <p className="t-tag md:text-right">Листайте — схема рисуется<br />вместе с рассказом</p>
        </div>
        <ProcessStory />
        {/* where the story ends: filling into the verified formats */}
        <div className="border-t border-current">
          <div className="wrap flex flex-col gap-5 py-[clamp(28px,3.4vw,52px)] lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[clamp(22px,2.6vw,42px)] font-extrabold uppercase leading-[1] tracking-[-0.035em]">Розлив в бутылки и кеги</p>
            <Formats ids={["bottle-045", "bottle-075", "keg"]} strong="keg" />
          </div>
        </div>
      </section>

      {/* full-bleed studio frame with registration lines */}
      <section className="relative overflow-hidden bg-[var(--ch-ink)]">
        <figure className="relative h-[44svh] md:h-[60svh]">
          <img data-par-y="0.12" src="/assets/zero/still-caps-1100.webp" srcSet="/assets/zero/still-caps-640.webp 640w, /assets/zero/still-caps-1100.webp 1100w" sizes="100vw" alt="Фирменные крышки с фениксом — студийная съёмка" loading="lazy" className="absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-px bg-white/35" />
          <span aria-hidden="true" className="absolute inset-y-0 left-2/3 w-px bg-white/35" />
          <figcaption className="t-tag absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-black px-[var(--gutter)] py-3 text-white">
            <span>Крышка с фениксом</span><span className="opacity-70">CIDERHOUSE</span>
          </figcaption>
        </figure>
      </section>

      <section className="field-black relative" aria-labelledby="pr-more">
        <div className="wrap grid grid-cols-1 items-end gap-10 py-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <h2 id="pr-more" className="t-xl md:col-span-8">Что получается<br />в итоге</h2>
          <div className="flex flex-wrap md:col-span-4 md:justify-end">
            <Link href="/katalog/" className="btn btn-solid">Ассортимент</Link>
            <Link href="/contact/" className="btn -ml-px">Контакты</Link>
          </div>
        </div>
      </section>
    </>
  );
}

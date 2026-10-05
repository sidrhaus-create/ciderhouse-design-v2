import type { Metadata } from "next";
import Link from "next/link";
import { Conveyor } from "@/components/Conveyor";
import { PageHero } from "@/components/PageHero";
import { Chapter } from "@/components/primitives";
import { PROCESS } from "@/data/site";

export const metadata: Metadata = {
  title: "Производство",
  description: "Как CIDERHOUSE делает сидр: от яблок и сока до брожения, фильтрации, карбонизации, контроля качества и розлива. Технология безалкогольного сидра 0,0%.",
  alternates: { canonical: "/production/" },
};

// figures taken from the owner's process description (src/data/site.ts) — nothing estimated
const SPEC: [string, string, string][] = [
  [String(PROCESS.length).padStart(2, "0"), "шагов", "от сорта яблока до отгрузки"],
  ["0,5%", "точка остановки", "брожение останавливают охлаждением"],
  ["0,0%", "итоговая крепость", "каждая партия проходит лабораторию"],
  ["CO₂", "карбонизация", "после фильтрации — мягкие пузырьки"],
];

export default function Production() {
  return (
    <>
      <PageHero
        id="pr-title"
        field="black"
        label="Производство"
        lines={["Всё бродит"]}
        lead="Восемь шагов — от сорта яблока до отгрузки. Ниже — технология направления 0%: брожение доходит до 0,5%, затем его останавливают холодом."
        aside={<><span>Технологическая карта</span><span className="h-px w-10 bg-current" /><span className="t-num">0,5 → 0,0</span></>}
      />

      {/* spec strip: the process in four figures */}
      <section className="field-purple relative" aria-label="Процесс в цифрах">
        <dl className="grid grid-cols-2 border-t border-white/40 lg:grid-cols-4">
          {SPEC.map(([v, k, note], i) => (
            <div key={k} data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }} className="min-w-0 overflow-hidden border-b border-r border-white/40 px-[var(--gutter)] py-6 lg:py-8">
              <dd className="t-num text-[clamp(32px,4.6vw,80px)] font-black leading-[0.86] tracking-[-0.05em]">{v}</dd>
              <dt className="t-tag mt-5">{k}</dt>
              <p className="mt-2 max-w-[24ch] text-[13.5px] leading-snug opacity-80">{note}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* full-bleed studio frame with registration lines */}
      <section className="field-black relative overflow-hidden">
        <figure className="relative h-[52svh] md:h-[68svh]">
          <img data-par-y="0.12" src="/assets/zero/still-caps-1100.webp" srcSet="/assets/zero/still-caps-640.webp 640w, /assets/zero/still-caps-1100.webp 1100w" sizes="100vw" alt="Фирменные крышки с фениксом — студийная съёмка ZER° CIDER" loading="lazy" className="absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-px bg-white/35" />
          <span aria-hidden="true" className="absolute inset-y-0 left-2/3 w-px bg-white/35" />
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-white/35" />
          <figcaption className="t-tag absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-black px-[var(--gutter)] py-3 text-white">
            <span>Кадр 01 · крышка с фениксом</span><span className="opacity-70">студийная съёмка</span>
          </figcaption>
        </figure>
      </section>

      <section className="field-white relative" aria-labelledby="process-title">
        <Conveyor
          header={
            <div className="flex flex-col gap-5 border-b border-current pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Chapter n="01" label="Процесс" className="mb-6" />
                <h2 id="process-title" className="t-xl">Восемь<br />шагов</h2>
              </div>
              <p className="t-tag md:text-right">Листайте —<br />линия движется слева направо</p>
            </div>
          }
        />
      </section>

      <section className="field-black relative" aria-labelledby="pr-more">
        <div className="wrap grid grid-cols-1 items-end gap-10 py-[clamp(50px,5.9vw,90px)] md:grid-cols-12">
          <h2 id="pr-more" className="t-xl md:col-span-8">Вопросы по<br />производству</h2>
          <div className="flex flex-wrap md:col-span-4 md:justify-end">
            <Link href="/contact/" className="btn btn-solid">Связаться</Link>
            <Link href="/non-alcoholic/" className="btn -ml-px">Линейка 0%</Link>
          </div>
        </div>
      </section>
    </>
  );
}

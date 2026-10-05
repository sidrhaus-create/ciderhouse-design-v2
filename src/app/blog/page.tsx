import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JOURNAL } from "@/data/site";

export const metadata: Metadata = {
  title: "Журнал",
  description: "Новости и статьи CIDERHOUSE о сидре и жизни дома.",
  alternates: { canonical: "/blog/" },
};

const CARD = ["var(--green)", "var(--lilac)", "var(--honey)", "var(--pom)"];

export default function Blog() {
  return (
    <>
      <PageHero id="b-title" label="Новости" lines={["Журнал"]} lead="Новости и статьи о сидре и жизни дома. Публикации открываются на официальном сайте." />

      <section className="relative field-black" aria-label="Публикации">
        <div className="wrap pb-[clamp(43px,5.3vw,77px)] pt-[clamp(46px,5.3vw,77px)]">
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
            {JOURNAL.map((j, i) => (
              <li key={j.href}>
                <a href={j.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-[44vh] flex-col justify-between border border-current p-6 transition-[translate,rotate] duration-300 hover:-translate-y-2 md:p-8">
                  <span className="flex items-center justify-between">
                    <span className="chip">{j.tag}</span>
                    <span className="text-[var(--ui-accent)] text-[72px] font-black leading-[0.74]">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="hyph balance text-[clamp(44px,5vw,84px)] font-black uppercase leading-[0.88] [overflow-wrap:anywhere]">{j.title}</span>
                  <span className="t-tag flex items-center gap-2">читать на ciderhouse.ru<span aria-hidden="true" className="sq transition-transform duration-300 ">↗</span></span>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm opacity-70">Архив публикаций переносится с ciderhouse.ru.</p>
        </div>
      </section>
    </>
  );
}

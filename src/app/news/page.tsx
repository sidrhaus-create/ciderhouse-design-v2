import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Chapter } from "@/components/primitives";
import { LATEST, NEWS, TELEGRAM, imgSet, postDate, postHref } from "@/data/news";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости CIDERHOUSE: производство, новинки линеек, фестивали и события.",
  alternates: { canonical: "/news/" },
};

export default function News() {
  const [lead, ...latest] = LATEST; // curated current stories, newest first
  const shown = new Set(LATEST.map((p) => p.slug));
  const archive = NEWS.filter((p) => !shown.has(p.slug));
  const years = [...new Set(archive.map((p) => p.date.slice(0, 4)))];
  return (
    <>
      <PageHero
        id="n-title"
        field="white"
        label="Новости"
        lines={["Новости"]}
        lead="Производство, новинки, фестивали и события — всё, что происходит в доме."
        aside={<><span className="t-num">{String(NEWS.length).padStart(2, "0")}</span><span className="h-px w-10 bg-current" /><span>публикаций</span></>}
      />

      {/* featured: the newest story. One link — image, title and «Читать» all open the same article */}
      <section className="field-purple relative" aria-label="Главная публикация">
        <Link href={postHref(lead)} className="group grid grid-cols-1 lg:grid-cols-12">
          {lead.cover && (
            <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--ch-ink)] lg:col-span-5 lg:aspect-auto lg:min-h-[64svh]">
              <img {...imgSet(lead.cover)} sizes="(max-width: 1024px) 100vw, 42vw" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]" />
            </span>
          )}
          <span className="flex flex-col justify-between gap-10 px-[var(--gutter)] py-[clamp(32px,4vw,64px)] lg:col-span-7">
            <span className="t-tag flex items-center justify-between gap-4">
              <span className="flex items-center gap-3"><span>Главное</span><span className="h-px w-8 bg-current" />{lead.tag}</span>
              <time dateTime={lead.date} className="t-num opacity-80">{postDate(lead.date)}</time>
            </span>
            <span>
              <span className="hyph block text-[clamp(28px,4.6vw,80px)] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] [overflow-wrap:anywhere]">{lead.title}</span>
              {lead.lead && <span className="mt-5 block max-w-[46ch] text-[16px] leading-snug opacity-90">{lead.lead}</span>}
              <span className="btn mt-8">Читать</span>
            </span>
          </span>
        </Link>
      </section>

      {/* latest: an editorial grid of the current stories — large crops, ruled cells */}
      <section className="field-white relative" aria-labelledby="n-latest">
        <div className="wrap pb-8 pt-[clamp(48px,6vw,96px)]">
          <Chapter n="01" label="Последнее" className="mb-6" />
          <h2 id="n-latest" className="t-xl">Сейчас в CIDERHOUSE</h2>
        </div>
        <ol className="grid grid-cols-1 border-t border-current sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ["--d" as string]: `${(i % 3) * 0.07}s` }} className="border-b border-current sm:border-r">
              <Link href={postHref(p)} className="group flex h-full flex-col">
                <span className={`relative block overflow-hidden bg-[var(--ch-ink)] ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"} sm:aspect-[4/3] ${i % 3 === 1 ? "lg:aspect-[4/5]" : "lg:aspect-[4/3]"}`}>
                  {p.cover && <img {...imgSet(p.cover)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]" />}
                </span>
                <span className="flex flex-1 flex-col justify-between gap-6 px-[var(--gutter)] py-6 lg:px-6">
                  <span className="t-tag flex items-center gap-3"><span className="text-purple">{p.tag}</span><span className="h-px w-6 bg-current opacity-50" /><time dateTime={p.date} className="t-num">{postDate(p.date)}</time></span>
                  <span>
                    <span className="hyph block text-[clamp(20px,2vw,32px)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] transition-transform duration-700 [overflow-wrap:anywhere] [transition-timing-function:var(--ease-out)] group-hover:translate-x-2">{p.title}</span>
                    <span className="mt-3 block max-w-[44ch] text-[14.5px] leading-snug opacity-80">{p.lead}</span>
                    <span className="t-tag fill-link mt-5 inline-block">Читать →</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Telegram: the faster channel */}
      <section className="field-purple relative" aria-labelledby="n-tg">
        <div className="wrap grid grid-cols-1 items-end gap-8 py-[clamp(44px,5.4vw,84px)] md:grid-cols-12">
          <h2 id="n-tg" className="t-xl md:col-span-8">Больше —<br />в Telegram</h2>
          <div className="md:col-span-4 md:text-right">
            <p className="mb-5 text-[15px] leading-snug opacity-90">То, что происходит прямо сейчас, появляется в канале раньше, чем здесь.</p>
            <a href={TELEGRAM.href} target="_blank" rel="noopener noreferrer" data-external="" className="btn btn-solid">{TELEGRAM.handle}<span className="sr-only"> — откроется в новой вкладке</span></a>
          </div>
        </div>
      </section>

      {/* the archive: ruled rows by year */}
      <section className="field-black relative" aria-labelledby="n-archive">
        <div className="wrap pb-6 pt-[clamp(44px,5.4vw,84px)]">
          <Chapter n="02" label="Архив" className="mb-6" />
          <h2 id="n-archive" className="t-l">Раньше</h2>
        </div>
        {years.map((y) => (
          <div key={y}>
            <h3 className="wrap t-tag t-num flex items-center gap-3 border-y border-current py-4"><span>{y}</span><span className="h-px flex-1 bg-current opacity-25" /><span className="opacity-60">{String(archive.filter((p) => p.date.startsWith(y)).length).padStart(2, "0")}</span></h3>
            <ol>
              {archive.filter((p) => p.date.startsWith(y)).map((p) => (
                <li key={p.slug} className="border-b border-current last:border-b-0">
                  <Link href={postHref(p)} className="news-row group relative block overflow-hidden">
                    <span className="wrap relative grid grid-cols-[96px_1fr] items-center gap-x-4 py-4 md:grid-cols-12 md:gap-x-8 md:py-5">
                      <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--ch-ink)] md:col-span-2">
                        {p.cover && <img {...imgSet(p.cover)} sizes="(max-width: 768px) 96px, 16vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
                      </span>
                      <span className="min-w-0 md:col-span-7">
                        <span className="t-tag mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 md:hidden"><time dateTime={p.date} className="t-num">{postDate(p.date)}</time><span className="opacity-60">{p.tag}</span></span>
                        <span className="hyph block text-[clamp(17px,2.2vw,36px)] font-extrabold uppercase leading-[1.04] tracking-[-0.03em] transition-transform duration-700 [overflow-wrap:anywhere] [transition-timing-function:var(--ease-out)] md:group-hover:translate-x-3">{p.title}</span>
                        {p.lead && <span className="mt-2 hidden max-w-[60ch] text-[14.5px] leading-snug opacity-80 md:line-clamp-2 md:block">{p.lead}</span>}
                      </span>
                      <span className="hidden items-center justify-end gap-3 md:col-span-3 md:flex">
                        <span className="chip">{p.tag}</span>
                        <time dateTime={p.date} className="t-tag t-num">{postDate(p.date)}</time>
                        <span aria-hidden="true" className="sq">→</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  );
}

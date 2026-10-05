import Link from "next/link";
import { LATEST, TELEGRAM, imgSet, postDate, postHref, type Post } from "@/data/news";
import { Chapter } from "./primitives";

function Meta({ p, className = "" }: { p: Post; className?: string }) {
  return (
    <span className={`t-tag flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <span className="text-[var(--ui-accent)]">{p.tag}</span><span className="h-px w-6 bg-current opacity-50" /><time dateTime={p.date} className="t-num">{postDate(p.date)}</time>
    </span>
  );
}

/** «Сейчас в CIDERHOUSE» — the homepage editorial block: one large story and three smaller ones, all from the local news data.
 *  Desktop: an asymmetric spread (photograph + headline on the left, a ruled column on the right).
 *  Touch: the lead story, then a native swipe rail. Motion is CSS only — image drift and a headline shift on hover. */
export function HomeNews({ n = "06" }: { n?: string }) {
  const [lead, ...rest] = LATEST;
  const side = rest.slice(0, 3);
  if (!lead) return null;
  return (
    <section aria-labelledby="news-title" className="field-white relative overflow-hidden">
      <div className="wrap flex flex-col gap-6 pb-8 pt-[clamp(56px,7vw,112px)] md:flex-row md:items-end md:justify-between">
        <div>
          <Chapter n={n} label="Новости" className="mb-6" />
          <h2 id="news-title" className="t-xl">Сейчас<br />в CIDERHOUSE</h2>
        </div>
        <Link href="/news/" className="btn self-start md:self-auto">Все новости</Link>
      </div>

      <div className="grid grid-cols-1 border-y border-current lg:grid-cols-12">
        {/* the lead story */}
        <Link href={postHref(lead)} data-reveal className="group grid grid-cols-1 sm:grid-cols-2 lg:col-span-7 lg:border-r lg:border-current">
          <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--ch-ink)] sm:aspect-auto sm:min-h-[420px] lg:min-h-[560px]">
            {lead.cover && <img {...imgSet(lead.cover)} sizes="(max-width: 640px) 100vw, 30vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]" />}
            <span className="t-tag absolute left-0 top-0 bg-purple px-3 py-2 text-white">Главное</span>
          </span>
          <span className="flex flex-col justify-between gap-8 px-[var(--gutter)] py-6 sm:px-6 lg:py-8">
            <Meta p={lead} />
            <span>
              <span className="hyph block text-[clamp(24px,2.7vw,44px)] font-extrabold uppercase leading-[1] tracking-[-0.035em] transition-transform duration-700 [overflow-wrap:anywhere] [transition-timing-function:var(--ease-out)] group-hover:translate-x-2">{lead.title}</span>
              <span className="mt-4 block max-w-[38ch] text-[15px] leading-snug opacity-85">{lead.lead}</span>
              <span className="t-tag fill-link mt-6 inline-block">Читать →</span>
            </span>
          </span>
        </Link>

        {/* secondary stories: a ruled column on desktop, a swipe rail on touch */}
        <ol className="flex snap-x snap-mandatory overflow-x-auto border-t border-current [scrollbar-width:none] lg:col-span-5 lg:block lg:overflow-visible lg:border-t-0">
          {side.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }} className="w-[78vw] shrink-0 snap-start border-r border-current sm:w-[46vw] lg:w-auto lg:border-b lg:border-r-0 lg:last:border-b-0">
              <Link href={postHref(p)} className="group grid h-full grid-cols-1 lg:grid-cols-[38%_1fr]">
                <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--ch-ink)] lg:aspect-auto lg:min-h-[186px]">
                  {p.cover && <img {...imgSet(p.cover)} sizes="(max-width: 1024px) 78vw, 16vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.05]" />}
                </span>
                <span className="flex flex-col justify-between gap-5 px-[var(--gutter)] py-5 lg:px-6">
                  <Meta p={p} />
                  <span className="hyph block text-[clamp(18px,1.55vw,25px)] font-extrabold uppercase leading-[1.04] tracking-[-0.03em] transition-transform duration-700 [overflow-wrap:anywhere] [transition-timing-function:var(--ease-out)] group-hover:translate-x-2">{p.title}<span aria-hidden="true" className="ml-2 inline-block text-[var(--ui-accent)] transition-transform duration-500 group-hover:translate-x-1.5">→</span></span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="wrap flex items-center justify-between gap-6 py-5">
        <p className="t-tag opacity-70">Быстрее всего — в Telegram</p>
        <a href={TELEGRAM.href} target="_blank" rel="noopener noreferrer" data-external="" className="t-tag fill-link">{TELEGRAM.handle} ↗<span className="sr-only"> — откроется в новой вкладке</span></a>
      </div>
    </section>
  );
}

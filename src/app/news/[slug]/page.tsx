import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { NEWS, TELEGRAM, imgSet, postBySlug, postDate, postHref, type Post } from "@/data/news";

export const dynamicParams = false;
export function generateStaticParams() { return NEWS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = postBySlug((await params).slug)!;
  return {
    title: p.title,
    description: p.lead || p.body[0]?.t.slice(0, 160),
    alternates: { canonical: postHref(p) },
    openGraph: p.cover ? { images: [{ url: `${p.cover.src}-1600.webp`, width: p.cover.w, height: p.cover.h }] } : undefined,
  };
}

function Neighbour({ p, dir }: { p: Post; dir: "prev" | "next" }) {
  return (
    <Link href={postHref(p)} className={`news-row group block px-[var(--gutter)] py-[clamp(24px,3vw,44px)] ${dir === "next" ? "md:text-right" : ""}`}>
      <span className="t-tag flex items-center gap-3 opacity-80 md:inline-flex">{dir === "prev" ? "← Новее" : "Раньше →"}<time dateTime={p.date} className="t-num">{postDate(p.date)}</time></span>
      <span className="hyph mt-3 block text-[clamp(18px,2vw,30px)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] [overflow-wrap:anywhere]">{p.title}</span>
    </Link>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const i = NEWS.indexOf(p);
  const newer = NEWS[i - 1], older = NEWS[i + 1];
  const ld = {
    "@context": "https://schema.org", "@type": "NewsArticle", headline: p.title, datePublished: p.date, inLanguage: "ru",
    image: p.cover ? `${SITE.url}${p.cover.src}-1600.webp` : undefined,
    publisher: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: `${SITE.url}${postHref(p)}`,
  };
  // consecutive list items become one list
  const groups: ({ k: "p" | "h"; t: string } | { k: "ul"; items: string[] })[] = [];
  for (const b of p.body) {
    const last = groups[groups.length - 1];
    if (b.k === "li") { if (last && last.k === "ul") last.items.push(b.t); else groups.push({ k: "ul", items: [b.t] }); }
    else groups.push({ k: b.k, t: b.t });
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="field-white relative">
        <div className="wrap pb-[clamp(28px,3.4vw,52px)] pt-[clamp(92px,9vw,128px)]">
          <div className="mb-[clamp(18px,2vw,30px)] flex items-center justify-between gap-6 border-b border-current pb-4">
            <Link href="/news/" className="t-tag fill-link">← Новости</Link>
            <p className="t-tag flex items-center gap-3"><span className="chip">{p.tag}</span><time dateTime={p.date} className="t-num">{postDate(p.date)}</time></p>
          </div>
          <h1 className="t-poster balance text-[clamp(30px,5.2vw,92px)] leading-[0.95] [overflow-wrap:anywhere]">{p.title}</h1>
          {p.lead && <p className="t-m mt-6 max-w-[44ch]">{p.lead}</p>}
        </div>
      </header>

      <section className="field-black relative" aria-label="Текст публикации">
        <div className="wrap grid grid-cols-1 gap-x-10 gap-y-8 py-[clamp(32px,4.4vw,72px)] lg:grid-cols-12">
          {p.cover && (
            <figure className="lg:col-span-6">
              <img {...imgSet(p.cover)} sizes="(max-width: 1024px) 100vw, 46vw" alt={p.title} className="h-auto w-full border border-current" />
            </figure>
          )}
          <div className={`min-w-0 ${p.cover ? "lg:col-span-6" : "lg:col-span-8"}`}>
            {groups.length === 0 && p.lead && <p className="text-[clamp(17px,1.5vw,21px)] leading-[1.5]">{p.lead}</p>}
            {groups.map((g, k) =>
              g.k === "h" ? <h2 key={k} className="mb-4 mt-8 text-[clamp(20px,2vw,30px)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] first:mt-0">{g.t}</h2>
              : g.k === "ul" ? <ul key={k} className="mb-5 border-t border-current">{g.items.map((t, n) => <li key={n} className="flex gap-4 border-b border-current py-3 text-[16px] leading-snug"><span className="t-tag t-num pt-1 text-purple">{String(n + 1).padStart(2, "0")}</span><span>{t}</span></li>)}</ul>
              : <p key={k} className="mb-5 max-w-[62ch] text-[clamp(16px,1.3vw,19px)] leading-[1.55]">{g.t}</p>
            )}
          </div>
        </div>

        {p.gallery.length > 0 && (
          <ul className="grid grid-cols-2 border-t border-current md:grid-cols-4" aria-label="Фотографии">
            {p.gallery.map((g) => (
              <li key={g.src} className="relative aspect-square overflow-hidden border-b border-r border-current bg-[var(--ch-ink)]">
                <img {...imgSet(g)} sizes="(max-width: 768px) 50vw, 25vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        )}

        <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-current py-6">
          <Link href="/news/" className="btn btn-solid">← Все новости</Link>
          {p.more && <Link href={p.more.href} className="btn">{p.more.label}</Link>}
        </div>
      </section>

      {/* Telegram: the faster channel — a quiet line, not a widget */}
      <aside className="field-purple relative" aria-label="CIDERHOUSE в Telegram">
        <div className="wrap flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[clamp(18px,1.8vw,26px)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em]">Следить за CIDERHOUSE в Telegram</p>
          <a href={TELEGRAM.href} target="_blank" rel="noopener noreferrer" data-external="" className="btn self-start md:self-auto">{TELEGRAM.handle}<span className="sr-only"> — откроется в новой вкладке</span></a>
        </div>
      </aside>

      {(newer || older) && (
        <nav className="field-white relative grid grid-cols-1 border-t border-current md:grid-cols-2" aria-label="Соседние публикации">
          <div className="border-b border-current md:border-b-0 md:border-r">{newer && <Neighbour p={newer} dir="prev" />}</div>
          <div>{older && <Neighbour p={older} dir="next" />}</div>
        </nav>
      )}
    </article>
  );
}

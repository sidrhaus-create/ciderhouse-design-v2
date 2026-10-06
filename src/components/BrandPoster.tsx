import Link from "next/link";
import { brandType, brandVars, siteLabel, type Brand } from "@/data/brands";
import { productsOf } from "@/data/catalog";
import { BRAND_FORMATS } from "@/data/formats";
import { Formats } from "./Formats";
import { PosterCover } from "./BrandCover";
import { Fit } from "./primitives";

/** A brand as a poster: its name edge to edge in its own face, then its cover — the studio photograph with the brand's strip
 *  set into the frame. Brands without a photograph get the closed room (one plane, one hairline), never a placeholder. */
export function BrandPoster({ b, index, total }: { b: Brand; index: number; total: number }) {
  const lines = b.display.split("\n");
  const count = productsOf(b.slug).length;
  const formats = BRAND_FORMATS[b.slug];
  return (
    <section className="field-brand relative isolate overflow-hidden" style={brandVars(b)} aria-labelledby="brand-title">
      <div className="wrap pt-[clamp(84px,9vw,120px)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-current pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-solid t-num">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span className="chip">{b.family === "zero" ? "Направление 0%" : "Алкогольный портфель"}</span>
            <span className="chip">{b.kind}</span>
            {b.subline && <a href="#party" className="chip transition-colors duration-300 hover:bg-[var(--on)] hover:text-[var(--field)]">+ {b.subline.name}</a>}
          </div>
          {b.logo ? <img src={b.logo} alt={`Логотип ${b.name}`} className="h-9 w-auto md:h-12" /> : <span className="t-tag opacity-70">CIDERHOUSE · бренд</span>}
        </div>
        <h1 id="brand-title" className="pb-6">
          <span className="sr-only">{b.name}</span>
          <span aria-hidden="true" className="hidden md:block"><Fit max={230} style={brandType(b)}>{b.name}</Fit></span>
          <span aria-hidden="true" className="md:hidden">{lines.map((l, i) => <Fit key={i} max={150} delay={i * 0.08} style={brandType(b)}>{l}</Fit>)}</span>
        </h1>
      </div>

      <PosterCover b={b}>
        <p className="t-tag mb-4 flex items-center justify-between gap-4 opacity-80">
          <span>{b.kind}</span>
          {count > 0 && <span className="t-num">{String(count).padStart(2, "0")} в линейке</span>}
        </p>
        <p className="t-m balance max-w-[26ch]" data-reveal>{b.line}</p>
        {formats && <Formats ids={formats} strong="keg" className="mt-5" />}
        <div className="mt-6 flex flex-wrap">
          {b.status === "coming-soon" ? (
            <Link href="/contact/" className="btn btn-solid">Связаться</Link>
          ) : count > 0 ? (
            <a href="#line" className="btn btn-solid">Линейка</a>
          ) : (
            <Link href="/katalog/" className="btn btn-solid">Ассортимент</Link>
          )}
          {b.family === "zero" && <Link href="/non-alcoholic/" className="btn -ml-px">Мир 0%</Link>}
          {b.site && <a href={b.site} target="_blank" rel="noopener noreferrer" data-external="" className="btn -ml-px">{siteLabel(b)}</a>}
          <Link href="/brands/" className="btn -ml-px">Все бренды</Link>
        </div>
      </PosterCover>
    </section>
  );
}

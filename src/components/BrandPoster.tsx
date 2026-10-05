import Link from "next/link";
import { brandType, brandVars, type Brand } from "@/data/brands";
import { productsOf } from "@/data/catalog";
import { Fit, Pack } from "./primitives";

// One system, three stagings — taken from the packaging, so the families are not one template with different bottles:
// right  — still life on the right (White Phoenix: light, airy label; also ZER°, Bumble Coffee, Migliore)
// left   — still life on the left, text ruled off on the right (Double Tree: dark, structural, vertical label type)
// center — symmetric, heraldic (Mister Bee: medallion label), with the range count as a counterweight
const STAGING: Partial<Record<Brand["slug"], "right" | "left" | "center">> = { "double-tree": "left", "mister-bee": "center" };
const LAYOUT = {
  right: { text: "md:col-span-6", still: "md:col-span-5 md:col-start-8" },
  left: { text: "md:order-2 md:col-span-5 md:col-start-8 md:border-l md:border-current md:pl-8", still: "md:order-1 md:col-span-6" },
  center: { text: "md:col-span-3", still: "md:col-span-6" },
} as const;

/** Still life: the brand's own packs standing upright on a plane of its accent. No originals → a closed room: one plane, one hairline, no placeholder. */
function StillLife({ b }: { b: Brand }) {
  const all = productsOf(b.slug).filter((p) => p.image || p.pack);
  const sharpest = all.filter((p) => p.image || (p.pack && p.pack.h >= 1200));
  const packs = (sharpest.length ? sharpest : all).slice(0, 3);
  if (!packs.length) {
    return (
      <div aria-hidden="true" className="relative h-full w-full bg-[var(--on)]">
        <span className="absolute inset-y-[8%] left-1/2 w-px bg-[var(--field)]" />
        <span className="t-tag absolute bottom-5 left-5 text-[var(--field)]">CIDERHOUSE · {b.name}</span>
      </div>
    );
  }
  return (
    <>
      <div aria-hidden="true" data-slap className="absolute inset-y-0 left-1/2 w-[78%] -translate-x-1/2" style={{ background: b.theme.accent }} />
      <div data-par-y="-0.12" className="relative flex h-[112%] items-end justify-center gap-[1.4svh]">
        {packs.map((p, i) => <Pack key={p.slug} p={p} sizes="(max-width:768px) 30vw, 14vw" className={packs.length > 2 && i !== 1 ? "h-[92%]" : "h-full"} />)}
      </div>
    </>
  );
}

/** A brand as a poster: its name edge to edge in its own face, on its own plane. */
export function BrandPoster({ b, index, total }: { b: Brand; index: number; total: number }) {
  const lines = b.display.split("\n");
  const staging = STAGING[b.slug] ?? "right";
  const stage = LAYOUT[staging];
  const count = productsOf(b.slug).length;
  return (
    <section className="field-brand relative isolate overflow-hidden" style={brandVars(b)} aria-labelledby="brand-title">
      <div className="wrap flex min-h-[92svh] flex-col pt-[clamp(84px,9vw,120px)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-current pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-solid t-num">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span className="chip">{b.family === "zero" ? "Направление 0%" : "Алкогольный портфель"}</span>
            <span className="chip">{b.kind}</span>
          </div>
          {b.logo ? <img src={b.logo} alt={`Логотип ${b.name}`} className="h-9 w-auto md:h-12" /> : <span className="t-tag opacity-70">CIDERHOUSE · бренд</span>}
        </div>

        <h1 id="brand-title">
          <span className="sr-only">{b.name}</span>
          <span aria-hidden="true" className="hidden md:block"><Fit max={230} style={brandType(b)}>{b.name}</Fit></span>
          <span aria-hidden="true" className="md:hidden">{lines.map((l, i) => <Fit key={i} max={150} delay={i * 0.08} style={brandType(b)}>{l}</Fit>)}</span>
        </h1>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-8 border-t border-current pt-6 md:grid-cols-12">
          <div className={`flex flex-col justify-between gap-8 pb-8 ${stage.text}`}>
            <p className="t-m balance max-w-[26ch]" data-reveal>{b.line}</p>
            <div className="flex flex-wrap">
              {b.status === "coming-soon" ? (
                <Link href="/contact/" className="btn btn-solid">Связаться</Link>
              ) : productsOf(b.slug).length > 0 ? (
                <a href="#line" className="btn btn-solid">Линейка</a>
              ) : (
                <Link href="/katalog/" className="btn btn-solid">Ассортимент</Link>
              )}
              {b.family === "zero" && <Link href="/non-alcoholic/" className="btn -ml-px">Мир 0%</Link>}
              <Link href="/brands/" className="btn -ml-px">Все бренды</Link>
            </div>
          </div>
          <div className={`relative flex h-[58svh] items-end justify-center md:h-[56svh] ${stage.still}`}>
            <StillLife b={b} />
          </div>
          {staging === "center" && (
            <div className="hidden flex-col justify-end pb-8 text-right md:col-span-3 md:flex">
              <p className="t-num text-[clamp(56px,6vw,104px)] font-black leading-[0.86] tracking-[-0.05em]">{String(count).padStart(2, "0")}</p>
              <p className="t-tag mt-3">в линейке · {b.kind}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

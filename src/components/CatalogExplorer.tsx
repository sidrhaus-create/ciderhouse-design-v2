"use client";
import Link from "next/link";
import { BrandLink } from "./BrandLink";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, mainLine, partyLine } from "@/data/catalog";
import { brandBySlug, brandType, brandVars, type BrandSlug } from "@/data/brands";
import { BrandRange } from "./BrandRange";
import { FormatMark, Formats } from "./Formats";
import { CatalogCover } from "./BrandCover";
import { PartyLine } from "./PartyLine";
import { BRAND_FORMATS, FORMATS, brandsWith, formatOf, type FormatId } from "@/data/formats";

type World = "all" | BrandSlug;
type Fmt = "all" | FormatId;
// exact per-position formats come from the labels; kegs are verified for a family, so "Кеги" opens a family-level sheet instead of a product list
const FMTS: Fmt[] = ["all", "bottle-045", "bottle-075", "keg"];
const ORDER: BrandSlug[] = ["zero", "white-phoenix", "double-tree", "mister-bee"];
const WORLDS: { id: World; label: string }[] = [{ id: "all", label: "Все" }, ...ORDER.map((id) => ({ id, label: brandBySlug(id)!.name }))];

function readParams() {
  const sp = new URLSearchParams(window.location.search);
  const f = sp.get("format") as Fmt;
  return { w: (sp.get("brand") as World) || "all", f: FMTS.includes(f) ? f : "all" };
}

/** The range as an environment: a ruled filter strip, then each brand on its own plane with a sticky stage and an index. */
export function CatalogExplorer() {
  const [world, setWorld] = useState<World>("all");
  const [fmt, setFmt] = useState<Fmt>("all");

  useEffect(() => { const p = readParams(); setWorld(p.w); setFmt(p.f); }, []);
  useEffect(() => {
    const sp = new URLSearchParams();
    if (world !== "all") sp.set("brand", world);
    if (fmt !== "all") sp.set("format", fmt);
    const q = sp.toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  }, [world, fmt]);

  const list = useMemo(() => PRODUCTS.filter((p) => (world === "all" || p.brand === world) && (fmt === "all" || formatOf(p) === fmt)), [world, fmt]);
  const groups = useMemo(() => ORDER.map((b) => ({ b: brandBySlug(b)!, items: list.filter((p) => p.brand === b) })).filter((g) => g.items.length), [list]);
  const kegBrands = useMemo(() => brandsWith("keg"), []);
  const photos = list.filter((p) => p.image || p.pack).length;
  const tab = (on: boolean) => `t-tag shrink-0 border-r border-current/25 px-4 py-4 transition-colors duration-300 md:px-5 ${on ? "bg-purple text-white" : "hover:bg-[var(--on)] hover:text-[var(--field)]"}`;

  return (
    <div className="relative">
      {/* filter strip: part of the page structure, not a floating widget */}
      <div className="field-black sticky top-0 z-30 border-y border-current/25">
        <div className="flex items-stretch overflow-x-auto [scrollbar-width:none]">
          <div role="group" aria-label="Бренд" className="flex">
            {WORLDS.map((w) => <button key={w.id} aria-pressed={world === w.id} onClick={() => setWorld(w.id)} className={tab(world === w.id)}>{w.label}</button>)}
          </div>
          <div role="group" aria-label="Формат" className="flex md:ml-auto md:border-l md:border-current/25">
            {FMTS.map((f) => <button key={f} aria-pressed={fmt === f} onClick={() => setFmt(f)} className={tab(fmt === f)}>{f === "all" ? "все форматы" : FORMATS[f].short}</button>)}
          </div>
          <span className="t-tag t-num flex shrink-0 items-center px-5 opacity-70" aria-live="polite">{fmt === "keg" ? `${kegBrands.length} линейки` : `${list.length} поз. · ${photos} с фото`}</span>
        </div>
      </div>

      {fmt === "keg" && (
        <section className="field-white relative" aria-labelledby="keg-title">
          <div className="wrap grid grid-cols-1 gap-10 py-[clamp(48px,6vw,96px)] md:grid-cols-12">
            <div className="md:col-span-5">
              <FormatMark id="keg" className="mb-6 h-24 w-20" />
              <h2 id="keg-title" className="t-xl">Кеги</h2>
              <p className="t-m mt-5 max-w-[30ch]">Напитки дома разливают не только в бутылки, но и в кеги — для баров и магазинов разливных напитков.</p>
              <Link href="/contact/" className="btn btn-solid mt-8">Запросить ассортимент в кегах</Link>
            </div>
            <ul className="self-end border-t border-current md:col-span-7">
              {kegBrands.filter((b) => world === "all" || b.slug === world).map((b) => (
                <li key={b.slug} className="border-b border-current">
                  <BrandLink b={b} className="group flex items-center justify-between gap-6 py-5">
                    <span className="text-[clamp(28px,3.6vw,60px)] leading-none transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-2" style={brandType(b)}>{b.name}</span>
                    <span className="t-tag text-right opacity-80">{b.kind}<br />линейка в кегах</span>
                  </BrandLink>
                </li>
              ))}
              <li className="py-4 text-[14px] leading-snug opacity-70">Кеги подтверждены для линеек целиком. Какие вкусы доступны в кегах сейчас — уточняйте у менеджера.</li>
            </ul>
          </div>
        </section>
      )}

      {fmt !== "keg" && groups.length === 0 && (
        <section className="field-white relative"><div className="wrap sheet-pad"><p className="t-m">В этом формате пока ничего нет — выберите другой фильтр.</p></div></section>
      )}

      {fmt !== "keg" && groups.map(({ b, items }) => (
        <section key={b.slug} aria-labelledby={`g-${b.slug}`} className="field-brand relative" style={brandVars(b)}>
          <CatalogCover
            b={b}
            aside={<><span className="chip t-num">{String(items.length).padStart(2, "0")} в индексе</span><BrandLink b={b} className="btn">О бренде</BrandLink></>}
          >
            {BRAND_FORMATS[b.slug] && <Formats ids={BRAND_FORMATS[b.slug]!} strong="keg" />}
          </CatalogCover>
          <BrandRange b={b} items={mainLine(items)} offset={49} />
          <PartyLine b={b} items={partyLine(items)} compact offset={49} />
        </section>
      ))}
    </div>
  );
}

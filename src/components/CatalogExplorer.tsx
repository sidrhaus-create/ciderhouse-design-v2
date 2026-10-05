"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/data/catalog";
import { brandBySlug, brandType, brandVars, type BrandSlug } from "@/data/brands";
import { BrandRange } from "./BrandRange";

type World = "all" | BrandSlug;
type Fmt = "all" | "бутылка" | "банка";
const ORDER: BrandSlug[] = ["zero", "white-phoenix", "double-tree", "mister-bee", "bumble-coffee"];
const WORLDS: { id: World; label: string }[] = [{ id: "all", label: "Все" }, ...ORDER.map((id) => ({ id, label: brandBySlug(id)!.name }))];

function readParams() {
  const sp = new URLSearchParams(window.location.search);
  return { w: (sp.get("brand") as World) || "all", f: (sp.get("format") as Fmt) || "all" };
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

  const list = useMemo(() => PRODUCTS.filter((p) => (world === "all" || p.brand === world) && (fmt === "all" || p.format.includes(fmt))), [world, fmt]);
  const groups = useMemo(() => ORDER.map((b) => ({ b: brandBySlug(b)!, items: list.filter((p) => p.brand === b) })).filter((g) => g.items.length), [list]);
  const photos = list.filter((p) => p.image || p.pack).length;
  const tab = (on: boolean) => `t-tag shrink-0 border-r border-white/25 px-4 py-4 transition-colors duration-300 md:px-5 ${on ? "bg-purple text-white" : "hover:bg-white hover:text-black"}`;

  return (
    <div className="relative">
      {/* filter strip: part of the page structure, not a floating widget */}
      <div className="field-black sticky top-0 z-30 border-y border-white/25">
        <div className="flex items-stretch overflow-x-auto [scrollbar-width:none]">
          <div role="group" aria-label="Бренд" className="flex">
            {WORLDS.map((w) => <button key={w.id} aria-pressed={world === w.id} onClick={() => setWorld(w.id)} className={tab(world === w.id)}>{w.label}</button>)}
          </div>
          <div role="group" aria-label="Формат" className="flex md:ml-auto md:border-l md:border-white/25">
            {(["all", "бутылка", "банка"] as Fmt[]).map((f) => <button key={f} aria-pressed={fmt === f} onClick={() => setFmt(f)} className={tab(fmt === f)}>{f === "all" ? "любой формат" : f}</button>)}
          </div>
          <span className="t-tag t-num flex shrink-0 items-center px-5 opacity-70" aria-live="polite">{list.length} поз. · {photos} с фото</span>
        </div>
      </div>

      {groups.length === 0 && (
        <section className="field-white relative"><div className="wrap sheet-pad"><p className="t-m">В этом формате пока ничего нет — выберите другой фильтр.</p></div></section>
      )}

      {groups.map(({ b, items }) => (
        <section key={b.slug} aria-labelledby={`g-${b.slug}`} className="field-brand relative" style={brandVars(b)}>
          <header className="wrap flex flex-wrap items-end justify-between gap-4 pb-6 pt-[clamp(40px,4.6vw,70px)]">
            <h2 id={`g-${b.slug}`} className="text-[clamp(34px,5.6vw,96px)] leading-[0.96]" style={brandType(b)}>{b.name}</h2>
            <div className="flex items-center gap-3 pb-2">
              <span className="chip t-num">{String(items.length).padStart(2, "0")} в индексе</span>
              <Link href={`/brands/${b.slug}/`} className="btn">О бренде</Link>
            </div>
          </header>
          <BrandRange b={b} items={items} offset={49} />
        </section>
      ))}
    </div>
  );
}

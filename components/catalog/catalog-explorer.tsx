"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bottle, type BottleAsset } from "@/components/ui/bottle";
import { ProductAsset } from "@/components/ui/product-asset";
import { FLAVORS, plural, POSITIONS } from "@/lib/plural";

export type ExplorerProduct = {
  id: string;
  flavor: string;
  family: string;
  familySlug: string;
  volume?: string;
  format?: string;
  classification?: string;
  notes?: string[];
  asset?: BottleAsset;
};

export type ExplorerFamily = {
  slug: string;
  title: string;
  navLabel: string;
  category: string;
  description: string;
  tone: "ink" | "paper" | "brand";
  products: ExplorerProduct[];
  /** A single official composition shown instead of individual bottles. */
  composite?: BottleAsset;
  /** Extra notes (e.g. sub-lines that are announced but not yet shown). */
  notes?: { label: string; text: string }[];
  /** Optional framed photograph shown beside one of the sub-groups. */
  photo?: { asset: BottleAsset; caption: string; group: string };
};

type CatalogExplorerProps = {
  families: ExplorerFamily[];
  /** Hide the family filter and the family band (used on brand pages). */
  single?: boolean;
};

const ALL = "all";
const pad = (value: number) => String(value).padStart(2, "0");

/** Groups a family's bottles by volume when it has more than one. */
function groupByVolume(products: ExplorerProduct[]) {
  const groups = new Map<string, ExplorerProduct[]>();
  products.forEach((product) => {
    const key = product.volume ?? "";
    groups.set(key, [...(groups.get(key) ?? []), product]);
  });
  return Array.from(groups, ([volume, items]) => ({ volume, items }));
}

/**
 * The catalogue: a filterable wall of real bottles. Each tile opens a
 * full-screen product sheet with the bottle large and the confirmed facts
 * beside it. Only data present in the catalog records is shown.
 */
export function CatalogExplorer({
  families,
  single = false,
}: CatalogExplorerProps) {
  const [filter, setFilter] = useState(ALL);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  /* Read the initial family from the URL (?family=…), keep it in sync. */
  useEffect(() => {
    if (single) return;
    const requested = new URLSearchParams(window.location.search).get("family");
    if (requested && families.some((family) => family.slug === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after hydration
      setFilter(requested);
    }
  }, [families, single]);

  const visibleFamilies = useMemo(
    () =>
      filter === ALL
        ? families
        : families.filter((family) => family.slug === filter),
    [families, filter],
  );

  const sheetProducts = useMemo(
    () =>
      visibleFamilies.flatMap((family) =>
        family.products.filter((product) => product.asset),
      ),
    [visibleFamilies],
  );

  const activeIndex = sheetProducts.findIndex(
    (product) => product.id === activeId,
  );
  const active = activeIndex >= 0 ? sheetProducts[activeIndex] : null;
  const totalCount = families.reduce(
    (total, family) => total + family.products.length,
    0,
  );
  const visibleCount = visibleFamilies.reduce(
    (total, family) => total + family.products.length,
    0,
  );

  function choose(next: string) {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === ALL) url.searchParams.delete("family");
    else url.searchParams.set("family", next);
    window.history.replaceState(null, "", url);
    const top = topRef.current;
    if (top && top.getBoundingClientRect().top < 0) {
      top.scrollIntoView({ block: "start" });
    }
  }

  function open(id: string) {
    setActiveId(id);
    const sheet = sheetRef.current;
    if (sheet && !sheet.open) {
      document.documentElement.classList.add("is-overlay-open");
      sheet.showModal();
    }
  }

  const close = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (!sheetProducts.length || activeIndex < 0) return;
      const next =
        (activeIndex + direction + sheetProducts.length) % sheetProducts.length;
      setActiveId(sheetProducts[next].id);
    },
    [activeIndex, sheetProducts],
  );

  useEffect(
    () => () => document.documentElement.classList.remove("is-overlay-open"),
    [],
  );

  return (
    <div className="cx-explorer" id="brands" ref={topRef}>
      {single ? null : (
        <div className="cx-filter">
          <div className="cx-wrap cx-filter__inner">
            <ul aria-label="Фильтр по направлениям" className="cx-filter__list">
              <li>
                <button
                  aria-pressed={filter === ALL}
                  className="cx-filter__tab"
                  onClick={() => choose(ALL)}
                  type="button"
                >
                  Все <sup>{totalCount}</sup>
                </button>
              </li>
              {families.map((family) => (
                <li key={family.slug}>
                  <button
                    aria-pressed={filter === family.slug}
                    className="cx-filter__tab"
                    onClick={() => choose(family.slug)}
                    type="button"
                  >
                    {family.navLabel}
                    {family.products.length ? (
                      <sup>{family.products.length}</sup>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
            <p aria-live="polite" className="cx-filter__count">
              Показано: {visibleCount}
            </p>
          </div>
        </div>
      )}

      {visibleFamilies.map((family) => {
        const withAsset = family.products.filter((product) => product.asset);
        const groups = groupByVolume(withAsset);
        const hasVolumes = groups.length > 1;
        let counter = 0;

        return (
          <section
            aria-labelledby={`family-${family.slug}`}
            className={`cx-family cx-tone-${family.tone}`}
            id={family.slug}
            key={family.slug}
          >
            <div className="cx-wrap">
              {single ? (
                <h2
                  className="cx-h2 cx-family__solo"
                  id={`family-${family.slug}`}
                >
                  Вся линейка
                </h2>
              ) : (
                <div className="cx-family__band">
                  <div>
                    <p className="cx-kicker">
                      <span>{family.category}</span>
                      {family.products.length ? (
                        <span>
                          {family.products.length}{" "}
                          {plural(family.products.length, POSITIONS)}
                        </span>
                      ) : null}
                    </p>
                    <h2
                      className="cx-mega cx-family__name"
                      id={`family-${family.slug}`}
                    >
                      {family.title}
                    </h2>
                  </div>
                  <div className="cx-family__intro">
                    <p className="cx-lead">{family.description}</p>
                    <Link className="cx-link" href={`/brands/${family.slug}`}>
                      О линейке <span aria-hidden="true">→</span>
                      <span className="visually-hidden"> {family.title}</span>
                    </Link>
                  </div>
                </div>
              )}

              {family.composite ? (
                <div className="cx-composite">
                  <div className="cx-composite__art">
                    <ProductAsset
                      alt={family.composite.alt}
                      height={family.composite.height}
                      sizes="(max-width: 1023px) 92vw, 48vw"
                      src={family.composite.src}
                      width={family.composite.width}
                    />
                  </div>
                  <ul className="cx-rows">
                    {family.products.map((product, index) => (
                      <li key={product.id}>
                        <div className="cx-row">
                          <span className="cx-row__index">
                            {pad(index + 1)}
                          </span>
                          <span className="cx-row__title">
                            {product.flavor}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {groups.map((group) => (
                <div className="cx-group" key={group.volume || "all"}>
                  {hasVolumes ? (
                    <div className="cx-subhead">
                      <h3 className="cx-h3">{group.volume}</h3>
                      <span className="cx-label cx-muted">
                        {group.items.length}{" "}
                        {plural(group.items.length, FLAVORS)}
                      </span>
                    </div>
                  ) : null}
                  <div
                    className={
                      family.photo && family.photo.group === group.volume
                        ? "cx-group__body cx-group__body--photo"
                        : "cx-group__body"
                    }
                  >
                    {family.photo && family.photo.group === group.volume ? (
                      <figure className="cx-figure cx-group__photo">
                        <Image
                          alt={family.photo.asset.alt}
                          height={family.photo.asset.height}
                          sizes="(max-width: 1023px) 92vw, 30vw"
                          src={family.photo.asset.src}
                          width={family.photo.asset.width}
                        />
                        <figcaption>{family.photo.caption}</figcaption>
                      </figure>
                    ) : null}
                    <ul className="cx-grid">
                      {group.items.map((product) => {
                        counter += 1;
                        return (
                          <li key={product.id}>
                            <button
                              aria-haspopup="dialog"
                              className="cx-tile"
                              onClick={() => open(product.id)}
                              type="button"
                            >
                              <span className="cx-tile__top">
                                <span>{pad(counter)}</span>
                                <span>{product.volume ?? ""}</span>
                              </span>
                              <span className="cx-tile__stage">
                                {product.asset ? (
                                  <Bottle
                                    asset={product.asset}
                                    sizes="(max-width: 639px) 40vw, (max-width: 1023px) 28vw, 16vw"
                                  />
                                ) : null}
                              </span>
                              <span>
                                <span className="cx-tile__name">
                                  {product.flavor}
                                </span>
                                <span className="cx-tile__family">
                                  {product.family}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}

              {family.notes?.length ? (
                <div className="cx-family__notes">
                  {family.notes.map((note) => (
                    <p className="cx-note" key={note.label}>
                      <strong>{note.label}.</strong> {note.text}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      <dialog
        aria-label={active ? `${active.family} · ${active.flavor}` : "Продукт"}
        className="cx-sheet"
        onClose={() => {
          document.documentElement.classList.remove("is-overlay-open");
          setActiveId(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        ref={sheetRef}
      >
        {active?.asset ? (
          <div className="cx-sheet__inner" key={active.id}>
            <button
              aria-label="Закрыть"
              className="cx-sheet__close"
              onClick={close}
              type="button"
            >
              ×
            </button>
            <div
              className="cx-sheet__stage"
              data-lowres={active.asset.height < 600}
            >
              <p aria-hidden="true" className="cx-sheet__ghost">
                {pad(activeIndex + 1)}
              </p>
              <Bottle
                asset={active.asset}
                sizes="(max-width: 1023px) 70vw, 36vw"
              />
            </div>
            <div className="cx-sheet__body">
              <p className="cx-label">
                {active.family}
                {active.volume ? ` · ${active.volume}` : ""}
              </p>
              <h2 className="cx-display cx-sheet__title">{active.flavor}</h2>
              <dl className="cx-sheet__facts">
                {active.format ? (
                  <div>
                    <dt>Формат</dt>
                    <dd>{active.format}</dd>
                  </div>
                ) : null}
                {active.volume ? (
                  <div>
                    <dt>Объём</dt>
                    <dd>{active.volume}</dd>
                  </div>
                ) : null}
                {active.classification ? (
                  <div>
                    <dt>Категория</dt>
                    <dd>{active.classification}</dd>
                  </div>
                ) : null}
              </dl>
              {active.notes?.length ? (
                <ul className="cx-sheet__notes">
                  {active.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
              <div className="cx-actions">
                <Link
                  className="cx-btn cx-btn--light"
                  href="/where-to-buy"
                  onClick={close}
                >
                  Где купить <span aria-hidden="true">→</span>
                </Link>
                {single ? null : (
                  <Link
                    className="cx-btn cx-btn--ghost"
                    href={`/brands/${active.familySlug}`}
                    onClick={close}
                  >
                    О линейке {active.family}
                  </Link>
                )}
              </div>
              <div className="cx-sheet__nav">
                <span>
                  {pad(activeIndex + 1)} / {pad(sheetProducts.length)}
                </span>
                <div>
                  <button
                    aria-label="Предыдущий продукт"
                    onClick={() => step(-1)}
                    type="button"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    aria-label="Следующий продукт"
                    onClick={() => step(1)}
                    type="button"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

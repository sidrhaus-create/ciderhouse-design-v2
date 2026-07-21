"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { formatLabels, type ProductRecord } from "@/types/catalog";

type ProductSpotlightProps = {
  products: ProductRecord[];
  /** Show the first two products together as one composed pair instead of a switcher. */
  mode?: "single" | "duo";
  /** Used only when every product shares a single combined asset (e.g. Zero). */
  sharedFlavorLabel?: string;
  priority?: boolean;
};

export function ProductSpotlight({
  products,
  mode = "single",
  sharedFlavorLabel,
  priority = false,
}: ProductSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = products[activeIndex];

  if (!active?.asset) return null;

  if (mode === "duo" && products.length > 1 && products[1]?.asset) {
    const [first, second] = products;
    return (
      <div className="product-spotlight product-spotlight--duo">
        <div className="product-spotlight__stage product-spotlight__stage--duo">
          <Image
            alt={second.asset!.alt}
            className="product-spotlight__image product-spotlight__image--secondary"
            height={second.asset!.height}
            sizes="(max-width: 767px) 46vw, 24vw"
            src={second.asset!.src}
            unoptimized
            width={second.asset!.width}
          />
          <Image
            alt={first.asset!.alt}
            className="product-spotlight__image product-spotlight__image--primary"
            height={first.asset!.height}
            priority={priority}
            sizes="(max-width: 767px) 58vw, 30vw"
            src={first.asset!.src}
            unoptimized
            width={first.asset!.width}
          />
        </div>
        <dl className="product-spotlight__meta product-spotlight__meta--duo">
          <div>
            <dt>Продукты</dt>
            <dd>
              {first.name} · {first.flavor} и {second.flavor}
            </dd>
          </div>
          {first.volume ? (
            <div>
              <dt>Объём</dt>
              <dd>{first.volume}</dd>
            </div>
          ) : null}
          {first.alcoholClassification ? (
            <div>
              <dt>Классификация</dt>
              <dd>{first.alcoholClassification}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    );
  }

  const hasSwitcher = products.length > 1;

  function moveTo(index: number) {
    const next = (index + products.length) % products.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveTo(activeIndex - 1);
    }
  }

  return (
    <div className="product-spotlight">
      <div className="product-spotlight__stage">
        <div className="product-spotlight__frame" key={active.id}>
          <Image
            alt={active.asset.alt}
            className="product-spotlight__image"
            height={active.asset.height}
            priority={priority}
            sizes="(max-width: 767px) 78vw, (max-width: 1023px) 46vw, 34vw"
            src={active.asset.src}
            unoptimized
            width={active.asset.width}
          />
        </div>
      </div>
      <dl aria-live="polite" className="product-spotlight__meta">
        <div>
          <dt>Продукт</dt>
          <dd>
            {active.name} · {sharedFlavorLabel ?? active.flavor}
          </dd>
        </div>
        {!sharedFlavorLabel && active.volume ? (
          <div>
            <dt>Объём</dt>
            <dd>{active.volume}</dd>
          </div>
        ) : null}
        {!sharedFlavorLabel && active.format ? (
          <div>
            <dt>Формат</dt>
            <dd>{formatLabels[active.format]}</dd>
          </div>
        ) : null}
        {active.alcoholClassification ? (
          <div>
            <dt>Классификация</dt>
            <dd>{active.alcoholClassification}</dd>
          </div>
        ) : null}
      </dl>
      {hasSwitcher ? (
        <div className="product-spotlight__switcher">
          <button
            aria-label="Предыдущий продукт"
            className="product-spotlight__arrow"
            onClick={() => moveTo(activeIndex - 1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div
            aria-label="Выбор продукта"
            className="product-spotlight__tabs"
            onKeyDown={handleKeyDown}
            role="tablist"
          >
            {products.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  aria-selected={isActive}
                  className={`product-spotlight__tab${isActive ? " product-spotlight__tab--active" : ""}`}
                  key={product.id}
                  onClick={() => moveTo(index)}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="product-spotlight__tab-dot"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          <button
            aria-label="Следующий продукт"
            className="product-spotlight__arrow"
            onClick={() => moveTo(activeIndex + 1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

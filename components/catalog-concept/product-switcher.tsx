"use client";

import { useRef, type KeyboardEvent } from "react";
import type { ProductRecord } from "@/types/catalog";
import styles from "@/app/catalog-concept/catalog-concept.module.css";

type ProductSwitcherProps = {
  products: ProductRecord[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ProductSwitcher({
  products,
  activeIndex,
  onSelect,
}: ProductSwitcherProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveTo(index: number) {
    const next = (index + products.length) % products.length;
    onSelect(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveTo(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(products.length - 1);
    }
  }

  return (
    <div className={styles.switcher}>
      <button
        aria-label="Предыдущий продукт"
        className={styles.switcherArrow}
        onClick={() => moveTo(activeIndex - 1)}
        type="button"
      >
        <span aria-hidden="true">←</span>
      </button>
      <div
        aria-label="Продукты Double Tree"
        className={styles.switcherTabs}
        onKeyDown={handleKeyDown}
        role="tablist"
      >
        {products.map((product, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              aria-selected={isActive}
              className={`${styles.switcherTab} ${isActive ? styles.switcherTabActive : ""}`.trim()}
              key={product.id}
              onClick={() => moveTo(index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span aria-hidden="true" className={styles.switcherTabIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{product.flavor}</span>
              {isActive ? (
                <span aria-hidden="true" className={styles.switcherTabDot} />
              ) : null}
            </button>
          );
        })}
      </div>
      <button
        aria-label="Следующий продукт"
        className={styles.switcherArrow}
        onClick={() => moveTo(activeIndex + 1)}
        type="button"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!items.length) return;
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % items.length
        : event.key === "ArrowLeft"
          ? (index - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? items.length - 1
              : null;

    if (nextIndex === null) return;
    event.preventDefault();
    const nextItem = items[nextIndex];
    if (!nextItem) return;
    setActiveId(nextItem.id);
    tabRefs.current[nextIndex]?.focus();
  }

  if (!items.length) {
    return <p role="status">No tab content is available.</p>;
  }

  return (
    <div className="tabs">
      <div aria-label={label} className="tabs__list" role="tablist">
        {items.map((item, index) => {
          const selected = activeId === item.id;
          return (
            <button
              aria-controls={`${baseId}-${item.id}-panel`}
              aria-selected={selected}
              className="tabs__tab"
              id={`${baseId}-${item.id}-tab`}
              key={item.id}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          aria-labelledby={`${baseId}-${item.id}-tab`}
          className="tabs__panel"
          hidden={activeId !== item.id}
          id={`${baseId}-${item.id}-panel`}
          key={item.id}
          role="tabpanel"
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

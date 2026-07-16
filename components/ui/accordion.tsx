import type { ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export function Accordion({ items, allowMultiple = true }: AccordionProps) {
  return (
    <div className="accordion" data-allow-multiple={allowMultiple}>
      {items.map((item, index) => (
        <details className="accordion__item" key={item.id} open={index === 0}>
          <summary className="accordion__trigger">
            <span>{item.title}</span>
            <span aria-hidden="true" className="accordion__icon">
              +
            </span>
          </summary>
          <div className="accordion__content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

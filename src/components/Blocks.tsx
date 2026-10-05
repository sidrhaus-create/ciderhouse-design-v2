import { MARKETPLACES } from "@/data/site";

/** Marketplaces as loud index rows (external links). */
export function MarketRows() {
  return (
    <ul>
      {MARKETPLACES.map((m) => (
        <li key={m.name} className="border-t border-current last:border-b">
          <a href={m.href} target="_blank" rel="noopener noreferrer" className="group flex items-end justify-between gap-4 py-3">
            <span className="t-l transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-x-3">{m.name}</span>
            <span className="t-tag mb-3 hidden items-center gap-3 sm:flex">
              {m.note}
              <span aria-hidden="true" className="sq transition-transform duration-300 ">↗</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

import { FORMATS, type FormatId } from "@/data/formats";

/** Format marks: diagrams in the line language of the production drawings — not product imagery.
 *  (There is no verified CIDERHOUSE keg photograph, so the keg is shown as a diagram, never as a branded pack.) */
const MARK: Record<FormatId, string> = {
  "bottle-045": "M10 2h4v5c0 2 3 4 3 9v10c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V16c0-5 3-7 3-9Z",
  "bottle-075": "M10.5 1h3v8c0 2 3.5 3 3.5 8v9c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-9c0-5 3.5-6 3.5-8Z",
  keg: "M5 6h14c.6 0 1 .4 1 1v20c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1ZM4 12h16M4 22h16M8 6V3h8v3",
};

export function FormatMark({ id, className = "h-7 w-6" }: { id: FormatId; className?: string }) {
  return (
    <svg viewBox="0 0 24 30" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" aria-hidden="true">
      <path d={MARK[id]} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** A ruled row of verified formats. `strong` marks the format worth noticing in this context (usually the keg). */
export function Formats({ ids, strong, label = "Форматы", className = "" }: { ids: FormatId[]; strong?: FormatId; label?: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-stretch ${className}`} role="group" aria-label={label}>
      <span className="t-tag -ml-px flex items-center border border-current px-3 py-2 opacity-70">{label}</span>
      {ids.map((id) => (
        <span key={id} className={`t-tag -ml-px flex items-center gap-2 border border-current px-3 py-2 ${id === strong ? "bg-[var(--on)] text-[var(--field)]" : ""}`}>
          <FormatMark id={id} className="h-5 w-4" />{FORMATS[id].label}
        </span>
      ))}
    </div>
  );
}

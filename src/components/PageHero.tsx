import type { ReactNode } from "react";
import { Chapter } from "./primitives";

/** Opening plane of an inner page: a medium editorial composition — title on the left, lead and actions on the right, one hard rule.
 *  The giant fit-to-width line is reserved for the home hero and the brand posters. */
export function PageHero({
  id, field = "white", n = "—", label, lines, lead, children, aside,
}: {
  id: string; field?: "white" | "black" | "purple"; n?: string; label: string; lines: ReactNode[]; lead?: ReactNode; children?: ReactNode; aside?: ReactNode;
}) {
  return (
    <section className={`field-${field} relative overflow-hidden`} aria-labelledby={id}>
      <div className="wrap relative pb-[clamp(28px,3.4vw,52px)] pt-[clamp(92px,9vw,128px)]">
        <div className="mb-[clamp(18px,2vw,30px)] flex items-center justify-between gap-6 border-b border-current pb-4">
          <Chapter n={n} label={label} />
          {aside && <div className="t-tag hidden items-center gap-3 text-right md:flex">{aside}</div>}
        </div>
        <div className="grid grid-cols-1 items-end gap-x-10 gap-y-6 md:grid-cols-12">
          <h1 id={id} data-reveal className="t-poster balance text-[clamp(34px,6.4vw,112px)] leading-[0.92] [overflow-wrap:anywhere] md:col-span-7">
            {lines.map((l, i) => <span key={i} className="block">{l}</span>)}
          </h1>
          {(lead || children) && (
            <div className="md:col-span-5 md:pb-[0.6vw]">
              {lead && <p className="t-m balance" data-reveal>{lead}</p>}
              {children && <div className="mt-6">{children}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

/** CIDERHOUSE production illustrations: one thin-line vector language for the six stages of the house story (src/data/site.ts → PROCESS).
 *  Ink lines draw themselves (pathLength = 1, see `.art` in globals.css); purple marks what changes at that stage: the liquid.
 *  `.bub` bubbles keep rising while a drawing is on. Nothing here states a fact that is not in the process text —
 *  no equipment specs, temperatures or timings. */
const L = (d: string, k = 0) => <path d={d} pathLength={1} style={{ ["--k" as string]: k }} />;
const A = (d: string, k = 3) => <path d={d} pathLength={1} className="acc" style={{ ["--k" as string]: k }} />;
const B = (cx: number, cy: number, r: number, k = 4) => <circle cx={cx} cy={cy} r={r} pathLength={1} className="acc bub" style={{ ["--k" as string]: k }} />;
/** a drop with its tip at (x, y) */
const drop = (x: number, y: number, s: number) => `M${x} ${y}c${s * 0.62} ${s * 0.95} ${s * 0.95} ${s * 1.45} ${s * 0.95} ${s * 1.98}a${s * 0.95} ${s * 0.95} 0 0 1 ${-s * 1.9} 0c0 ${-s * 0.53} ${s * 0.33} ${-s * 1.03} ${s * 0.95} ${-s * 1.98}Z`;
const BOTTLE = "M108 30h24v34c0 12 22 30 22 70v64c0 8-6 14-14 14h-40c-8 0-14-6-14-14v-64c0-40 22-58 22-70Z";

const ART: ReactNode[] = [
  // 01 — the base: an apple and honey
  <>
    <g transform="translate(-22 8)">{L("M120 80C92 62 56 80 56 124c0 44 32 76 64 68 32 8 64-24 64-68 0-44-36-62-64-44Z")}{L("M120 80c0-16 6-28 16-34", 1)}{L("M136 46c20-4 32 6 34 18-18 4-30-4-34-18Z", 2)}</g>
    {L("M194 34l21 12v24l-21 12-21-12V46Z", 3)}{L("M194 46l10.5 6v12l-10.5 6-10.5-6V52Z", 4)}
    {A(drop(194, 96, 12), 5)}{A("M176 168q18-8 36 0", 6)}
  </>,
  // 02 — natural fruit juices join the base
  <>
    {L("M52 132v46c0 14 12 24 26 24h84c14 0 26-10 26-24v-46")}{L("M44 132h152", 1)}
    {A("M52 164q34-12 68 0t68 0", 2)}
    {A(drop(84, 34, 13), 3)}{A(drop(120, 58, 10), 4)}{A(drop(156, 30, 15), 5)}
    {L("M84 22c0-8 6-12 12-12M156 18c0-8 6-12 12-12", 6)}
  </>,
  // 03 — fermentation: the vessel comes alive
  <>
    {L("M66 58h108")}{L("M76 58v110c0 22 20 36 44 36s44-14 44-36V58", 1)}{L("M120 58V30h36", 2)}
    {A("M76 104q22-8 44 0t44 0", 2)}{B(102, 150, 7, 3)}{B(128, 168, 5, 4)}{B(142, 138, 8, 4)}{B(112, 122, 4, 5)}{B(134, 118, 5, 6)}{B(96, 180, 4, 6)}
  </>,
  // 04 — quality control: the laboratory checks every batch
  <>
    {L("M98 40h40")}{L("M106 40v52l-40 86c-6 12 2 24 16 24h72c14 0 22-12 16-24l-40-86V40", 1)}
    {L("M118 58h8M118 74h8", 2)}{A("M84 152h68", 3)}{B(110, 176, 4, 4)}{B(128, 166, 3, 5)}
    {L("M190 60a22 22 0 1 0 0.1 0", 5)}{A("M178 82l9 9 16-18", 6)}
  </>,
  // 05 — bottling: the bottle fills
  <>
    {L(BOTTLE)}{L("M120 4v20M104 4h32", 1)}{A("M87 150q16-6 33 0t33 0", 2)}{A("M120 24v124", 3)}{B(108, 178, 4, 4)}{B(130, 190, 3, 5)}
    {L("M28 212h184", 5)}
  </>,
  // 06 — bottles and kegs leave two production sites
  <>
    {L("M40 84h76c4 0 6 3 6 6v106c0 4-2 6-6 6H40c-4 0-6-2-6-6V90c0-3 2-6 6-6Z")}{L("M34 112h88M34 172h88", 1)}{L("M58 84V70h40v14", 2)}{A("M34 142h88", 3)}
    <g transform="translate(92 62) scale(0.66)">{L(BOTTLE, 3)}{A("M87 150h66", 4)}</g>
    {A("M196 30c-11 0-19 8-19 19 0 14 19 30 19 30s19-16 19-30c0-11-8-19-19-19Z", 5)}{L("M196 43a6 6 0 1 0 0.1 0", 6)}
    <g transform="translate(-30 0) scale(0.8)">{A("M196 30c-11 0-19 8-19 19 0 14 19 30 19 30s19-16 19-30c0-11-8-19-19-19Z", 6)}{L("M196 43a6 6 0 1 0 0.1 0", 7)}</g>
    {L("M20 214h200", 6)}
  </>,
];

export function ProcessArt({ i, on = false, className = "" }: { i: number; on?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 240 240" data-art className={`art ${on ? "is-on" : ""} ${className}`} role="img" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="square">
      {ART[i]}
    </svg>
  );
}

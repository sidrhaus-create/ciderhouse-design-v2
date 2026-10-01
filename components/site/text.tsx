import type { ReactNode } from "react";

export const pad = (value: number) => String(value).padStart(2, "0");

/** Display heading split into masked lines for the reveal choreography. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line) => (
    <span className="cx-line" key={line}>
      <span>{line}</span>
    </span>
  ));
}

/** Words wrapped individually so the motion controller can light them up. */
export function Words({ text }: { text: string }) {
  return text
    .split(" ")
    .map((word, index) => <span key={`${word}-${index}`}>{word} </span>);
}

/** Editorial section marker: number + name (+ optional aside) on a hairline. */
export function Kicker({
  index,
  children,
  aside,
}: {
  index?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <p className="cx-kicker" data-fade>
      {index ? <span>{index}</span> : null}
      <span>{children}</span>
      {aside ? <span>{aside}</span> : null}
    </p>
  );
}

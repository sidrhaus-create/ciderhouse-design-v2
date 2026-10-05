import { Marquee } from "./primitives";

const DEFAULT = ["сидр", "медовуха", "0,0%", "White Phoenix", "зелёное яблоко", "Mister Bee", "вишня", "Double Tree", "гранат · малина", "ZER° CIDER"];

/** Ticker: a ruled strip that runs straight along the seam between two planes. */
export function Tape({ words = DEFAULT, reverse = false, className = "field-black" }: { words?: string[]; reverse?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative z-10 border-y border-current py-[0.7em] text-[clamp(18px,2vw,30px)] ${className}`}>
      <Marquee duration={42} gap="1.4em" reverse={reverse}>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-[1.4em] whitespace-nowrap font-extrabold uppercase leading-none tracking-[-0.02em]">
            {w}
            <span className="inline-block h-[0.42em] w-[0.42em] bg-purple" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

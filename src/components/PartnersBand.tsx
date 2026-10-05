import { PARTNERS } from "@/data/site";
import { Marquee } from "./primitives";

/** Retail partner logos as price-tag tiles on a moving shelf; equal optical weight (height ∝ 1/√aspect). */
export function PartnersBand({ reverse = false }: { reverse?: boolean }) {
  return (
    <Marquee duration={46} gap="0px" reverse={reverse} className="items-center">
      {PARTNERS.map((p) => {
        const h = 1 / Math.sqrt(p.aspect);
        return (
          <span
            key={p.slug}
            className="flex h-[clamp(92px,10vw,150px)] w-[clamp(170px,19vw,290px)] shrink-0 items-center justify-center -ml-px border border-black bg-white"
           
          >
            <img
              src={`/assets/partners/${p.slug}.svg`}
              alt={p.name}
              loading="lazy"
              width={Math.round(100 * h * p.aspect)}
              height={Math.round(100 * h)}
              style={{ height: `calc(clamp(40px, 4.4vw, 66px) * ${h.toFixed(3)})`, width: "auto" }}
            />
          </span>
        );
      })}
    </Marquee>
  );
}

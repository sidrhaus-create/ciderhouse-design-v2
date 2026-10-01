import Image from "next/image";
import Link from "next/link";
import { homepageContent } from "@/data/homepage-content";
import { photography } from "@/data/site-content";

type Action = { label: string; href: string };

/**
 * Closing campaign banner shared by every page: the unedited podium
 * photograph of the range on a purple field.
 */
export function Closing({
  title = homepageContent.finalCta.title,
  actions = homepageContent.finalCta.actions,
}: {
  title?: string;
  actions?: readonly Action[];
}) {
  return (
    <section aria-labelledby="closing-title" className="cx-closing">
      <div className="cx-wrap cx-closing__head">
        <h2
          className="cx-display cx-closing__title"
          data-lines
          id="closing-title"
        >
          <span className="cx-line">
            <span>{title}</span>
          </span>
        </h2>
        <div className="cx-actions" data-fade>
          {actions.map((action, index) => (
            <Link
              className={`cx-btn ${index === 0 ? "cx-btn--light" : "cx-btn--ghost"}`}
              href={action.href}
              key={action.href}
            >
              {action.label}
              {index === 0 ? <span aria-hidden="true">→</span> : null}
            </Link>
          ))}
        </div>
      </div>
      <div className="cx-closing__photo" data-fade>
        <Image
          alt={photography.podium.alt}
          height={photography.podium.height}
          sizes="100vw"
          src={photography.podium.src}
          width={photography.podium.width}
        />
      </div>
      <div aria-hidden="true" className="cx-closing__floor" />
    </section>
  );
}

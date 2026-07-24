import Link from "next/link";
import type { ProductFamily } from "@/types/catalog";

type PendingFamilyChapterProps = {
  family: ProductFamily;
  index: number;
};

const linework: Partial<Record<string, "grid" | "rings" | "diagonal">> = {
  "dtree-party": "diagonal",
};

/**
 * Compact, honest placeholder for a family with zero approved assets.
 * Deliberately quiet and short — no ghost typography, no invented imagery.
 */
export function PendingFamilyChapter({
  family,
  index,
}: PendingFamilyChapterProps) {
  const line = linework[family.slug];
  const story = family.story[0];

  return (
    <section
      aria-labelledby={`${family.slug}-title`}
      className={`chapter chapter--pending catalog-family--${family.slug}`}
      id={family.slug}
    >
      {line ? (
        <div
          aria-hidden="true"
          className={`catalog-linework catalog-linework--${line}`}
        />
      ) : null}
      <div className="container container--narrow chapter__pending">
        <p className="family-kicker">
          <span aria-hidden="true" className="catalog-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          {family.categoryLabel}
        </p>
        <h2 className="chapter__title" id={`${family.slug}-title`}>
          {family.title}
        </h2>
        {story ? <p className="chapter__description">{story}</p> : null}
        <p className="chapter__pending-message">{family.description}</p>
        {family.missingAssetNote ? (
          <p className="family-missing-note" role="note">
            {family.missingAssetNote}
          </p>
        ) : null}
        <Link className="catalog-family__link" href={`/brands/${family.slug}`}>
          Смотреть направление {family.navLabel}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

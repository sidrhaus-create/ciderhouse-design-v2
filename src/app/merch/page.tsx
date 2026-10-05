import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Plate } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Мерч",
  description: "Фирменный мерч Cider House.",
  alternates: { canonical: "/merch/" },
};

export default function Merch() {
  return (
    <>
      <PageHero
        id="mr-title"
       
        label="Фирменный мерч"
        lines={["Мерч"]}
        lead="Вещи с символикой дома. Каталог мерча переносится с ciderhouse.ru вместе с оригинальными фотографиями."
      >
        <div className="flex flex-wrap gap-3">
          <a className="btn btn-solid" href="https://ciderhouse.ru/merch" target="_blank" rel="noopener noreferrer">Текущий каталог ↗</a>
          <Link className="btn" href="/contact/">Мерч для партнёров</Link>
        </div>
      </PageHero>
    </>
  );
}

import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { PageHero } from "@/components/PageHero";
import { Plate } from "@/components/primitives";
import { PRODUCTS } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Ассортимент",
  description: "Ассортимент CIDER HOUSE: сидр Double Tree, медовуха White Phoenix, Mister Bee и безалкогольный ZER° CIDER 0,0%.",
  alternates: { canonical: "/katalog/" },
};

export default function Katalog() {
  return (
    <>
      <PageHero
        id="kat-title"
       
        label="Ассортимент"
        lines={["Ассортимент"]}
        lead={<>{PRODUCTS.length} позиций в индексе. Каждый бренд — на своей плоскости и в своём шрифте, каждый вкус — строкой индекса. Наведите на строку — продукт выйдет на сцену.</>}
      />
      <CatalogExplorer />
    </>
  );
}

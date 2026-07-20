import type { Metadata } from "next";
import { DoubleTreeConcept } from "@/components/catalog-concept/double-tree-concept";

export const metadata: Metadata = {
  title: "Catalog concept — Double Tree (internal review)",
  description:
    "Isolated immersive catalog visual prototype for Double Tree. Internal review only, not part of the production catalog.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CatalogConceptPage() {
  return <DoubleTreeConcept />;
}

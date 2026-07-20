import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyPageTemplate } from "@/components/catalog/family-page-template";
import { getFamilyBySlug, productFamilies } from "@/data/catalog-content";

type FamilyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productFamilies.map((family) => ({ slug: family.slug }));
}

export async function generateMetadata({
  params,
}: FamilyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const family = getFamilyBySlug(slug);

  if (!family) return {};

  return {
    title: family.seo.title,
    description: family.seo.description,
    alternates: {
      canonical: `/brands/${family.slug}`,
    },
    openGraph: {
      title: family.seo.title,
      description: family.seo.description,
      type: "website",
    },
  };
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { slug } = await params;
  const family = getFamilyBySlug(slug);

  if (!family) notFound();

  return <FamilyPageTemplate family={family} />;
}

import type { Metadata } from "next";
import { Redirect } from "@/components/Redirect";

// legacy route: the merch section was removed from the site
export const metadata: Metadata = { title: "CIDERHOUSE", robots: { index: false, follow: true }, alternates: { canonical: "/" } };
export default function Page() { return <Redirect to="/" label="Раздел закрыт — на главную" />; }

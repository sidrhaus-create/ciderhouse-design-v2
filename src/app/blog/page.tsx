import type { Metadata } from "next";
import { Redirect } from "@/components/Redirect";

// legacy route: the news section lives at /news/
export const metadata: Metadata = { title: "Новости", robots: { index: false, follow: true }, alternates: { canonical: "/news/" } };
export default function Page() { return <Redirect to="/news/" label="Новости — в новом разделе" />; }

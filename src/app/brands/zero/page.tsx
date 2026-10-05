import type { Metadata } from "next";
import { Redirect } from "@/components/Redirect";

// legacy route: ZER° CIDER lives on its own official site
export const metadata: Metadata = { title: "ZER° CIDER", robots: { index: false, follow: true }, alternates: { canonical: "https://zerocider.ru" } };
export default function Page() { return <Redirect to="https://zerocider.ru" label="ZER° CIDER — zerocider.ru" />; }

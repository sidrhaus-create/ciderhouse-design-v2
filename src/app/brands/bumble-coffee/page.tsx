import type { Metadata } from "next";
import { Redirect } from "@/components/Redirect";

// legacy route: Bumble Coffee lives on its own official site
export const metadata: Metadata = { title: "Bumble Coffee", robots: { index: false, follow: true }, alternates: { canonical: "https://bumblephoenix.ru" } };
export default function Page() { return <Redirect to="https://bumblephoenix.ru" label="Bumble Coffee — bumblephoenix.ru" />; }

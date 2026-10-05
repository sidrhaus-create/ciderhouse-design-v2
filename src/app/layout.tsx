import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/index.css";
import "@fontsource-variable/montserrat/wght-italic.css";
import "@fontsource-variable/unbounded/index.css"; // Bumble Coffee / Black Phoenix display face
import "./globals.css";
import { MotionProvider } from "@/lib/motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Threshold } from "@/components/Threshold";
import { SITE } from "@/data/site";
import { BRANDS } from "@/data/brands";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "CIDERHOUSE — мы создаём настоящий сидр", template: "%s — CIDERHOUSE" },
  description: SITE.description,
  applicationName: "CIDERHOUSE",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: "CIDERHOUSE",
    title: "CIDERHOUSE — мы создаём настоящий сидр",
    description: SITE.description,
    images: [{ url: "/assets/zero/still-trio-1100.webp", width: 1100, height: 618, alt: "Линейка ZER° CIDER 0,0%" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = { themeColor: "#6b3077", width: "device-width", initialScale: 1 };

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CIDERHOUSE",
  alternateName: "Cider House",
  url: SITE.url,
  logo: `${SITE.url}/assets/brand/ciderhouse-logo-purple.svg`,
  email: SITE.wholesaleEmail,
  brand: BRANDS.map((b) => ({ "@type": "Brand", name: b.name })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <MotionProvider>
          <Threshold />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

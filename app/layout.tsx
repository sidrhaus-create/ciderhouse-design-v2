import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AgeGate } from "@/components/age-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Cider House — Foundation",
    template: "%s · Cider House Foundation",
  },
  description: siteConfig.description,
  applicationName: "Cider House Foundation",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Cider House — Foundation",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F2F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0B1A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const ageGateEnabled = process.env.NEXT_PUBLIC_ENABLE_AGE_GATE === "true";

  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main-content">
          Перейти к содержимому
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <AgeGate enabled={ageGateEnabled} />
      </body>
    </html>
  );
}

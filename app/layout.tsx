import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { AgeGate } from "@/components/age-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./site.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Cider House — сидр и медовуха",
    template: "%s · Cider House",
  },
  description: siteConfig.description,
  applicationName: "Cider House",
  icons: {
    icon: "/assets/brand/master-logo/cider-house-logo-badge-white-on-purple.svg",
    shortcut:
      "/assets/brand/master-logo/cider-house-logo-badge-white-on-purple.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Cider House — сидр и медовуха",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#6B3077",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const ageGateEnabled = process.env.NEXT_PUBLIC_ENABLE_AGE_GATE !== "false";

  for (const font of ["unbounded-cyrillic", "manrope-cyrillic"]) {
    preload(`/assets/fonts/${font}.woff2`, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  }

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

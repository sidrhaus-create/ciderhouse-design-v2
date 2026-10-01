import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/katalog", destination: "/catalog", permanent: true },
      { source: "/map", destination: "/where-to-buy", permanent: true },
      { source: "/clients", destination: "/partners", permanent: true },
      { source: "/contact", destination: "/contacts", permanent: true },
      { source: "/ph", destination: "/catalog", permanent: true },
      { source: "/blog", destination: "/#news", permanent: true },
      { source: "/brands", destination: "/catalog", permanent: false },
      { source: "/privacy", destination: "/#legal", permanent: false },
      { source: "/legal", destination: "/#legal", permanent: false },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/katalog", destination: "/catalog", permanent: true },
      {
        source: "/production",
        destination: "/#production-story",
        permanent: false,
      },
      {
        source: "/where-to-buy",
        destination: "/#where-to-buy",
        permanent: false,
      },
      { source: "/map", destination: "/#where-to-buy", permanent: true },
      { source: "/partners", destination: "/#partners", permanent: false },
      { source: "/clients", destination: "/#partners", permanent: true },
      { source: "/contacts", destination: "/#contacts", permanent: false },
      { source: "/contact", destination: "/#contacts", permanent: true },
      { source: "/blog", destination: "/#social", permanent: true },
      { source: "/privacy", destination: "/#legal", permanent: false },
      { source: "/legal", destination: "/#legal", permanent: false },
    ];
  },
};

export default nextConfig;

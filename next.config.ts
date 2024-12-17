import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // NOTE: Updated to match the pathname and hostname of their cdn.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.swu-db.com",
        port: "",
        pathname: "/images/cards/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

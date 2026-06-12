import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: false,
  poweredByHeader: false,
  experimental: {
    optimizeServerReact: true,
  },
};

export default nextConfig;

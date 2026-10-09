import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/cardio/:path*", destination: "/side-projects/:path*", permanent: true }];
  },
  experimental: {
    optimizeServerReact: true,
  },
};

export default nextConfig;

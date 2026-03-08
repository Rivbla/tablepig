import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 静态导出
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Necessário para exportação estática
  },
  basePath: '/leonardo-cech-website',
  assetPrefix: '/leonardo-cech-website/',
};

export default nextConfig;

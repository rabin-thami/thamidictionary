import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@/components": "./src/components",
      "@/ui": "./src/components/ui",
      "@/protected-components": "./src/app/(protected)/_components",
      "@/app": "./src/app",
    };
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import pkg from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{ hostname: "*.imgix.net", protocol: "https" }] },
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_PACKAGE_VERSION: pkg.version,
  },
};

export default nextConfig;

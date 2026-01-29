import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

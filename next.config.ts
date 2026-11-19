import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid picking a parent lockfile as the workspace root when building locally
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

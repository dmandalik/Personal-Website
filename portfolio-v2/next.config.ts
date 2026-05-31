import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This subfolder is its own app; pin the tracing root to silence the
  // multi-lockfile workspace-root warning.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;

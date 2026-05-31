import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This subfolder is its own app; pin the tracing root to silence the
  // multi-lockfile workspace-root warning.
  outputFileTracingRoot: __dirname,
  images: {
    // Allow our own (trusted) SVG logo to be served through next/image. Locked
    // down with a strict CSP + attachment disposition so it can't execute.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

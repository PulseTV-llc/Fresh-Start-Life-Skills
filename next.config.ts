import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * A brochure site holds no secrets, but donors and grant reviewers do run
 * scanners against nonprofit sites, and these cost nothing.
 *
 * TODO(Darius): once a donation provider is wired up, add a Content-Security-
 * Policy that allow-lists that provider's script and frame origins. Adding a CSP
 * before then would only have to be rewritten.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Real photography lands in /public — these are the widths actually used by
    // the layouts (cards, half-width blocks, full-bleed heroes).
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

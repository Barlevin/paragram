import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const isDev = process.env.NODE_ENV === "development";

/**
 * Security headers.
 *
 * `style-src` allows inline styles because Next injects critical CSS and the
 * hero seam writes its position through a style attribute.
 *
 * `'unsafe-eval'` is added in DEVELOPMENT ONLY: React's dev build uses eval()
 * to reconstruct call stacks across environments. React never uses eval() in
 * production, so the production policy stays strict.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Matches the container widths and device-frame sizes actually used.
    deviceSizes: [360, 480, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [64, 128, 256, 384, 512],
  },

  async headers() {
    // Fonts are emitted by next/font under /_next/static/media, which already
    // receives immutable caching, so no extra font rule is needed here.
    return [{ source: "/(.*)", headers: securityHeaders }];
  },

  experimental: {
    // Cross-document view transitions for route changes.
    viewTransition: true,
  },
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig,
);

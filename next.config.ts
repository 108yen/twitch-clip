import { withSentryConfig } from "@sentry/nextjs"
import { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheMaxMemorySize: 1572864000, // 1.5G = 1500 * 1024 * 1024
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: async () => {
    return [
      {
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
        source: "/(.*)",
      },
    ]
  },
  images: {
    domains: ["clips-media-assets2.twitch.tv"],
  },
  reactStrictMode: true,
}

export default withSentryConfig(nextConfig, {
  automaticVercelMonitors: true,
  disableLogger: true,
  hideSourceMaps: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  reactComponentAnnotation: {
    enabled: true,
  },
  silent: !process.env.CI,
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",
  widenClientFileUpload: true,
})

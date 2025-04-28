import { withSentryConfig } from "@sentry/nextjs"
import { NextConfig } from "next"

import { name, version } from "./package.json"

const nextConfig: NextConfig = {
  cacheMaxMemorySize: 1572864000, // 1.5G = 1500 * 1024 * 1024
  env: {
    NEXT_PUBLIC_VERSION: `${name}@${version}`,
  },
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
          {
            key: "Document-Policy",
            value: "js-profiling",
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
  disableLogger: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  reactComponentAnnotation: {
    enabled: true,
  },
  release: {
    create: process.env.VERCEL_ENV == "production",
    deploy: {
      env: process.env.VERCEL_ENV == "production" ? "production" : "staging",
    },
    name:
      process.env.VERCEL_ENV == "production" ? `${name}@${version}` : undefined,
    setCommits: process.env.VERCEL_GIT_COMMIT_SHA
      ? {
          auto: false,
          commit: process.env.VERCEL_GIT_COMMIT_SHA as string,
          previousCommit: process.env.VERCEL_GIT_PREVIOUS_SHA,
          repo: "108yen/twitch-clip",
        }
      : undefined,
  },
  silent: false,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",
  widenClientFileUpload: true,
})

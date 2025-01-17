import * as Sentry from "@sentry/nextjs"

/**
 * @description Check to add integrations https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/integrations/
 */
Sentry.init({
  debug: false,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment:
    process.env.NEXT_PUBLIC_VERCEL_ENV == "production"
      ? "production"
      : "staging",
  release:
    process.env.NEXT_PUBLIC_VERCEL_ENV == "production"
      ? process.env.NEXT_PUBLIC_VERSION
      : undefined,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 1,
})

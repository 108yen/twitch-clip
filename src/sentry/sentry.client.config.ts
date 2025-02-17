import * as Sentry from "@sentry/nextjs"

/**
 * @description Check to add integrations https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/integrations/
 */
if (
  process.env.NEXT_PUBLIC_VERCEL_ENV == "production" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV == "preview"
) {
  Sentry.init({
    debug: false,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment:
      process.env.NEXT_PUBLIC_VERCEL_ENV == "production"
        ? "production"
        : "staging",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
    ],
    profilesSampleRate: 1.0,
    release:
      process.env.NEXT_PUBLIC_VERCEL_ENV == "production"
        ? process.env.NEXT_PUBLIC_VERSION
        : undefined,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,

    tracesSampleRate: 1,
  })
}

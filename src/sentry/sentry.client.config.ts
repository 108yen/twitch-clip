import * as Sentry from "@sentry/nextjs"

Sentry.init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment:
    process.env.NEXT_PUBLIC_VERCEL_ENV == "production"
      ? "production"
      : "staging",
  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  release:
    process.env.NEXT_PUBLIC_VERCEL_ENV == "production"
      ? process.env.NEXT_PUBLIC_VERSION
      : undefined,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
})

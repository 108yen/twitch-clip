import * as Sentry from "@sentry/nextjs"

Sentry.init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment:
    process.env.VERCEL_ENV == "production" ? "production" : "staging",
  release: process.env.NEXT_PUBLIC_VERSION,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
})

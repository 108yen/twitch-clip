"use client"

import * as Sentry from "@sentry/nextjs"
import NextError from "next/error"
import { useEffect } from "react"

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV == "production" ||
      process.env.NEXT_PUBLIC_VERCEL_ENV == "preview"
    ) {
      Sentry.captureException(error)
    }
  }, [error])

  return (
    <html lang="ja">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}

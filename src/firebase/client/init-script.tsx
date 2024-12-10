"use client"
import { sendGAEvent } from "@next/third-parties/google"
import {
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check"
import { getPerformance } from "firebase/performance"
import { useEffect } from "react"

import { clientApp } from "./client"

export function FirebaseInitScript() {
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      process.env.VERCEL_ENV == "production"
    ) {
      // Performance monitoring
      getPerformance(clientApp)

      // AppCheck
      const appCheck = initializeAppCheck(clientApp, {
        isTokenAutoRefreshEnabled: true,
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA!),
      })

      getToken(appCheck).catch((error) => {
        sendGAEvent("event", "error", {
          label: "app_check_error",
          value: error,
        })
      })
    }
  }, [])

  return null
}

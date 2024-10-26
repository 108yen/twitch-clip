"use client"
import { event } from "@/components/google-analytics/gtag"
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
    if (typeof document !== "undefined") {
      // Performance monitoring
      getPerformance(clientApp)

      // AppCheck
      const appCheck = initializeAppCheck(clientApp, {
        isTokenAutoRefreshEnabled: true,
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA!),
      })

      getToken(appCheck).catch((error) => {
        event("error", {
          label: "app_check_error",
          value: error,
        })
      })
    }
  }, [])

  return null
}

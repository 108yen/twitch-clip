"use client"

import {
  ReCaptchaV3Provider,
  getToken,
  initializeAppCheck
} from "firebase/app-check"
import { getPerformance } from "firebase/performance"
import { useEffect } from "react"

import { event } from "@/components/googleAnalytics/gtag"

import { clientApp } from "../../firebase/client/client"

export default function FirebaseInitScript() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Performance monitoring
      getPerformance(clientApp)

      // AppCheck
      const appCheck = initializeAppCheck(clientApp, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA!),
        isTokenAutoRefreshEnabled: true
      })

      getToken(appCheck).catch((error) => {
        event("error", {
          label: "app_check_error",
          value: error
        })
      })
    }
  }, [])

  return null
}

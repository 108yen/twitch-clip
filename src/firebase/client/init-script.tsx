"use client"
import { sendGAEvent } from "@/utils/google-analytics"
import { initializeApp } from "firebase/app"
import {
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check"
import { getPerformance } from "firebase/performance"
import { useEffect } from "react"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_APPID,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
}

interface FirebaseInitScriptProps {
  production?: boolean
}

export function FirebaseInitScript({ production }: FirebaseInitScriptProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && production) {
      const clientApp = initializeApp(firebaseConfig)

      getPerformance(clientApp)

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
  }, [production])

  return null
}

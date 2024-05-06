// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  ReCaptchaV3Provider,
  getToken,
  initializeAppCheck
} from "firebase/app-check"
import { getPerformance } from "firebase/performance"

import { event } from "@/components/googleAnalytics/gtag"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

if (typeof document !== "undefined") {
  // Performance monitoring
  getPerformance(app)
  // AppCheck
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA!),
    isTokenAutoRefreshEnabled: true
  })
  getToken(appCheck).catch((error) => {
    event(`error`, {
      label: `app_check_error`,
      value: error
    })
  })
}

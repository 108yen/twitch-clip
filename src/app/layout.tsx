import { ReactNode, Suspense } from "react"

import DefaultHeader from "@/app/_Component/defaultHeader"
import Adsbygoogle from "@/components/adsense/adsbygoogle"
import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics"

import generateTemplateMetadata from "../utils/generateTemplateMetadata"

import ThemeRegistry from "./_Component/ThemeRegistry"
import FirebaseInitScript from "./_Component/firebaseScript"

export function generateMetadata() {
  return generateTemplateMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <Suspense>
          <GoogleAnalytics
            debugMode={process.env.NEXT_PUBLIC_DEBUG_MODE == "1"}
          />
          <Adsbygoogle />
        </Suspense>
      </head>
      <body>
        <FirebaseInitScript />

        <ThemeRegistry options={{ key: "css", prepend: true }}>
          <DefaultHeader />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}

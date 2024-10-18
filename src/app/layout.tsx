import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics"
import { Header } from "@/components/layouts"
import { PageProvider } from "@/contexts"
import { FirebaseInitScript } from "@/firebase/client"
import { config, theme } from "@/theme"
import { Adsbygoogle } from "@/utils/adsense"
import generateTemplateMetadata from "@/utils/generateTemplateMetadata"
import { getVersion } from "@/utils/next"
import { UIProvider } from "@yamada-ui/react"
import { ReactNode, Suspense } from "react"

export function generateMetadata() {
  return generateTemplateMetadata()
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const version = await getVersion()

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

        <PageProvider version={version}>
          <UIProvider config={config} theme={theme}>
            <Header />
            {children}
          </UIProvider>
        </PageProvider>
      </body>
    </html>
  )
}

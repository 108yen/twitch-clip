import { GoogleAnalytics } from "@/components/google-analytics"
import { Header } from "@/components/layouts"
import { PageProvider } from "@/contexts"
import { FirebaseInitScript } from "@/firebase/client"
import { config, theme } from "@/theme"
import { Adsbygoogle } from "@/utils/adsense"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { getVersion } from "@/utils/next"
import { YamadaUIScripts } from "@/utils/yamada-ui-scripts"
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
    <html lang="ja" suppressHydrationWarning>
      <head>
        <Suspense>
          <GoogleAnalytics debugMode={process.env.VERCEL_ENV != "production"} />
          <Adsbygoogle />
        </Suspense>
      </head>
      <body suppressHydrationWarning>
        <FirebaseInitScript />

        <YamadaUIScripts />

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

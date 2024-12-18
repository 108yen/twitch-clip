import { Header } from "@/components/layouts"
import { PageProvider } from "@/contexts"
import { FirebaseInitScript } from "@/firebase/client"
import { config, theme } from "@/theme"
import { Adsbygoogle } from "@/utils/adsense"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { GoogleAnalytics } from "@/utils/google-analytics"
import { getVersion } from "@/utils/ssr"
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

        <GoogleAnalytics
          debugMode={process.env.VERCEL_ENV != "production"}
          gaId={process.env.NEXT_PUBLIC_GA_ID as string}
        />
      </body>
    </html>
  )
}

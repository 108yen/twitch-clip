import { Header } from "@/components/layouts"
import { PageProvider } from "@/contexts"
import { config, theme } from "@/theme"
import { Adsbygoogle } from "@/utils/adsense"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { GoogleAnalytics } from "@/utils/google-analytics"
import { getVersion } from "@/utils/ssr"
import { YamadaUIScripts } from "@/utils/yamada-ui-scripts"
import { UIProvider } from "@yamada-ui/react"
import { Viewport } from "next"
import { ReactNode, Suspense } from "react"

export const viewport: Viewport = {
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
  ],
}

export function generateMetadata() {
  return generateTemplateMetadata()
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const version = await getVersion()
  const production = process.env.VERCEL_ENV == "production"

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <Suspense>
          <Adsbygoogle />
        </Suspense>
      </head>
      <body suppressHydrationWarning>
        <YamadaUIScripts />

        <PageProvider version={version}>
          <UIProvider config={config} theme={theme}>
            <Header />

            {children}
          </UIProvider>
        </PageProvider>

        <GoogleAnalytics
          config={{ version }}
          debugMode={!production}
          gaId={process.env.NEXT_PUBLIC_GA_ID as string}
        />
      </body>
    </html>
  )
}

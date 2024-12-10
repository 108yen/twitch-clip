"use client"

import Script from "next/script"

import { GA_MEASUREMENT_ID } from "./gtag"

export function GoogleAnalytics({ debugMode = false }: { debugMode: boolean }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
                ${debugMode ? `debug_mode: ${debugMode},` : ""}
            });
        `}
      </Script>
    </>
  )
}

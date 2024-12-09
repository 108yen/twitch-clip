"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

import { GA_MEASUREMENT_ID, gaEvent } from "./gtag"

export function GoogleAnalytics({ debugMode = false }: { debugMode: boolean }) {
  const path = usePathname()

  useEffect(
    () =>
      gaEvent("page_view", {
        page_location: path,
        page_title: document.title,
      }),
    [path],
  )

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
                page_path: window.location.pathname,
                send_page_view: false,
                ${debugMode ? `debug_mode: ${debugMode},` : ""}
            });
        `}
      </Script>
    </>
  )
}

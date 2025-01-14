"use client"
import { GAParams } from "@/types/google"
import Script from "next/script"
import React, { useEffect, useMemo } from "react"

import { getDisplayMode, getThemeMode } from "./mode"

declare global {
  interface Window {
    dataLayer?: object[]
  }
}

let currDataLayerName: string | undefined = undefined

export function GoogleAnalytics({
  config,
  dataLayerName = "dataLayer",
  debugMode,
  gaId,
  nonce,
}: GAParams) {
  const displayMode = getDisplayMode()
  const { colorMode, themeScheme } = getThemeMode()

  const additionalConfigInfo = useMemo(
    () =>
      JSON.stringify({
        ...(debugMode ? { debug_mode: true } : {}),
        color_mode: colorMode,
        display_mode: displayMode,
        theme_scheme: themeScheme,
        ...config,
      }),
    [colorMode, config, debugMode, displayMode, themeScheme],
  )

  if (currDataLayerName === undefined) {
    currDataLayerName = dataLayerName
  }

  useEffect(() => {
    performance.mark("mark_feature_usage", {
      detail: {
        feature: "next-third-parties-ga",
      },
    })
  }, [])

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window['${dataLayerName}'] = window['${dataLayerName}'] || [];
          function gtag(){window['${dataLayerName}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}' ,${additionalConfigInfo});`,
        }}
        id="_next-ga-init"
        nonce={nonce}
      />
      <Script
        id="_next-ga"
        nonce={nonce}
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function sendGAEvent(..._args: any[]) {
  if (currDataLayerName === undefined) {
    console.warn(`@next/third-parties: GA has not been initialized`)
    return
  }

  if (window[currDataLayerName]) {
    // eslint-disable-next-line prefer-rest-params
    window[currDataLayerName].push(arguments)
  } else {
    console.warn(
      `@next/third-parties: GA dataLayer ${currDataLayerName} does not exist`,
    )
  }
}

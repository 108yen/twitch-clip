"use client"
import { GAParams } from "@/types/google"
import Script from "next/script"
import React, { useEffect } from "react"

declare global {
  interface Window {
    dataLayer?: object[]
  }
}

let currDataLayerName: string | undefined = undefined

export function GoogleAnalytics(props: GAParams) {
  const { dataLayerName = "dataLayer", debugMode, gaId, nonce } = props

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

          gtag('config', '${gaId}' ${debugMode ? ",{ 'debug_mode': true }" : ""});`,
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

export function sendGAEvent(...args: any[]) {
  if (currDataLayerName === undefined) {
    console.warn(`@next/third-parties: GA has not been initialized`)
    return
  }

  if (window[currDataLayerName]) {
    window[currDataLayerName].push(...args)
  } else {
    console.warn(
      `@next/third-parties: GA dataLayer ${currDataLayerName} does not exist`,
    )
  }
}

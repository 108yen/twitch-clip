declare global {
  interface Window {
    [key: string]: any
    dataLayer?: object[]
  }
}

export type GAParams = {
  dataLayerName?: string
  debugMode?: boolean
  gaId: string
  nonce?: string
}

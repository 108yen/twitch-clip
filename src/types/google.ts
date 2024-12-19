declare global {
  interface Window {
    [key: string]: any
    dataLayer?: object[]
  }
}

type JSONValue =
  | boolean
  | JSONValue[]
  | number
  | string
  | { [key: string]: JSONValue }

export type GAParams = {
  config?: Record<string, JSONValue>
  dataLayerName?: string
  debugMode?: boolean
  gaId: string
  nonce?: string
}

import { useCallback, useSyncExternalStore } from "react"

type Options = AddEventListenerOptions | boolean

export function useSubscribeEvent<T extends any>(
  event: string,
  snapshot: () => T,
  serverSnapshot?: () => T,
  options?: Options,
) {
  const subscribe = useCallback(
    (callback: () => void) => {
      window.addEventListener(event, callback, options)
      return () => window.removeEventListener(event, callback, options)
    },
    [event, options],
  )

  return useSyncExternalStore<T>(subscribe, snapshot, serverSnapshot)
}

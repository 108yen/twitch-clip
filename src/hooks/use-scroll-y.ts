import { useSyncExternalStore } from "react"

function subscribe(callback: () => void): () => void {
  window.addEventListener("scroll", callback)
  return () => window.removeEventListener("scroll", callback)
}

export function useScrollY(): number {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY,
    () => 0,
  )
}

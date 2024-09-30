"use client"

import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { createContext, PropsWithChildren, useContext, useMemo } from "react"

export interface ClipProviderProps extends PropsWithChildren {
  clipDoc?: ClipDoc
  setClipUrl?: (clip: Clip) => void
}

export const ClipContext = createContext<ClipProviderProps>({})

export function ClipProvider({ children, ...rest }: ClipProviderProps) {
  const value = useMemo(() => ({ ...rest }), [rest])

  return <ClipContext.Provider value={value}>{children}</ClipContext.Provider>
}

export function useClip() {
  return useContext(ClipContext)
}

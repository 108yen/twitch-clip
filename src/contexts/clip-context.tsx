"use client"

import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"

export interface ClipProviderProps extends PropsWithChildren {
  setClipUrl?: (clip: Clip) => void
  clipDoc?: ClipDoc
}

export const ClipContext = createContext<ClipProviderProps>({})

export function ClipProvider({ children, ...rest }: ClipProviderProps) {
  const value = useMemo(() => ({ ...rest }), [rest])

  return <ClipContext.Provider value={value}>{children}</ClipContext.Provider>
}

export function useClip() {
  return useContext(ClipContext)
}

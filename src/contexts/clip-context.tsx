"use client"

import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { createContext, PropsWithChildren, useContext, useMemo } from "react"

export interface ClipProviderProps extends PropsWithChildren {
  clipDoc: ClipDoc
  currentClip?: Clip
  setClipUrl: (clip: Clip | undefined) => void
}

const initialContext: ClipProviderProps = {
  clipDoc: new ClipDoc(),
  setClipUrl: () => {},
}

export const ClipContext = createContext<ClipProviderProps>(initialContext)

export function ClipProvider({ children, ...rest }: ClipProviderProps) {
  const value = useMemo(() => ({ ...rest }), [rest])

  return <ClipContext.Provider value={value}>{children}</ClipContext.Provider>
}

export function useClip() {
  return useContext(ClipContext)
}

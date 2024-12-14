"use client"
import { createContext, PropsWithChildren, useContext, useMemo } from "react"

export interface PageProviderProps extends PropsWithChildren {
  version: string
}

const defaultValue = {
  version: "",
}

export const PageContext = createContext<PageProviderProps>(defaultValue)

export function PageProvider({ children, ...rest }: PageProviderProps) {
  const value = useMemo(() => ({ ...rest }), [rest])

  return <PageContext value={value}>{children}</PageContext>
}

export function usePage() {
  return useContext(PageContext)
}

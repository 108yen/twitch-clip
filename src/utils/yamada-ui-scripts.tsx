"use client"

import { ColorModeScript, ThemeSchemeScript } from "@yamada-ui/react"
import { config } from "@/theme"

export function YamadaUIScripts() {
  const { initialColorMode, initialThemeScheme } = { ...config }

  return (
    <>
      <ThemeSchemeScript initialThemeScheme={initialThemeScheme} />
      <ColorModeScript initialColorMode={initialColorMode} />
    </>
  )
}

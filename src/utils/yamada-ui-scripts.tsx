"use client"

import { config } from "@/theme"
import { ColorModeScript, ThemeSchemeScript } from "@yamada-ui/react"

export function YamadaUIScripts() {
  const { initialColorMode, initialThemeScheme } = { ...config }

  return (
    <>
      <ThemeSchemeScript initialThemeScheme={initialThemeScheme} />
      <ColorModeScript initialColorMode={initialColorMode} />
    </>
  )
}

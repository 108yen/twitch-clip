"use client"
import { extendConfig, extendTheme, UsageTheme } from "@yamada-ui/react"
import { components } from "./components"
import { customConfig } from "./config"
import { themeSchemes } from "./semantics"
import styles from "./styles"
import tokens from "./tokens"

const customTheme: UsageTheme = {
  components,
  styles,
  themeSchemes,
  ...tokens,
}

export const theme = extendTheme(customTheme)()
export const config = extendConfig(customConfig)

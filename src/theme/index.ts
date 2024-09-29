"use client"
import { extendConfig, extendTheme, UsageTheme } from "@yamada-ui/react"
import { customConfig } from "./config"
import { semantics } from "./semantics"
import styles from "./styles"
import tokens from "./tokens"

const customTheme: UsageTheme = {
  styles,
  semantics,
  ...tokens
}

export const theme = extendTheme(customTheme)()
export const config = extendConfig(customConfig)

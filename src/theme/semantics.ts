import { COLOR_SCHEMES } from "@/constant/color-schemes"
import { ThemeSchemes } from "@yamada-ui/react"

export const themeSchemes = COLOR_SCHEMES.reduce<ThemeSchemes>(
  (prev, colorScheme) => ({
    ...prev,
    [colorScheme]: {
      semantics: {
        colors: {
          primary: `${colorScheme}.500`,
          ...(colorScheme === "violet" ? { secondary: "fuchsia.500" } : {}),
        },
        colorSchemes: {
          primary: colorScheme,
          ...(colorScheme === "violet" ? { secondary: "fuchsia" } : {}),
        },
      },
    },
  }),
  {},
)

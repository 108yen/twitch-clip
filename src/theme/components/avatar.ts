import {
  ComponentMultiStyle,
  getMemoizedObject as get,
  isDark,
  mode,
  randomColor,
} from "@yamada-ui/react"

export const Avatar: ComponentMultiStyle<"Avatar"> = {
  baseStyle: {
    badge: {
      borderColor: ["white", "black"],
      borderWidth: "0.2em",
      rounded: "full",
    },
    container: ({ colorMode: m, name: string, theme: t }) => {
      const bg = string
        ? randomColor({ string })
        : mode("gray.200", "gray.500")(m)

      return {
        _loaded: { bg: "inherit" },
        bg,
        borderColor: ["white", "black"],
        color: isDark(bg)(t, m) ? "white" : "black",
        verticalAlign: "top",
      }
    },
    excess: {
      bg: ["blackAlpha.200", "whiteAlpha.200"],
      borderColor: ["white", "black"],
    },
    group: {},
    name: {},
  },

  defaultProps: {
    size: "md",
  },

  sizes: {
    "2xl": ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.32")} / 2.5)`,
        h: "32",
        w: "32",
      },
      excess: { h: "32", w: "32" },
      name: {
        fontSize: `calc(${get(t, "sizes.32")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    "2xs": ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.4")} / 2.5)`,
        h: "4",
        w: "4",
      },
      excess: {
        fontSize: `calc(${get(t, "sizes.4")} / 2.5)`,
        h: "4",
        lineHeight: get(t, "sizes.16"),
        w: "4",
      },
      name: {
        fontSize: `calc(${get(t, "sizes.4")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    base: ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.10")} / 2.5)`,
        h: "10",
        w: "10",
      },
      excess: { h: "10", w: "10" },
      name: {
        fontSize: `calc(${get(t, "sizes.10")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    lg: ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.16")} / 2.5)`,
        h: "16",
        w: "16",
      },
      excess: { h: "16", w: "16" },
      name: {
        fontSize: `calc(${get(t, "sizes.16")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    md: ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.12")} / 2.5)`,
        h: "12",
        w: "12",
      },
      excess: { h: "12", w: "12" },
      name: {
        fontSize: `calc(${get(t, "sizes.12")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    sm: ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.8")} / 2.5)`,
        h: "8",
        w: "8",
      },
      excess: { h: "8", w: "8" },
      name: {
        fontSize: `calc(${get(t, "sizes.8")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    xl: ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.24")} / 2.5)`,
        h: "24",
        w: "24",
      },
      excess: { h: "24", w: "24" },
      name: {
        fontSize: `calc(${get(t, "sizes.24")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
    xs: ({ theme: t }) => ({
      container: {
        fontSize: `calc(${get(t, "sizes.6")} / 2.5)`,
        h: "6",
        w: "6",
      },
      excess: { h: "6", w: "6" },
      name: {
        fontSize: `calc(${get(t, "sizes.6")} / 2.5)`,
        lineHeight: get(t, "sizes.16"),
      },
    }),
  },
}

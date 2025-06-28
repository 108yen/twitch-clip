import { UIStyle } from "@yamada-ui/react"

export const globalStyle: UIStyle = {
  body: {
    _scrollbar: {
      display: "auto",
      width: "1.5",
    },
    _scrollbarThumb: {
      bg: "gray.500",
      borderRadius: "full",
    },
    bg: ["white", "black"],
    userSelect: "none",
  },
}

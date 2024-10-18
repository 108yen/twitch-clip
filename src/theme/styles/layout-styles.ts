import { CSSUIObject, Dict } from "@yamada-ui/react"

export const layoutStyles: Dict<CSSUIObject> = {
  borderCard: {
    border: "1px solid",
    borderColor: "secondary",
    borderRadius: "md",
    overflow: "hidden",
  },
  scrollArea: {
    _scrollbar: {
      display: "auto",
      width: "1.5",
    },
    _scrollbarThumb: {
      bg: "gray.500",
      borderRadius: "full",
    },
    overflowY: "scroll",
    p: 0,
  },
}

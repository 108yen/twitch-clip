import { CSSUIObject, Dict } from "@yamada-ui/react"

export const layoutStyles: Dict<CSSUIObject> = {
  borderCard: {
    _hover: {
      bg: ["blackAlpha.50", "whiteAlpha.50"],
      borderColor: "secondary.500",
    },
    border: "1px solid",
    borderColor: "border",
    borderRadius: "md",
    overflow: "hidden",
    transition: "0.2s ease",
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

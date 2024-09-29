import { TextStyles } from "@yamada-ui/react"

export const textStyles: TextStyles = {
  navigation: {
    transitionDuration: "0.3s",
    color: ["blackAlpha.500", "whiteAlpha.500"],
    _hover: {
      color: ["black", "white"],
    },
    _selected: {
      color: ["black", "white"],
    },
  },
  version: {
    color: ["blackAlpha.500", "whiteAlpha.500"],
    fontSize:"sm"
  },
}

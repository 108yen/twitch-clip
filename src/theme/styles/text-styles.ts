import { TextStyles } from "@yamada-ui/react"

export const textStyles: TextStyles = {
  adsenseTitle: {
    color: ["blackAlpha.500", "whiteAlpha.500"],
    fontSize: "sm",
    textAlign: "center",
  },
  description: {
    color: ["blackAlpha.900", "whiteAlpha.900"],
    h: "sm",
    overflow: "auto",
    scrollbarWidth: "none",
  },
  follower: {
    color: ["blackAlpha.700", "whiteAlpha.600"],
    fontSize: "sm",
    minW: "4xs",
  },
  navigation: {
    _hover: {
      color: ["black", "white"],
    },
    _selected: {
      color: ["black", "white"],
    },
    color: ["blackAlpha.500", "whiteAlpha.500"],
    transitionDuration: "0.3s",
  },
  version: {
    color: ["blackAlpha.500", "whiteAlpha.500"],
    fontSize: "sm",
  },
  viewCount: {
    color: ["blackAlpha.700", "whiteAlpha.600"],
    fontSize: "sm",
    minW: "4xs",
    textAlign: "right",
  },
}

import { TextStyles } from "@yamada-ui/react"

export const textStyles: TextStyles = {
  adsenseTitle: {
    color: ["blackAlpha.500", "whiteAlpha.500"],
    fontSize: "sm",
    textAlign: "center",
  },
  date: {
    color: ["blackAlpha.700", "whiteAlpha.600"],
    fontSize: "sm",
    minW: "5xs",
    textAlign: "right",
  },
  description: {
    color: ["blackAlpha.700", "whiteAlpha.700"],
    fontSize: "sm",
    h: "6xs",
    overflow: "auto",
    scrollbarWidth: "none",
  },
  follower: {
    color: ["blackAlpha.700", "whiteAlpha.600"],
    fontSize: "sm",
    minW: "4xs",
  },
  navigation: {
    _focusVisible: {
      color: ["black", "white"],
    },
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

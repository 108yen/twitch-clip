import { LayerStyles } from "@yamada-ui/react"

export const layerStyles: LayerStyles = {
  borderCard: {
    _active: {
      bg: ["blackAlpha.50", "whiteAlpha.50"],
      borderColor: "primary.500",
    },
    _hover: {
      bg: ["blackAlpha.50", "whiteAlpha.50"],
      borderColor: "primary.500",
    },
    border: "1px solid",
    borderColor: "border",
    borderRadius: "md",
    overflow: "hidden",
    transition: "0.2s ease",
  },
  navigation: {
    _before: {
      bg: "$bg",
      borderRadius: "md",
      height: "anchor-size(--hover height)",
      left: "anchor(--hover left)",
      pointerEvents: "none",
      position: "absolute",
      top: "anchor(--hover top)",
      transitionDuration: "slow",
      transitionProperty: "left, width",
      transitionTimingFunction: "ease",
      width: "anchor-size(--hover width)",
    },
    vars: [
      {
        name: "bg",
        token: "colors",
        value: ["blackAlpha.100", "whiteAlpha.100"],
      },
    ],
  },
  navigationItem: {
    _focus: { outline: "none" },
    _focusVisible: { "anchor-name": "--hover" },
    _hover: { "anchor-name": "--hover" },
  },
  player: {
    _active: {
      borderColor: "primary.500",
    },
    _hover: {
      borderColor: "primary.500",
    },
    bg: ["white", "black"],
    border: { base: "1px solid", sm: "none" },
    borderColor: "border",
    borderRadius: { base: "md", sm: "none" },
    overflow: "hidden",
    transition: "0.2s ease",
  },
}

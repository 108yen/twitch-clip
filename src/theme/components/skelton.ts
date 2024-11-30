import { ComponentStyle } from "@yamada-ui/react"

export const Skeleton: ComponentStyle<"Skeleton"> = {
  baseStyle: {
    background: ["gray.300", "gray.600"],
    borderColor: ["gray.400", "gray.700"],
    borderRadius: "sm",
    opacity: 1,
  },
  defaultProps: {
    endColor: ["gray.400", "gray.700"],
    startColor: ["gray.300", "gray.600"],
  },
}

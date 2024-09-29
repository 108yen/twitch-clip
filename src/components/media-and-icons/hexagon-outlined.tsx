import { Icon, IconProps } from "@yamada-ui/react"
import { forwardRef } from "react"

export const HexagonOutlined = forwardRef<SVGSVGElement, IconProps>(
  ({ fontSize = "5xl", color, ...rest }, ref) => {
    return (
      <Icon
        ref={ref}
        fontSize={fontSize}
        fill={color ?? "currentColor"}
        viewBox="0 0 24 24"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path d="M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9zm-1.15 16h-8.1l-4.04-7 4.04-7h8.09l4.04 7z" />
      </Icon>
    )
  },
)

HexagonOutlined.displayName = "HexagonOutlined"

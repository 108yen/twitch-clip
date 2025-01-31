import { Icon, IconProps } from "@yamada-ui/react"

interface HexagonOutlinedIconProps extends IconProps {}

export function HexagonOutlined({
  color,
  fontSize = "5xl",
  ...rest
}: HexagonOutlinedIconProps) {
  return (
    <Icon
      fill={color ?? "currentColor"}
      focusable="false"
      fontSize={fontSize}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9zm-1.15 16h-8.1l-4.04-7 4.04-7h8.09l4.04 7z" />
    </Icon>
  )
}

HexagonOutlined.displayName = "HexagonOutlined"

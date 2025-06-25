import { Button, ButtonProps } from "@yamada-ui/react"

export interface DrawerButtonProps extends ButtonProps {
  href?: string
  target?: string
}

export function DrawerButton(props: DrawerButtonProps) {
  return (
    <Button
      color={["blackAlpha.800", "whiteAlpha.700"]}
      colorScheme="primary"
      justifyContent="flex-start"
      tabIndex={-1}
      variant="ghost"
      {...props}
    />
  )
}

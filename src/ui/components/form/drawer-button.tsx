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
      fontSize="sm"
      fontWeight="medium"
      h={12}
      justifyContent="flex-start"
      px="sm"
      tabIndex={-1}
      variant="ghost"
      {...props}
    />
  )
}

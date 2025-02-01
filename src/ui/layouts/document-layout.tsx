import { Box, BoxProps, Center } from "@yamada-ui/react"
import { PropsWithChildren } from "react"

interface DocumentLayoutProps extends BoxProps, PropsWithChildren {}

export function DocumentLayout({ children, ...rest }: DocumentLayoutProps) {
  return (
    <Center>
      <Box maxW="5xl" p="md" w="full" {...rest}>
        {children}
      </Box>
    </Center>
  )
}

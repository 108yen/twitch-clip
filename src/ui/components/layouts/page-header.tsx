import { Heading, HStack, Spacer, StackProps } from "@yamada-ui/react"

interface PageHeaderProps extends StackProps {
  title?: string
}

export function PageHeader({ children, title, ...rest }: PageHeaderProps) {
  return (
    <HStack marginY={{ base: "lg", sm: "sm" }} p={0} w="full" {...rest}>
      <Heading as="h1" fontWeight="medium" size="xl">
        {title}
      </Heading>

      <Spacer />

      {children}
    </HStack>
  )
}

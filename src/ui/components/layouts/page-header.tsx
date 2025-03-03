import { Heading, HStack, Spacer, StackProps } from "@yamada-ui/react"

interface PageHeaderProps extends StackProps {
  title?: string
}

export function PageHeader({ children, title, ...rest }: PageHeaderProps) {
  return (
    <HStack my={{ base: "lg", sm: "md" }} p={0} w="full" {...rest}>
      <Heading as="h1" fontWeight="medium" size="xl">
        {title}
      </Heading>

      <Spacer />

      {children}
    </HStack>
  )
}

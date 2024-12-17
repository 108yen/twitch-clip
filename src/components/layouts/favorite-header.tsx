import { Container, ContainerProps, Heading } from "@yamada-ui/react"

interface FavoriteHeaderProps extends ContainerProps {}

export function FavoriteHeader(props: FavoriteHeaderProps) {
  return (
    <Container marginY={{ base: "md", sm: "sm" }} p={0} w="full" {...props}>
      <Heading as="h2" size="lg">
        Favorite
      </Heading>
    </Container>
  )
}

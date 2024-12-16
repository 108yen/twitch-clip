import { Container, Heading } from "@yamada-ui/react"

export function FavoriteHeader() {
  return (
    <Container
      borderBottom="solid"
      borderColor="border"
      marginY={{ base: "lg", sm: "sm" }}
      p={0}
      w="full"
    >
      <Heading as="h2" size="lg">
        Favorite
      </Heading>
    </Container>
  )
}

import { Container, Heading } from "@yamada-ui/react"

export function FavoriteHeader() {
  return (
    <Container
      borderBottom="solid"
      borderColor="border"
      marginY="lg"
      p={0}
      w="full"
    >
      <Heading>Favorite</Heading>
    </Container>
  )
}

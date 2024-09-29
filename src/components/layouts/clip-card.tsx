/* eslint-disable @next/next/no-img-element */
import { AspectRatio, Container, HStack, VStack } from "@yamada-ui/react"
import { Clip } from "@/models/clip"

type ClipCardProps = {
  clip: Clip
}

export function ClipCard({ clip }: ClipCardProps) {
  const { title, thumbnail_url } = clip

  return (
    <Container apply="layoutStyles.borderCard">
      <HStack >
        <AspectRatio w="lg" ratio={16 / 9}>
          <img
            src={thumbnail_url}
            alt={title}
            loading="lazy"
          />
        </AspectRatio>

        <VStack w="full"></VStack>
      </HStack>
    </Container>
  )
}

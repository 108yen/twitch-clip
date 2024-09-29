/* eslint-disable @next/next/no-img-element */
import { SquareArrowOutUpRight } from "@yamada-ui/lucide"
import {
  AspectRatio,
  Avatar,
  Container,
  Heading,
  HStack,
  IconButton,
  Spacer,
  VStack,
  Text,
} from "@yamada-ui/react"
import { Clip } from "@/models/clip"
import { formatDate } from "@/utils/string"

type ClipCardProps = {
  clip: Clip
}

export function ClipCard({ clip }: ClipCardProps) {
  const {
    title,
    thumbnail_url,
    broadcaster_name,
    profile_image_url,
    creator_name,
    created_at: _created_at = "",
    view_count: _view_count,
  } = clip

  const created_at = formatDate(_created_at)
  const view_count = _view_count?.toLocaleString() + " views"

  return (
    <Container apply="layoutStyles.borderCard">
      <HStack gap={0}>
        <AspectRatio w="lg" ratio={16 / 9}>
          <img src={thumbnail_url} alt={title} loading="lazy" />
        </AspectRatio>

        <VStack w="full" gap={0} marginX="sm">
          <HStack aria-label={title}>
            <Heading variant="h5" fontSize="xl">
              {title}
            </Heading>

            <Spacer />

            <IconButton icon={<SquareArrowOutUpRight />} variant="primary" />
          </HStack>

          <HStack aria-label={broadcaster_name}>
            <Avatar name={broadcaster_name} src={profile_image_url} />
            <Text>{broadcaster_name}</Text>
          </HStack>

          <Text aria-describedby="Clip creator name">
            created_by : {creator_name}
          </Text>

          <Text aria-describedby="Clip created date">
            created_at : {created_at}
          </Text>

          <Text textAlign="end" color={["blackAlpha.600", "whiteAlpha.600"]}>
            {view_count}
          </Text>
        </VStack>
      </HStack>
    </Container>
  )
}

import { TwitchLink } from "@/components/media-and-icons"
import { Streamer } from "@/models/streamer"
import { Ghost } from "@yamada-ui/lucide"
import {
  Avatar,
  Container,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"

interface ChannelCardProps {
  streamer: Streamer
}

export function ChannelCard({ streamer }: ChannelCardProps) {
  const {
    description,
    display_name,
    follower_num: _follower_num,
    id,
    login,
    profile_image_url,
  } = streamer

  const follower_num = `${_follower_num?.toLocaleString()} followers`

  return (
    <Container apply="layoutStyles.borderCard" p="sm">
      <HStack gap={2} w="full">
        <Avatar
          alt={display_name}
          aria-label="Streamer channel page link"
          as={Link}
          href={`/streamer/${id}`}
          icon={<Ghost />}
          src={profile_image_url}
        />

        <VStack overflow="hidden" w="full">
          <HStack>
            <Heading
              aria-label="streamer channel page link"
              as={Link}
              cursor="pointer"
              fontSize="xl"
              fontWeight="semibold"
              href={`/streamer/${id}`}
              isTruncated
              variant="h5"
            >
              {display_name}
            </Heading>

            <Spacer />

            <TwitchLink login={login} name={display_name} />
          </HStack>

          <Text textStyle="description">{description}</Text>

          <Text textAlign="right" textStyle="follower" w="full">
            {follower_num}
          </Text>
        </VStack>
      </HStack>
    </Container>
  )
}

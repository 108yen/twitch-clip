import { TwitchLink } from "@/components/media-and-icons"
import { Streamer } from "@/models/streamer"
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
    <Container apply="layoutStyles.borderCard" p={0}>
      <HStack gap={1} w="full">
        <Avatar
          alt="top"
          aria-label="Streamer channel page link"
          as={Link}
          href={`/streamer/${id}`}
          prefetch={false}
          src={profile_image_url}
        />

        <VStack overflow="hidden" w="full">
          <HStack>
            <Heading
              aria-label="streamer channel page link"
              as={Link}
              href={`/streamer/${id}`}
              prefetch={false}
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

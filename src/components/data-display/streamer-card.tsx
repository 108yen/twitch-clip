import { TwitchLink } from "@/components/media-and-icons"
import { Streamer } from "@/models/streamer"
import { Avatar, Heading, HStack, Spacer, Text, VStack } from "@yamada-ui/react"
import Link from "next/link"

interface StreamerCardProps {
  streamer: Streamer
}

export function StreamerCard({ streamer }: StreamerCardProps) {
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
    <HStack gap={1} justifyContent="flex-start" w="full">
      <Avatar
        alt="Top"
        aria-label="streamer page link"
        as={Link}
        href={`/streamer/${id}`}
        prefetch={false}
        size="lg"
        src={profile_image_url}
      />

      <VStack gap={1} w="full">
        <HStack w="full">
          <Heading isTruncated>{display_name}</Heading>

          <Spacer />

          <TwitchLink login={login} name={display_name} />
        </HStack>

        <Text textStyle="description">{description}</Text>

        <Text textAlign="right" textStyle="follower" w="full">
          {follower_num}
        </Text>
      </VStack>
    </HStack>
  )
}

"use client"
import { TwitchLink } from "@/components/media-and-icons"
import { useClip } from "@/contexts"
import { GhostIcon } from "@yamada-ui/lucide"
import { Avatar, HStack, Text, VStack } from "@yamada-ui/react"
import Link from "next/link"

export function StreamerInfo() {
  const { currentClip } = useClip()

  const {
    broadcaster_follower_num,
    broadcaster_id,
    broadcaster_login,
    broadcaster_name,
    profile_image_url,
  } = currentClip!

  const followers = `${broadcaster_follower_num?.toLocaleString()} followers`

  return (
    <HStack>
      <Avatar
        alt={broadcaster_name}
        as={Link}
        href={`/streamer/${broadcaster_id}`}
        icon={<GhostIcon />}
        src={profile_image_url}
      />

      <HStack alignItems="flex-end" w="full">
        <VStack
          aria-label="streamer page link"
          as={Link}
          gap={1}
          href={`/streamer/${broadcaster_id}`}
        >
          <Text fontWeight="bold">{broadcaster_name}</Text>

          <Text textStyle="follower">{followers}</Text>
        </VStack>

        <TwitchLink login={broadcaster_login} name={broadcaster_name} />
      </HStack>
    </HStack>
  )
}

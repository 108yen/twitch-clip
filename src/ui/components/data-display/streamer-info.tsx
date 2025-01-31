"use client"
import { useClip } from "@/contexts"
import { GhostIcon } from "@yamada-ui/lucide"
import { HStack, Spacer, Text, VStack } from "@yamada-ui/react"
import Link from "next/link"

import { SkeletonAvatar, TwitchLink } from "../media-and-icons"

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
      <SkeletonAvatar
        alt={broadcaster_name}
        as={Link}
        href={`/streamer/${broadcaster_id}`}
        icon={<GhostIcon />}
        src={profile_image_url}
      />

      <HStack alignItems="flex-end" gap={0} w="full">
        <VStack
          aria-label="streamer page link"
          as={Link}
          gap={1}
          href={`/streamer/${broadcaster_id}`}
          w="fit-content"
        >
          <Text fontWeight="bold">{broadcaster_name}</Text>

          <Text textStyle="follower">{followers}</Text>
        </VStack>

        <Spacer />

        <TwitchLink login={broadcaster_login} />
      </HStack>
    </HStack>
  )
}

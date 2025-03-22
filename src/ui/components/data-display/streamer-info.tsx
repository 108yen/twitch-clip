"use client"
import { useClip } from "@/contexts"
import { GhostIcon } from "@yamada-ui/lucide"
import { HStack, Spacer, Text, VStack } from "@yamada-ui/react"
import Link from "next/link"

import { SkeletonAvatar, TwitchLink } from "../media-and-icons"
import { TeamTag } from "./team-tag"

export function StreamerInfo() {
  const { currentClip } = useClip()

  const {
    broadcaster_follower_num,
    broadcaster_id,
    broadcaster_login,
    broadcaster_name,
    profile_image_url,
    teams,
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

      <VStack gap={1} w="full">
        <HStack>
          <Text
            aria-label="streamer page link"
            as={Link}
            fontWeight="bold"
            href={`/streamer/${broadcaster_id}`}
          >
            {broadcaster_name}
          </Text>

          <TeamTag teams={teams} />
        </HStack>

        <HStack gap={0}>
          <Text textStyle="follower">{followers}</Text>

          <Spacer />

          <TwitchLink login={broadcaster_login} />
        </HStack>
      </VStack>
    </HStack>
  )
}

"use client"
import { event } from "@/components/googleAnalytics"
import { useClip } from "@/contexts"
import { SquareArrowOutUpRight } from "@yamada-ui/lucide"
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

  return (
    <HStack gap={1}>
      <Avatar
        alt="top"
        as={Link}
        href={`/streamer/${broadcaster_id}`}
        prefetch={false}
        src={profile_image_url}
      />

      <HStack alignItems="flex-end" w="full">
        <VStack
          aria-label="streamer page link"
          as={Link}
          gap={1}
          href={`/streamer/${broadcaster_id}`}
          prefetch={false}
        >
          <Text fontWeight="bold">{broadcaster_name}</Text>

          <Text textStyle="follower">
            {`${broadcaster_follower_num?.toLocaleString() ?? ""} followers`}
          </Text>
        </VStack>

        <HStack
          aria-label="twitch channel page link"
          as={Link}
          gap={1}
          href={"https://www.twitch.tv/" + broadcaster_login}
          onClick={() => {
            event("click", {
              channel_title: broadcaster_name,
              label: "click_twitch_channel",
              link_url: "https://www.twitch.tv/" + broadcaster_login,
            })
          }}
          target="_blank"
        >
          <Text>Twitch</Text>

          <SquareArrowOutUpRight />
        </HStack>
      </HStack>
    </HStack>
  )
}

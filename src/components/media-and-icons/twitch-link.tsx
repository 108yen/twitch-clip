"use client"
import { event } from "@/components/google-analytics"
import { SquareArrowOutUpRightIcon } from "@yamada-ui/lucide"
import { HStack, Link, Text } from "@yamada-ui/react"

interface TwitchLinkProps {
  login?: string
  name?: string
}

export function TwitchLink({ login, name }: TwitchLinkProps) {
  return (
    <HStack
      aria-label="twitch channel page link"
      as={Link}
      color={["black", "white"]}
      gap={1}
      href={"https://www.twitch.tv/" + login}
      onClick={() => {
        event("click", {
          channel_title: name,
          label: "click_twitch_channel",
          link_url: "https://www.twitch.tv/" + login,
        })
      }}
      target="_blank"
      textDecoration="none"
    >
      <Text>Twitch</Text>

      <SquareArrowOutUpRightIcon />
    </HStack>
  )
}

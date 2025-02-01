"use client"
import { SquareArrowOutUpRightIcon } from "@yamada-ui/lucide"
import { HStack, Link, Text } from "@yamada-ui/react"

interface TwitchLinkProps {
  login?: string
}

export function TwitchLink({ login }: TwitchLinkProps) {
  return (
    <HStack
      aria-label="twitch channel page link"
      as={Link}
      color={["black", "white"]}
      gap={1}
      href={`https://www.twitch.tv/${login}`}
      target="_blank"
      textDecoration="none"
    >
      <Text>Twitch</Text>

      <SquareArrowOutUpRightIcon />
    </HStack>
  )
}

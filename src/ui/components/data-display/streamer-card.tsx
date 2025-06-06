import { Streamer } from "@/models/streamer"
import { GhostIcon } from "@yamada-ui/lucide"
import { Heading, HStack, Spacer, Stack, Text, VStack } from "@yamada-ui/react"
import Link from "next/link"
import { SkeletonAvatar, TwitchLink } from "../media-and-icons"
import { TeamTag } from "./team-tag"

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
    teams,
  } = streamer

  const follower_num = `${_follower_num?.toLocaleString()} followers`

  return (
    <HStack
      gap={2}
      itemScope
      itemType="https://schema.org/Person"
      justifyContent="flex-start"
      w="full"
    >
      <SkeletonAvatar
        alt={display_name}
        aria-label="streamer page link"
        as={Link}
        href={`/streamer/${id}`}
        icon={<GhostIcon />}
        itemProp="image"
        size="lg"
        src={profile_image_url}
      />

      <VStack gap={1} w="full">
        <HStack alignItems="flex-start" w="full">
          <Stack
            direction={{ base: "row", sm: "column" }}
            gap={{ base: "md", sm: "xs" }}
          >
            <Heading
              fontSize="2xl"
              fontWeight="semibold"
              itemProp="name"
              lineClamp={1}
              overflowWrap="anywhere"
              variant="h4"
            >
              {display_name}
            </Heading>

            <TeamTag teams={teams} />
          </Stack>

          <Spacer />

          <TwitchLink login={login} />
        </HStack>

        <Text itemProp="description" textStyle="description">
          {description}
        </Text>

        <Text textAlign="right" textStyle="follower" w="full">
          {follower_num}
        </Text>
      </VStack>
    </HStack>
  )
}

import { Streamer } from "@/models/streamer"
import { GhostIcon } from "@yamada-ui/lucide"
import {
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"

import { SkeletonAvatar, TwitchLink } from "../media-and-icons"

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
    <LinkBox as="article" layerStyle="borderCard" p="sm">
      <HStack gap={2} itemScope itemType="https://schema.org/Person" w="full">
        <SkeletonAvatar
          alt={display_name}
          icon={<GhostIcon />}
          itemProp="image"
          src={profile_image_url}
        />

        <VStack overflow="hidden" w="full">
          <HStack>
            <Heading
              fontSize="xl"
              fontWeight="semibold"
              isTruncated
              variant="h5"
            >
              <LinkOverlay
                aria-label="Streamer channel page link"
                as={Link}
                href={`/streamer/${id}`}
                itemProp="name"
              >
                {display_name}
              </LinkOverlay>
            </Heading>

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
    </LinkBox>
  )
}

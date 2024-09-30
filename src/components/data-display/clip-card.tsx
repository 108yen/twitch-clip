/* eslint-disable @next/next/no-img-element */
import { SquareArrowOutUpRight } from "@yamada-ui/lucide"
import {
  AspectRatio,
  Avatar,
  Container,
  Heading,
  HStack,
  IconButton,
  Spacer,
  VStack,
  Text,
} from "@yamada-ui/react"
import Link from "next/link"
import { event } from "@/components/googleAnalytics/gtag"
import { Clip } from "@/models/clip"
import { formatDate } from "@/utils/string"

type ClipCardProps = {
  clip: Clip
  tab: string
  setClickedClipUrl?: (clip: Clip) => void
}

export function ClipCard({ clip, tab, setClickedClipUrl }: ClipCardProps) {
  const {
    title,
    thumbnail_url,
    broadcaster_name,
    broadcaster_id,
    profile_image_url,
    creator_name,
    created_at: _created_at = "",
    view_count: _view_count,
  } = clip

  const created_at = formatDate(_created_at)
  const view_count = _view_count?.toLocaleString() + " views"

  return (
    <Container apply="layoutStyles.borderCard" p={0}>
      <HStack gap={0}>
        <AspectRatio minW={{ base: "sm", sm: "48" }} ratio={16 / 9}>
          <img src={thumbnail_url} alt={title} loading="lazy" />
        </AspectRatio>

        <VStack
          w="full"
          gap={0}
          marginX={{ base: "sm", sm: "xs" }}
          overflow="hidden"
        >
          <HStack aria-label={title}>
            <Heading
              variant="h5"
              fontSize="xl"
              cursor="pointer"
              isTruncated
              onClick={() => {
                setClickedClipUrl?.(clip)
                event("click", {
                  label: "click_clip_title",
                  clip_title: clip.title,
                  ranking_period: tab,
                  link_url: clip.url,
                })
              }}
            >
              {title}
            </Heading>

            <Spacer />

            <IconButton
              as={Link}
              icon={<SquareArrowOutUpRight />}
              variant="primary"
              href={clip.url ?? ""}
              target="_blank"
              style={{
                textDecoration: "none",
              }}
              onClick={() => {
                event("click", {
                  label: "click_twitch_clip_link",
                  clip_title: clip.title,
                  ranking_period: tab,
                  link_url: clip.url,
                })
              }}
            />
          </HStack>

          <HStack
            as={Link}
            aria-label={broadcaster_name}
            href={`/streamer/${broadcaster_id}`}
            prefetch={false}
          >
            <Avatar
              name={broadcaster_name}
              src={profile_image_url}
              size={{ base: "md", sm: "sm" }}
            />
            <Text>{broadcaster_name}</Text>
          </HStack>

          <Text
            textAlign="start"
            aria-describedby="Clip creator name"
            display={{ base: "flex", sm: "none" }}
          >
            created_by : {creator_name}
          </Text>

          <Text
            textAlign="start"
            aria-describedby="Clip created date"
            display={{ base: "flex", sm: "none" }}
          >
            created_at : {created_at}
          </Text>

          <Text
            textAlign="end"
            color={["blackAlpha.600", "whiteAlpha.600"]}
            aria-describedby="Clip view count"
          >
            {view_count}
          </Text>
        </VStack>
      </HStack>
    </Container>
  )
}

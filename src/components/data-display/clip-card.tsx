/* eslint-disable @next/next/no-img-element */
import { event } from "@/components/googleAnalytics/gtag"
import { Clip } from "@/models/clip"
import { formatDate } from "@/utils/string"
import { SquareArrowOutUpRight } from "@yamada-ui/lucide"
import {
  AspectRatio,
  Avatar,
  Container,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"

type ClipCardProps = {
  clip: Clip
  setClickedClipUrl?: (clip: Clip) => void
  tab: string
}

export function ClipCard({ clip, setClickedClipUrl, tab }: ClipCardProps) {
  const {
    broadcaster_id,
    broadcaster_name,
    created_at: _created_at = "",
    creator_name,
    profile_image_url,
    thumbnail_url,
    title,
    view_count: _view_count,
  } = clip

  const created_at = formatDate(_created_at)
  const view_count = _view_count?.toLocaleString() + " views"

  return (
    <Container apply="layoutStyles.borderCard" p={0}>
      <HStack gap={0}>
        <AspectRatio minW={{ base: "sm", sm: "48" }} ratio={16 / 9}>
          <img alt={title} loading="lazy" src={thumbnail_url} />
        </AspectRatio>

        <VStack
          gap={0}
          marginX={{ base: "sm", sm: "xs" }}
          overflow="hidden"
          w="full"
        >
          <HStack aria-label={title}>
            {/* TODO: ボタンでは？ */}
            <Heading
              cursor="pointer"
              fontSize="xl"
              isTruncated
              onClick={() => {
                setClickedClipUrl?.(clip)
                event("click", {
                  clip_title: clip.title,
                  label: "click_clip_title",
                  link_url: clip.url,
                  ranking_period: tab,
                })
              }}
              variant="h5"
            >
              {title}
            </Heading>

            <Spacer />

            <IconButton
              as={Link}
              href={clip.url ?? ""}
              icon={<SquareArrowOutUpRight />}
              onClick={() => {
                event("click", {
                  clip_title: clip.title,
                  label: "click_twitch_clip_link",
                  link_url: clip.url,
                  ranking_period: tab,
                })
              }}
              style={{
                textDecoration: "none",
              }}
              target="_blank"
              variant="primary"
            />
          </HStack>

          <HStack
            aria-label={broadcaster_name}
            as={Link}
            href={`/streamer/${broadcaster_id}`}
            prefetch={false}
          >
            <Avatar
              name={broadcaster_name}
              size={{ base: "md", sm: "sm" }}
              src={profile_image_url}
            />

            <Text>{broadcaster_name}</Text>
          </HStack>

          <Text
            aria-describedby="Clip creator name"
            display={{ base: "flex", sm: "none" }}
            textAlign="start"
          >
            created_by : {creator_name}
          </Text>

          <Text
            aria-describedby="Clip created date"
            display={{ base: "flex", sm: "none" }}
            textAlign="start"
          >
            created_at : {created_at}
          </Text>

          <Text
            aria-describedby="Clip view count"
            color={["blackAlpha.600", "whiteAlpha.600"]}
            textAlign="end"
          >
            {`${view_count} views`}
          </Text>
        </VStack>
      </HStack>
    </Container>
  )
}

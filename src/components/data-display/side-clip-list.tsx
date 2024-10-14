import { event } from "@/components/googleAnalytics"
import { Clip } from "@/models/clip"
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"

type ClipCardProps = {
  clip: Clip
  setClickedClipUrl: (clip: Clip) => void
  tab: string
}

function ClipCard({ clip, setClickedClipUrl, tab }: ClipCardProps) {
  const {
    broadcaster_id,
    broadcaster_name,
    profile_image_url = "",
    thumbnail_url = "",
    title,
    url,
    view_count,
  } = clip

  return (
    <Box>
      <Tooltip closeDelay={500} label={title} openDelay={500}>
        <VStack gap="1" w="full">
          <Container
            apply="layoutStyles.borderCard"
            onClick={() => {
              setClickedClipUrl(clip)
              event("click", {
                clip_title: title,
                label: "click_clip_title",
                link_url: url,
                ranking_period: tab,
              })
            }}
            p={0}
          >
            <AspectRatio
              alt={title}
              as="img"
              loading="lazy"
              minW={{ base: "sm", sm: "48" }}
              ratio={16 / 9}
              src={thumbnail_url}
            />
          </Container>

          <HStack>
            <Avatar
              alt="top"
              as={Link}
              href={`/streamer/${broadcaster_id}`}
              prefetch={false}
              src={profile_image_url}
            />

            <VStack w="full">
              <Button
                onClick={() => {
                  setClickedClipUrl(clip)
                  event("click", {
                    clip_title: title,
                    label: "click_clip_title",
                    link_url: url,
                    ranking_period: tab,
                  })
                }}
              >
                {title}
              </Button>

              <HStack>
                <Text
                  aria-label={broadcaster_name}
                  as={Link}
                  href={`/streamer/${broadcaster_id}`}
                  prefetch={false}
                >
                  {broadcaster_name}
                </Text>

                <Spacer />

                <Text
                  aria-describedby="Clip view count"
                  color={["blackAlpha.600", "whiteAlpha.600"]}
                  textAlign="end"
                >
                  {`${view_count} views`}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Tooltip>
    </Box>
  )
}

type SideClipCardProps = {
  clip: Clip
  setClickedClipUrl?: (clip: Clip) => void
}

export function SideClipCard(props: SideClipCardProps) {}

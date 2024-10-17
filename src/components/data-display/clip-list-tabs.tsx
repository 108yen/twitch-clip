"use client"
import { InlineAD } from "@/components/adsense"
import { event } from "@/components/googleAnalytics"
import { useClip } from "@/contexts"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import { formatDate } from "@/utils/string"
import { Carousel, CarouselSlide } from "@yamada-ui/carousel"
import { SquareArrowOutUpRight } from "@yamada-ui/lucide"
import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  InfiniteScrollArea,
  isArray,
  Loading,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { useMemo, useState } from "react"

const START_INDEX = 6
const LOAD_INDEX = 2

interface ClipCardProps {
  clip: Clip
  tab: string
}

export function ClipCard({ clip, tab }: ClipCardProps) {
  const { setClipUrl } = useClip()

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
          <Image alt={title} loading="lazy" src={thumbnail_url} />
        </AspectRatio>

        <VStack
          gap={0}
          marginX={{ base: "sm", sm: "xs" }}
          overflow="hidden"
          w="full"
        >
          <HStack aria-label={title}>
            <Heading
              cursor="pointer"
              fontSize="xl"
              isTruncated
              onClick={() => {
                setClipUrl(clip)
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
            textAlign="end"
            textStyle="viewCount"
          >
            {view_count}
          </Text>
        </VStack>
      </HStack>
    </Container>
  )
}

interface ClipListProps {
  clips: Clip[]
  tab: string
}

function ClipList({ clips, tab }: ClipListProps) {
  const [count, setCount] = useState<number>(START_INDEX)

  const filteredClips = useMemo(
    () =>
      clips.slice(0, count).map((clip, index) =>
        index == 10 ? (
          <Box key={index}>
            <InlineAD display={{ base: "none", lg: "flex" }} />
            <ClipCard clip={clip} tab={tab} />
          </Box>
        ) : (
          <ClipCard clip={clip} key={index} tab={tab} />
        ),
      ),
    [clips, count, tab],
  )

  return (
    <InfiniteScrollArea
      finish={<Text>no more clips</Text>}
      gap={{ base: "md", sm: "sm" }}
      loading={<Loading fontSize="2xl" />}
      marginY="md"
      onLoad={({ finish, index }) => {
        setCount((prev) => prev + LOAD_INDEX)

        if (index * LOAD_INDEX + 6 >= 100) {
          finish()
        }
      }}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

// interface ClipListViewProps {
//   isSticky?: boolean
// }

// TODO: refactor files. Merge files.

export function ClipListTabs() {
  const { clipDoc } = useClip()
  const [index, onChange] = useState(0)

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  //TODO: sticky
  // const tabStyles = useMemo(
  //   () =>
  //     isSticky ? { position: "sticky", top: (window.innerWidth * 9) / 16 } : {},
  //   [isSticky],
  // )

  return (
    <>
      <Tabs
        align="center"
        colorScheme="secondary"
        index={index}
        onChange={(index) => onChange(index)}
      >
        <TabList>
          {/* <TabList {...tabStyles}> */}
          {tabs.map((tab) => (
            <Tab
              _selected={{
                borderColor: "currentColor",
                borderWidth: "2px",
                color: "secondary",
              }}
              fontSize="sm"
              key={tab}
              p={3}
              w="4xs"
            >
              {tab.toUpperCase()}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Carousel
        draggable={false}
        h="full"
        index={index}
        loop={false}
        withControls={false}
        withIndicators={false}
      >
        {tabs.map((tab) => {
          const clips = clipDoc?.[tab]

          if (!isArray(clips)) return

          return (
            <CarouselSlide key={tab}>
              <ClipList clips={clips} key={tab} tab={tab} />
            </CarouselSlide>
          )
        })}
      </Carousel>
    </>
  )
}

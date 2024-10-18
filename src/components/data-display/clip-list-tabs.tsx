"use client"
import { InlineAD } from "@/components/adsense"
import { event } from "@/components/googleAnalytics"
import { CLIP_LIST } from "@/constant/clip-list"
import { useClip } from "@/contexts"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import { formatDate } from "@/utils/string"
import { Carousel, CarouselSlide } from "@yamada-ui/carousel"
import { SquareArrowOutUpRight } from "@yamada-ui/lucide"
import {
  AspectRatio,
  assignRef,
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
  TabsProps,
  Text,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { MutableRefObject, useMemo, useRef, useState } from "react"

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
    url,
    view_count: _view_count,
  } = clip

  const created_at = formatDate(_created_at)
  const view_count = `${_view_count?.toLocaleString()} views`

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
          <HStack aria-label={title} overflow="hidden">
            <Heading
              cursor="pointer"
              fontSize={{ base: "xl", sm: "lg" }}
              lineClamp={1}
              onClick={() => {
                setClipUrl(clip)
                event("click", {
                  clip_title: title,
                  label: "click_clip_title",
                  link_url: url,
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
              onClick={() =>
                event("click", {
                  clip_title: title,
                  label: "click_twitch_clip_link",
                  link_url: url,
                  ranking_period: tab,
                })
              }
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
  resetRef: MutableRefObject<() => void>
  tab: string
}

function ClipList({ clips, resetRef: resetRefProp, tab }: ClipListProps) {
  const [count, setCount] = useState<number>(CLIP_LIST.START_INDEX)

  const resetRef = useRef<() => void>(() => {})

  function resetCount() {
    if (window) window.scrollTo({ top: 0 })

    resetRef.current()
    setCount(CLIP_LIST.START_INDEX)
  }

  assignRef(resetRefProp, resetCount)

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
        setCount((prev) => prev + CLIP_LIST.LOAD_INDEX)

        if (index * CLIP_LIST.LOAD_INDEX + 6 >= clips.length) {
          finish()
          event("scroll", {
            label: "load_all_clips",
          })
        }
      }}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

interface ClipListTabProps {
  tabsProps?: TabsProps
}

export function ClipListTabs({ tabsProps }: ClipListTabProps) {
  const { clipDoc } = useClip()
  const [index, onChange] = useState(0)

  const resetRef = useRef<() => void>(() => {})

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  function handleChange(value: number) {
    onChange(value)
    resetRef.current()
  }

  return (
    <>
      <Tabs
        align="center"
        colorScheme="secondary"
        index={index}
        onChange={handleChange}
        {...tabsProps}
      >
        <TabList>
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
              <ClipList clips={clips} key={tab} resetRef={resetRef} tab={tab} />
            </CarouselSlide>
          )
        })}
      </Carousel>
    </>
  )
}

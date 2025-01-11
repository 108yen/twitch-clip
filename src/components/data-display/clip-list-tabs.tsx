"use client"
import { InlineAD } from "@/components/adsense"
import { CLIP_LIST } from "@/constant/clip-list"
import { useClip } from "@/contexts"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import { sendGAEvent } from "@/utils/google-analytics"
import { formatDate, toISO8601Duration } from "@/utils/string"
import { Carousel, CarouselSlide } from "@yamada-ui/carousel"
import { SquareArrowOutUpRightIcon } from "@yamada-ui/lucide"
import {
  AspectRatio,
  assignRef,
  Box,
  Container,
  EmptyState,
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
  useBreakpoint,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { RefObject, useMemo, useRef, useState } from "react"

import { SkeletonAvatar } from "../media-and-icons"

interface ClipCardProps {
  clip: Clip
  tab: string
}

function ClipCard({ clip, tab }: ClipCardProps) {
  const { setClipUrl } = useClip()

  const {
    broadcaster_id,
    broadcaster_name,
    created_at: _created_at = "",
    creator_name,
    duration = 0,
    embed_url,
    id,
    profile_image_url,
    thumbnail_url,
    title,
    url,
    view_count: _view_count,
  } = clip

  const created_at = formatDate(_created_at)
  const view_count = `${_view_count?.toLocaleString()} views`

  return (
    <Container
      cursor="pointer"
      itemId={id}
      itemScope
      itemType="https://schema.org/VideoObject"
      layerStyle="borderCard"
      onClick={() => {
        setClipUrl(clip)
        sendGAEvent("event", "click", {
          clip_title: title,
          label: "click_clip_title",
          ranking_period: tab,
        })
      }}
      p={0}
    >
      <HStack gap={0} overflow="hidden">
        <AspectRatio minW={{ base: "sm", sm: "48" }} ratio={16 / 9}>
          <Image
            alt={title}
            itemProp="thumbnail"
            loading="lazy"
            src={thumbnail_url}
          />
        </AspectRatio>

        <VStack
          gap={0}
          marginX={{ base: "sm", sm: "xs" }}
          overflow="hidden"
          w="full"
        >
          <HStack aria-label={title} gap={0}>
            <Heading
              fontSize={{ base: "xl", sm: "lg" }}
              itemProp="name"
              lineClamp={1}
              overflowWrap="anywhere"
              variant="h5"
            >
              {title}
            </Heading>

            <Spacer />

            <IconButton
              as={Link}
              href={url ?? ""}
              icon={<SquareArrowOutUpRightIcon />}
              itemProp="url"
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
            gap="sm"
            href={`/streamer/${broadcaster_id}`}
            itemProp="actor"
            itemScope
            itemType="https://schema.org/Person"
            onClick={(ev: MouseEvent) => {
              ev.stopPropagation()
            }}
            w="fit-content"
          >
            <SkeletonAvatar
              alt={broadcaster_name}
              itemProp="image"
              size={{ base: "base", sm: "sm" }}
              src={profile_image_url}
            />

            <Text itemProp="name" lineClamp={1} overflowWrap="anywhere">
              {broadcaster_name}
            </Text>
          </HStack>

          <Text
            aria-label="Clip creator name"
            display={{ base: "flex", sm: "none" }}
            textAlign="start"
          >
            created_by : {creator_name}
          </Text>

          <Text
            aria-label="Clip created date"
            display={{ base: "flex", sm: "none" }}
            textAlign="start"
          >
            <meta content={_created_at} itemProp="uploadDate" />
            created_at : {created_at}
          </Text>

          <Text
            aria-label="Clip view count"
            itemProp="interactionStatistic"
            itemScope
            itemType="https://schema.org/InteractionCounter"
            textAlign="end"
            textStyle="viewCount"
          >
            <meta
              content="https://schema.org/WatchAction"
              itemProp="interactionType"
            />
            <meta
              content={_view_count?.toString()}
              itemProp="userInteractionCount"
            />

            {view_count}
          </Text>
        </VStack>
      </HStack>

      <meta content={thumbnail_url} itemProp="thumbnailUrl" />
      <meta content={embed_url} itemProp="embedUrl" />
      <meta content={toISO8601Duration(duration)} itemProp="duration" />
    </Container>
  )
}

interface ClipListProps {
  clips: Clip[]
  index: number
  resetRef: RefObject<() => void>
  tab: string
}

function ClipList({
  clips,
  index: tabIndex,
  resetRef: resetRefProp,
  tab,
}: ClipListProps) {
  const [count, setCount] = useState<number>(CLIP_LIST.START_INDEX)
  const breakpoint = useBreakpoint()
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
        ((index == 4 && tabIndex == 0) ||
          (index == CLIP_LIST.START_INDEX && tabIndex != 0)) &&
        breakpoint == "sm" ? (
          <Box key={index}>
            <InlineAD />
            <ClipCard clip={clip} tab={tab} />
          </Box>
        ) : (
          <ClipCard clip={clip} key={index} tab={tab} />
        ),
      ),
    [breakpoint, clips, count, tab, tabIndex],
  )

  return (
    <InfiniteScrollArea
      finish={<EmptyState title="No more clips" />}
      gap={{ base: "md", sm: "sm" }}
      loading={<Loading fontSize="2xl" />}
      marginY="md"
      onLoad={({ finish, index }) => {
        setCount((prev) => prev + CLIP_LIST.LOAD_INDEX)

        if (index * CLIP_LIST.LOAD_INDEX + 6 >= clips.length) {
          finish()
          sendGAEvent("event", "scroll", {
            label: "load_all_clips",
          })
        }
      }}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

interface ClipListTabProps extends TabsProps {}

export function ClipListTabs(props: ClipListTabProps) {
  const { clipDoc } = useClip()
  const [index, onChange] = useState(0)

  const resetRef = useRef<() => void>(() => {})

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  function handleChange(value: number) {
    onChange(value)
    resetRef.current()
  }

  if (tabs.length == 0) return <Text textAlign="center">no clips</Text>

  return (
    <>
      {tabs.length > 1 ? (
        <Tabs
          align="center"
          defaultIndex={0}
          index={index}
          onChange={handleChange}
          {...props}
        >
          <TabList>
            {tabs.map((tab) => (
              <Tab
                _selected={{
                  borderColor: "currentColor",
                  borderWidth: "2px",
                  color: "primary.500",
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
      ) : null}

      <Carousel
        draggable={false}
        h="full"
        index={index}
        loop={false}
        withControls={false}
        withIndicators={false}
      >
        {tabs.map((tab, index) => {
          const clips = clipDoc?.[tab]

          if (!isArray(clips)) return

          return (
            <CarouselSlide key={tab}>
              <ClipList
                clips={clips}
                index={index}
                key={tab}
                resetRef={resetRef}
                tab={tab}
              />
            </CarouselSlide>
          )
        })}
      </Carousel>
    </>
  )
}

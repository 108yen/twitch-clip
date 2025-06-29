"use client"
import { ArrowLeftIcon, GhostIcon } from "@yamada-ui/lucide"
import {
  AspectRatio,
  assignRef,
  Box,
  Button,
  Container,
  EmptyState,
  HStack,
  InfiniteScrollArea,
  Loading,
  NativeImage,
  noop,
  ScrollArea,
  Select,
  SelectItem,
  Separator,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { RefObject, useMemo, useRef, useState } from "react"
import { CONSTANT } from "@/constant"
import { CLIP_LIST } from "@/constant/clip-list"
import { useClip } from "@/contexts"
import { useSubscribeEvent } from "@/hooks"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import { sendGAEvent } from "@/utils/google-analytics"
import { formatDate } from "@/utils/string"
import { SideCardAD } from "../adsense"
import { SkeletonAvatar } from "../media-and-icons"

interface ClipCardProps {
  clip: Clip
  tab: string
}

function ClipCard({ clip, tab }: ClipCardProps) {
  const { setClipUrl, showDate } = useClip()

  const {
    broadcaster_id,
    broadcaster_name,
    created_at = "",
    profile_image_url = "",
    thumbnail_url = "",
    title,
    view_count,
  } = clip

  const subText = showDate
    ? formatDate(created_at, true)
    : `${view_count?.toLocaleString()} views`

  function onClick() {
    setClipUrl(clip)
    sendGAEvent("event", "click", {
      clip_title: title,
      label: "click_clip_title",
      ranking_period: tab,
    })
  }

  return (
    <VStack gap="1" w="full">
      <Container
        cursor="pointer"
        layerStyle="borderCard"
        onClick={onClick}
        p={0}
      >
        <AspectRatio ratio={16 / 9} w="full">
          <NativeImage alt={title} loading="lazy" src={thumbnail_url} />
        </AspectRatio>
      </Container>

      <HStack>
        <SkeletonAvatar
          alt={broadcaster_name}
          as={Link}
          href={`/streamer/${broadcaster_id}`}
          icon={<GhostIcon />}
          size="base"
          src={profile_image_url}
        />

        <VStack gap={0} overflow="hidden" w="full">
          <Text
            cursor="pointer"
            fontWeight="bold"
            isTruncated
            onClick={onClick}
          >
            {title}
          </Text>

          <HStack>
            <Text
              aria-label={broadcaster_name}
              as={Link}
              href={`/streamer/${broadcaster_id}`}
              isTruncated
            >
              {broadcaster_name}
            </Text>

            <Spacer />

            <Text
              aria-label={showDate ? "Created at" : "Clip view count"}
              isTruncated
              textAlign="end"
              textStyle="viewCount"
            >
              {subText}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

type ClipListProps = {
  clips: Clip[]
  resetRef: RefObject<() => void>
  tab: string
}

function ClipList({ clips, resetRef: resetRefProp, tab }: ClipListProps) {
  const [count, setCount] = useState<number>(CLIP_LIST.START_INDEX)
  const rootRef = useRef<HTMLDivElement>(undefined!)
  const resetRef = useRef<() => void>(noop)

  const height = useSubscribeEvent<number>(
    "resize",
    () => window.innerHeight - CONSTANT.MAGIC_NUMBER.OVER_HEIGHT,
    () => 0,
  )

  function resetCount() {
    setCount(CLIP_LIST.START_INDEX)
    resetRef.current()
  }

  assignRef(resetRefProp, resetCount)

  const filteredClips = useMemo(
    () =>
      clips.slice(0, count).map((clip, index) =>
        index == 2 || (index != 0 && index % 20 == 0) ? (
          <Box key={index}>
            <SideCardAD />
            <ClipCard clip={clip} tab={tab} />
          </Box>
        ) : (
          <ClipCard clip={clip} key={index} tab={tab} />
        ),
      ),
    [clips, count, tab],
  )

  return (
    <ScrollArea h={height} ref={rootRef}>
      <InfiniteScrollArea
        finish={<EmptyState title="No more clips" />}
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
        resetRef={resetRef}
        rootRef={rootRef}
      >
        {filteredClips}
      </InfiniteScrollArea>
    </ScrollArea>
  )
}

export function SideClipTabs() {
  const { clipDoc, setClipUrl } = useClip()

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  const [tab, onChange] = useState<string>(tabs[0])
  const resetRef = useRef<() => void>(() => {})

  const items: SelectItem[] = useMemo(
    () => tabs.map((tab) => ({ label: tab, value: tab })),
    [tabs],
  )

  const clips = clipDoc?.[tab] as Clip[]

  function handleChange(value: string) {
    onChange(value)
    resetRef.current()
  }

  function handleClick() {
    setClipUrl(undefined)
    sendGAEvent("event", "click", {
      label: "click_return_to_list_view",
    })
  }

  return (
    <VStack gap={0} separator={<Separator />}>
      <HStack alignItems="flex-end" minH="6xs">
        <Tooltip label="リスト表示にもどる" placement="top">
          <Button
            onClick={handleClick}
            startIcon={<ArrowLeftIcon />}
            variant="link"
          >
            clips
          </Button>
        </Tooltip>

        <Spacer />

        {items.length > 1 ? (
          <Select
            focusBorderColor="primary.500"
            items={items}
            marginBottom="xs"
            maxW="4xs"
            onChange={handleChange}
            value={tab}
          />
        ) : null}
      </HStack>

      <ClipList clips={clips} resetRef={resetRef} tab={tab} />
    </VStack>
  )
}

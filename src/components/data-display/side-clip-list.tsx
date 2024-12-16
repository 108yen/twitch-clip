"use client"
import { SideCardAD } from "@/components/adsense"
import { CLIP_LIST } from "@/constant/clip-list"
import { useClip } from "@/contexts"
import { Clip } from "@/models/clip"
import { getTabs } from "@/utils/clip"
import { formatDate } from "@/utils/string"
import { sendGAEvent } from "@next/third-parties/google"
import { AlignJustifyIcon, GhostIcon } from "@yamada-ui/lucide"
import {
  AspectRatio,
  assignRef,
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  createdDom,
  HStack,
  InfiniteScrollArea,
  Loading,
  NativeImage,
  noop,
  Select,
  SelectItem,
  Separator,
  Spacer,
  Text,
  Tooltip,
  useWindowEvent,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { RefObject, useMemo, useRef, useState } from "react"

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
        apply="layoutStyles.borderCard"
        cursor="pointer"
        onClick={onClick}
        p={0}
      >
        <AspectRatio ratio={16 / 9} w="full">
          <NativeImage alt={title} loading="lazy" src={thumbnail_url} />
        </AspectRatio>
      </Container>

      <HStack>
        <Avatar
          alt={broadcaster_name}
          as={Link}
          href={`/streamer/${broadcaster_id}`}
          icon={<GhostIcon />}
          size="base"
          src={profile_image_url}
        />

        <VStack gap={0} overflow="hidden" w="full">
          <Text fontWeight="bold" isTruncated onClick={onClick}>
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

  let height = createdDom() ? window.innerHeight - 113 : 0

  useWindowEvent("resize", () => {
    height = window.innerHeight - 113
  })

  function resetCount() {
    resetRef.current()
    setCount(CLIP_LIST.START_INDEX)
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
    <Container apply="layoutStyles.scrollArea" maxH={height} ref={rootRef}>
      <InfiniteScrollArea
        finish={<Text>no more clips</Text>}
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
    </Container>
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

  //NOTE: declare as `any` type because `error TS2590: Expression produces a union type that is too complex to represent.` occurred.
  const tooltipProps: any = {
    label: "リスト表示にもどる",
    placement: "top",
  }

  const buttonProps: ButtonProps = {
    onClick: () => {
      setClipUrl(undefined)
      sendGAEvent("event", "click", {
        label: "click_return_to_list_view",
      })
    },
    startIcon: <AlignJustifyIcon />,
    variant: "link",
  }

  return (
    <VStack gap={0} separator={<Separator />}>
      <HStack alignItems="flex-end" minH="6xs">
        <Tooltip {...tooltipProps}>
          <Button {...buttonProps}>clips</Button>
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

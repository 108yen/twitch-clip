"use client"

import { CONSTANT } from "@/constant"
import { useClip } from "@/contexts"
import { Clip } from "@/models/clip"
import { sendGAEvent } from "@/utils/google-analytics"
import { formatDate } from "@/utils/string"
import {
  GhostIcon,
  SearchIcon,
  SquareArrowOutUpRightIcon,
} from "@yamada-ui/lucide"
import {
  AspectRatio,
  Center,
  Container,
  EmptyState,
  For,
  GridItem,
  HStack,
  IconButton,
  Loading,
  NativeImage,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  useInfiniteScroll,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { SkeletonAvatar } from "../media-and-icons"

interface ClipCardProps {
  clip: Clip
}

function ClipCard({ clip }: ClipCardProps) {
  const { setClipUrl } = useClip()

  const {
    broadcaster_id,
    broadcaster_name,
    created_at: _created_at = "",
    profile_image_url,
    thumbnail_url,
    title,
    url,
  } = clip

  const created_at = formatDate(_created_at, true)

  function onClick() {
    setClipUrl(clip)
    sendGAEvent("event", "click", {
      clip_title: title,
      label: "click_clip_title",
      ranking_period: "favorite",
    })
  }

  return (
    <VStack gap="1">
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
          <HStack gap={0}>
            <Tooltip label={title} placement="top-start">
              <Text
                cursor="pointer"
                fontWeight="bold"
                isTruncated
                onClick={onClick}
              >
                {title}
              </Text>
            </Tooltip>

            <Spacer />

            <IconButton
              aria-label="Link to twitch clip."
              as={Link}
              href={url ?? ""}
              icon={<SquareArrowOutUpRightIcon />}
              size="xs"
              style={{
                textDecoration: "none",
              }}
              target="_blank"
              variant="primary"
            />
          </HStack>

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
              aria-label="Clip created date"
              isTruncated
              textAlign="end"
              textStyle="date"
            >
              {created_at}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

interface ClipGridProps {
  clips: Clip[]
}

export function ClipGrid({ clips }: ClipGridProps) {
  const [count, setCount] = useState(CONSTANT.CLIP_GRID.START_INDEX)
  const resetRef = useRef<() => void>(() => {})

  const filteredClips = useMemo(() => clips.slice(0, count), [count, clips])

  const { finish, ref } = useInfiniteScroll({
    onLoad: ({ finish }) => {
      if (count + CONSTANT.CLIP_GRID.LOAD_INDEX >= clips.length) finish()

      setCount((prev) => prev + CONSTANT.CLIP_GRID.LOAD_INDEX)
    },
    resetRef,
  })

  useEffect(() => resetRef.current(), [clips])

  if (filteredClips.length == 0) {
    return (
      <EmptyState
        description="No clips were found in the search"
        indicator={<SearchIcon />}
        size="lg"
        title="No clips"
      />
    )
  }

  return (
    <VStack>
      <SimpleGrid columns={{ base: 4, lg: 3, md: 2, sm: 1 }} gap="md" w="full">
        <For each={filteredClips}>
          {(clip, index) => (
            <GridItem key={index}>
              <ClipCard clip={clip} />
            </GridItem>
          )}
        </For>
      </SimpleGrid>

      {!finish ? (
        <Center ref={ref} w="full">
          <Loading fontSize="2xl" />
        </Center>
      ) : (
        <EmptyState title="No more clips" />
      )}
    </VStack>
  )
}

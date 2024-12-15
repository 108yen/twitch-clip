"use client"

import { usePage } from "@/contexts"
import { Clip } from "@/models/clip"
import { formatDate } from "@/utils/string"
import { GhostIcon, PaperclipIcon } from "@yamada-ui/lucide"
import {
  AspectRatio,
  Avatar,
  Center,
  Container,
  EmptyState,
  For,
  GridItem,
  HStack,
  Loading,
  NativeImage,
  SimpleGrid,
  Spacer,
  Text,
  TextProps,
  Tooltip,
  VStack,
} from "@yamada-ui/react"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"

interface ClipCardProps {
  clip: Clip
}

function ClipCard({ clip }: ClipCardProps) {
  const {
    broadcaster_id,
    broadcaster_name,
    created_at: _created_at = "",
    profile_image_url,
    thumbnail_url,
    title,
  } = clip

  const created_at = formatDate(_created_at, true)

  //NOTE: declare as `any` type because `error TS2590: Expression produces a union type that is too complex to represent.` occurred.
  const tooltipProps: any = {
    label: title,
    placement: "top-start",
  }

  const textProps: TextProps = {
    fontWeight: "bold",
    isTruncated: true,
    // onClick,
  }

  return (
    <VStack gap="1">
      <Container
        apply="layoutStyles.borderCard"
        cursor="pointer"
        // onClick={onClick}
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
          <Tooltip {...tooltipProps}>
            <Text {...textProps}>{title}</Text>
          </Tooltip>

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

export function ClipGrid() {
  const { getAllClips } = usePage()
  const [isPending, startTransition] = useTransition()
  const [clips, setClips] = useState<Clip[]>([])

  useEffect(
    () =>
      startTransition(async () => {
        const clips = await getAllClips()

        setClips(clips)
      }),
    [getAllClips],
  )

  if (isPending) {
    return (
      <Center h="3xs" w="full">
        <Loading fontSize="2xl" />
      </Center>
    )
  }

  if (clips.length == 0) {
    return (
      <EmptyState
        description="Add clips to your favorites"
        indicator={<PaperclipIcon />}
        title="Your have no favorite clip"
      />
    )
  }

  return (
    <SimpleGrid columns={{ base: 4, lg: 3, md: 2, sm: 1 }} gap="md" w="full">
      <For each={clips}>
        {(clip, index) => (
          <GridItem key={index}>
            <ClipCard clip={clip} />
          </GridItem>
        )}
      </For>
    </SimpleGrid>
  )
}

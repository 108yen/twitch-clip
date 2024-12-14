"use client"

import { usePage } from "@/contexts"
import { Clip } from "@/models/clip"
import { GhostIcon } from "@yamada-ui/lucide"
import {
  AspectRatio,
  Avatar,
  Center,
  Container,
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
    profile_image_url,
    thumbnail_url,
    title,
    view_count,
  } = clip
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
    <VStack gap="1" w="full">
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
              aria-label="Clip view count"
              isTruncated
              textAlign="end"
              textStyle="viewCount"
            >
              {`${view_count} views`}
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

  return (
    <SimpleGrid gap="md" minChildWidth={{ base: "3xs", lg: 100 }} w="full">
      <For each={clips}>
        {(clip, index) => (
          <GridItem h="4xs" key={index} w="full">
            <ClipCard clip={clip} />
          </GridItem>
        )}
      </For>
    </SimpleGrid>
  )
}

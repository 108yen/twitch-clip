"use client"
import { Clip } from "@/models/clip"
import { StarIcon } from "@yamada-ui/lucide"
import {
  Center,
  EmptyState,
  isUndefined,
  Loading,
  useBreakpoint,
  VStack,
} from "@yamada-ui/react"
import { useDeferredValue, useMemo, useState } from "react"

import { ClipListTabs, ClipTable } from "../data-display"
import { SearchClips } from "../form"

interface FavoriteBodyProps {
  clips: Clip[] | undefined
  isPending: boolean
}

export function FavoriteBody({ clips, isPending }: FavoriteBodyProps) {
  const [text, setText] = useState("")
  const deferredText = useDeferredValue(text)
  const breakpoint = useBreakpoint()

  const filteredClips = useMemo(
    () =>
      clips?.filter(
        ({ broadcaster_login, broadcaster_name, title }) =>
          broadcaster_name?.includes(deferredText) ||
          broadcaster_login?.includes(deferredText) ||
          title?.includes(deferredText),
      ) ?? [],
    [clips, deferredText],
  )

  if (isPending || isUndefined(clips)) {
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
        indicator={<StarIcon />}
        size="lg"
        title="Your have no favorite clip"
      />
    )
  }

  if (breakpoint == "sm") {
    return <ClipListTabs />
  }

  return (
    <VStack gap="md">
      <SearchClips num={filteredClips.length} onChange={setText} />
      {/* <ClipGrid clips={filteredClips} /> */}
      <ClipTable clips={filteredClips} />
    </VStack>
  )
}

"use client"
import { Clip } from "@/models/clip"
import { PaperclipIcon } from "@yamada-ui/lucide"
import {
  Center,
  EmptyState,
  isUndefined,
  Loading,
  VStack,
} from "@yamada-ui/react"
import { useDeferredValue, useMemo, useState } from "react"

import { ClipGrid, ClipListTabs } from "../data-display"
import { SearchClips } from "../form"

interface FavoriteBodyProps {
  clips: Clip[] | undefined
  isPending: boolean
  width: number
}

export function FavoriteBody({ clips, isPending, width }: FavoriteBodyProps) {
  const [text, setText] = useState("")
  const deferredText = useDeferredValue(text)

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
        indicator={<PaperclipIcon />}
        size="lg"
        title="Your have no favorite clip"
      />
    )
  }

  if (width < 600) {
    return <ClipListTabs />
  }

  return (
    <VStack gap="md">
      <SearchClips num={filteredClips.length} onChange={setText} />
      <ClipGrid clips={filteredClips} />
    </VStack>
  )
}

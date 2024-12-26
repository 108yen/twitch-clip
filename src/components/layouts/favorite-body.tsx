"use client"
import { Clip } from "@/models/clip"
import {
  assignRef,
  Center,
  isUndefined,
  Loading,
  useBreakpoint,
  VStack,
} from "@yamada-ui/react"
import { RefObject, useDeferredValue, useMemo, useState } from "react"

import { ClipGrid, ClipListTabs, ClipTable } from "../data-display"
import { SearchClips } from "../form"

interface FavoriteBodyProps {
  clips: Clip[] | undefined
  isPending: boolean
  layoutRef: RefObject<(value: string) => void>
}

export function FavoriteBody({
  clips,
  isPending,
  layoutRef,
}: FavoriteBodyProps) {
  const [text, setText] = useState("")
  const [layout, setLayout] = useState("grid")
  const deferredText = useDeferredValue(text)
  const breakpoint = useBreakpoint()

  assignRef(layoutRef, setLayout)

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

  if (breakpoint == "sm") {
    return <ClipListTabs />
  }

  return (
    <VStack gap="md">
      <SearchClips num={filteredClips.length} onChange={setText} />

      {layout == "grid" ? (
        <ClipGrid clips={filteredClips} />
      ) : (
        <ClipTable clips={filteredClips} />
      )}
    </VStack>
  )
}

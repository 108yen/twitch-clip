"use client"

import { ClipGrid, ClipListTabs } from "@/components/data-display"
import { FavoriteHeader, MobileView, PCView } from "@/components/layouts"
import { ClipProvider, usePage } from "@/contexts"
import { AppLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { PaperclipIcon } from "@yamada-ui/lucide"
import {
  Center,
  createdDom,
  EmptyState,
  isUndefined,
  Loading,
  useWindowEvent,
} from "@yamada-ui/react"
import { useEffect, useState, useTransition } from "react"

interface FavoriteBodyProps {
  clips: Clip[] | undefined
  isPending: boolean
  width: number
}

function FavoriteBody({ clips, isPending, width }: FavoriteBodyProps) {
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
        title="Your have no favorite clip"
      />
    )
  }

  if (width < 600) {
    return <ClipListTabs />
  }

  return <ClipGrid />
}

export function FavoritePage() {
  const [currentClip, setCurrentClip] = useState<Clip>()
  const { getAllClips } = usePage()
  const [isPending, startTransition] = useTransition()
  const [clips, setClips] = useState<Clip[]>()
  const clipDoc = new ClipDoc({ favorite: clips })

  let width = createdDom() ? window.innerWidth : 0

  useWindowEvent("resize", () => {
    width = window.innerWidth
  })

  useEffect(
    () =>
      startTransition(async () => {
        const clips = await getAllClips()

        setClips(clips)
      }),
    [getAllClips],
  )

  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }

  return (
    <ClipProvider
      clipDoc={clipDoc}
      currentClip={currentClip}
      setClipUrl={handleSetClip}
      showDate
    >
      {currentClip === undefined ? (
        <AppLayout>
          <FavoriteHeader />

          <FavoriteBody clips={clips} isPending={isPending} width={width} />
        </AppLayout>
      ) : width < 600 ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

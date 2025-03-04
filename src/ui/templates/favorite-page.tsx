"use client"

import { ClipProvider, usePage } from "@/contexts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import {
  FavoriteBody,
  FavoriteHeader,
  MobileView,
  PCView,
} from "@/ui/components/layouts"
import { AppLayout } from "@/ui/layouts"
import { StarIcon } from "@yamada-ui/lucide"
import { EmptyState, isUndefined, useBreakpoint } from "@yamada-ui/react"
import { useEffect, useRef, useState, useTransition } from "react"

export function FavoritePage() {
  const [currentClip, setCurrentClip] = useState<Clip>()
  const [clips, setClips] = useState<Clip[]>()
  const [isPending, startTransition] = useTransition()
  const changeLayoutRef = useRef<(value: string) => void>(() => {})
  const breakpoint = useBreakpoint()
  const { getAllClips } = usePage()

  const clipDoc: ClipDoc = { favorite: clips }

  const hasCurrentClip = !isUndefined(currentClip)

  useEffect(
    () =>
      startTransition(async () => {
        const clips = await getAllClips()

        setClips(clips)
      }),
    [getAllClips, hasCurrentClip],
  )

  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }

  function handleChangeLayout(value: string) {
    changeLayoutRef.current(value)
  }

  return (
    <ClipProvider
      clipDoc={clipDoc}
      currentClip={currentClip}
      setClipUrl={handleSetClip}
      showDate
    >
      {!clips?.length ? (
        <EmptyState
          description="Please add clips to your favorites"
          indicator={<StarIcon />}
          size="lg"
          title="Your have no favorite clip"
        />
      ) : currentClip === undefined ? (
        <AppLayout>
          <FavoriteHeader handleChangeLayout={handleChangeLayout} />

          <FavoriteBody
            clips={clips}
            isPending={isPending}
            layoutRef={changeLayoutRef}
          />
        </AppLayout>
      ) : breakpoint == "sm" ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

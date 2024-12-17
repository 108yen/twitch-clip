"use client"

import {
  FavoriteBody,
  FavoriteHeader,
  MobileView,
  PCView,
} from "@/components/layouts"
import { ClipProvider, usePage } from "@/contexts"
import { AppLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { createdDom, useWindowEvent } from "@yamada-ui/react"
import { useEffect, useState, useTransition } from "react"

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

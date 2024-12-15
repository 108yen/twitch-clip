"use client"

import { ClipGrid } from "@/components/data-display"
import { FavoriteHeader, PCView } from "@/components/layouts"
import { ClipProvider, usePage } from "@/contexts"
import { AppLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { PaperclipIcon } from "@yamada-ui/lucide"
import { Center, EmptyState, Loading } from "@yamada-ui/react"
import { useEffect, useState, useTransition } from "react"

export function FavoritePage() {
  const [currentClip, setCurrentClip] = useState<Clip>()
  const { getAllClips } = usePage()
  const [isPending, startTransition] = useTransition()
  const [clips, setClips] = useState<Clip[]>([])
  const clipDoc = new ClipDoc({ favorite: clips })

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
    >
      {currentClip === undefined ? (
        <AppLayout>
          <FavoriteHeader />

          {isPending ? (
            <Center h="3xs" w="full">
              <Loading fontSize="2xl" />
            </Center>
          ) : clips.length == 0 ? (
            <EmptyState
              description="Add clips to your favorites"
              indicator={<PaperclipIcon />}
              title="Your have no favorite clip"
            />
          ) : (
            <ClipGrid clips={clips} />
          )}
        </AppLayout>
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

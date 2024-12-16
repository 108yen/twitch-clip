"use client"
import { ClipListTabs } from "@/components/data-display"
import { MobileView, PCView } from "@/components/layouts"
import { ClipProvider } from "@/contexts"
import { AppLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { createdDom, useWindowEvent } from "@yamada-ui/react"
import { useState } from "react"

export function ClipPage(props: { clipDoc: ClipDoc }) {
  const { clipDoc } = props

  const [currentClip, setCurrentClip] = useState<Clip>()

  let width = createdDom() ? window.innerWidth : 0

  useWindowEvent("resize", () => {
    width = window.innerWidth
  })

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
          <ClipListTabs />
        </AppLayout>
      ) : width < 600 ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

"use client"
import { ClipListTabs } from "@/components/data-display"
import { MobileView, PCView } from "@/components/layouts"
import { ClipProvider } from "@/contexts"
import { ClipListLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { useWindowEvent } from "@yamada-ui/react"
import { useState } from "react"

export function ClipPage(props: { clipDoc: ClipDoc }) {
  const { clipDoc } = props

  const [width, setWidth] = useState(window.innerWidth)
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()

  useWindowEvent("resize", () => setWidth(window.innerWidth))

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
        <ClipListLayout>
          <ClipListTabs />
        </ClipListLayout>
      ) : width < 600 ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

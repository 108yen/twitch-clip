"use client"
import { ClipListTabs } from "@/components/data-display"
import { MobileView, PCView } from "@/components/layouts"
import { ClipProvider } from "@/contexts"
import { AppLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { useBreakpoint } from "@yamada-ui/react"
import { useState } from "react"

interface ClipPageProps {
  clipDoc: ClipDoc
}

export function ClipPage({ clipDoc }: ClipPageProps) {
  const [currentClip, setCurrentClip] = useState<Clip>()
  const breakpoint = useBreakpoint()

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
      ) : breakpoint == "sm" ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

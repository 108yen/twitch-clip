"use client"
import { ClipListTabs } from "@/components/data-display"
import { MobileView, PCView } from "@/components/layouts"
import { InstallNotification } from "@/components/navigation"
import { ClipProvider } from "@/contexts"
import { AppLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { doEveryThreeMonth } from "@/storage"
import { getDisplayMode } from "@/utils/mode"
import { useBreakpoint, useNotice, useOS } from "@yamada-ui/react"
import { useEffect, useState } from "react"

interface ClipPageProps {
  clipDoc: ClipDoc
}

export function ClipPage({ clipDoc }: ClipPageProps) {
  const [currentClip, setCurrentClip] = useState<Clip>()
  const breakpoint = useBreakpoint()
  const notice = useNotice({ duration: 12000, limit: 1 })
  const os = useOS()

  useEffect(() => {
    if (os != "ios") return

    const displayMode = getDisplayMode()

    if (displayMode == "standalone") return

    doEveryThreeMonth(() => notice({ component: InstallNotification }))
  }, [notice, os])

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

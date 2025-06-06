"use client"
import { useBreakpoint, useNotice, useOS } from "@yamada-ui/react"
import { useEffect, useState } from "react"
import { ClipProvider } from "@/contexts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { doEveryThreeMonth } from "@/storage"
import { ClipListTabs } from "@/ui/components/data-display"
import { MobileView, PageHeader, PCView } from "@/ui/components/layouts"
import { InstallNotification } from "@/ui/components/navigation"
import { AppLayout } from "@/ui/layouts"
import { getDisplayMode } from "@/utils/mode"

interface ClipPageProps {
  clipDoc: ClipDoc
  title: string
}

export function ClipPage({ clipDoc, title }: ClipPageProps) {
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
          <PageHeader title={title} />

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

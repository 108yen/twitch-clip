"use client"
import { ClipListTabs } from "@/components/data-display"
import { ClipProvider } from "@/contexts"
import { ClipListLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { useState } from "react"

import { MobileView } from "./organisms/mobileView"
import { PCView } from "./organisms/PCView"

export default function ClipPageTemplate(props: { clipDoc: ClipDoc }) {
  const { clipDoc } = props

  //set clicked clip
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()
  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }
  const width = window.innerWidth

  if (currentClip === undefined) {
    return (
      <ClipProvider clipDoc={clipDoc} setClipUrl={handleSetClip}>
        <ClipListLayout>
          <ClipListTabs />
        </ClipListLayout>
      </ClipProvider>
    )
  } else {
    if (width < 600) {
      return (
        <MobileView
          clipDoc={clipDoc}
          currentClip={currentClip}
          setClickedClip={handleSetClip}
        />
      )
    } else {
      return (
        <PCView
          clipDoc={clipDoc}
          currentClip={currentClip}
          setClickedClip={handleSetClip}
        />
      )
    }
  }
}

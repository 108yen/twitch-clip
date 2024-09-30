"use client"
import { useState } from "react"

import { PCView } from "./organisms/PCView"
import { MobileView } from "./organisms/mobileView"
import { ClipListView } from "@/components/data-display"
import { ClipProvider } from "@/contexts"
import { ClipListLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"

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
        <ClipListLayout >
          <ClipListView />
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

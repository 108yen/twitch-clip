'use client'
import { useState } from 'react'

import { Home } from '@/app/(clip)/_Component/organisms/home'
import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../models/clipDoc'

import { PCView } from './organisms/PCView'
import { MobileView } from './organisms/mobileView'

export default function ClipPageTemplate(props: { clipDoc: ClipDoc }) {
  const { clipDoc } = props

  //set clicked clip
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()
  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }
  const width = window.innerWidth

  if (currentClip === undefined) {
    return <Home clipDoc={clipDoc} setClickedClip={handleSetClip} />
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

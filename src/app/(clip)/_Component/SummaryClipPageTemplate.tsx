'use client'
import { useState } from 'react'

import { Home } from '@/app/(clip)/_Component/organisms/home'
import { useWindowSize } from '@/components/hooks'
import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../models/clipDoc'

import { MobileView } from './organisms/mobileView'
import { PCView } from './organisms/PCView'

export default function SummaryClipPageTemplate(props: { clipDoc: ClipDoc }) {
    const { clipDoc } = props

    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>()
    function handleSetClip(clip: Clip | undefined) {
        setCurrentClip(clip)
    }
    const [width] = useWindowSize()

    if (currentClip === undefined) {
        return <Home setClickedClip={handleSetClip} />
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

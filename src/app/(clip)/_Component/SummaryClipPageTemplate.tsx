'use client'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'

import { Home } from '@/app/(clip)/_Component/organisms/home'
import { currentStreamerIdAtom } from '@/components/Atoms'
import { useWindowSize } from '@/components/hooks'
import { Clip } from '@/models/clip'

import { MobileView } from './organisms/mobileView'
import { PCView } from './organisms/PCView'

export default function SummaryClipPageTemplate(props: { id: string }) {
    const { id } = props

    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>()
    function handleSetClip(clip: Clip | undefined) {
        setCurrentClip(clip)
    }
    const [width] = useWindowSize()
    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom)

    useEffect(() => {
        setCurrentStreamerId(id)
    }, [])

    if (currentClip === undefined) {
        return <Home setClickedClip={handleSetClip} />
    } else {
        if (width < 600) {
            return (
                <MobileView
                    currentClip={currentClip}
                    setClickedClip={handleSetClip}
                />
            )
        } else {
            return (
                <PCView
                    currentClip={currentClip}
                    setClickedClip={handleSetClip}
                />
            )
        }
    }
}

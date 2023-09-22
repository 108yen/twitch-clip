'use client'
import { useAtom } from "jotai"
import { useState, useEffect } from "react"

import { ClipListLayout } from "@/app/(clip)/_Component/clipListLayout"
import { ClipViewLayout } from "@/app/(clip)/_Component/PC/clipViewLayout"
import { currentStreamerIdAtom } from "@/components/Atoms"
import { useWindowSize } from "@/components/hooks"
import { Clip } from "@/models/clip"

import { MobileClipViewLayout } from "./mobile/mobileClipViewLayout"

export default function SummaryClipPageTemplate(props: { id: string }) {
    const { id } = props
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>()
    function handleSetClip(clip: Clip) {
        setCurrentClip(clip)
    }
    const [width] = useWindowSize()

    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom)

    //to return listview from view layout
    function returnListView() {
        setCurrentClip(undefined)
    }
    useEffect(() => {
        setCurrentStreamerId(id)

        history.pushState(null, ``, null)
        window.addEventListener(`popstate`, returnListView, false)
        return () => {
            window.removeEventListener(`popstate`, returnListView, false)
        }
    }, [])

    if (currentClip===undefined) {
        return <ClipListLayout
                setClickedClip={handleSetClip}
            />
    } else {
        if (width<600) {
            return <MobileClipViewLayout
                currentClip={currentClip}
                setClickedClip={handleSetClip}
            />
        } else {
            return <ClipViewLayout
                currentClip={currentClip}
                setClickedClip={handleSetClip}
            />
        }
    }
}

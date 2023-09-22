'use client'
import { Grid } from "@mui/material"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import { ClipListLayout } from "@/app/(clip)/_Component/clipListLayout"
import { ClipViewLayout } from "@/app/(clip)/_Component/PC/clipViewLayout"
import StreamerCard from "@/app/(clip)/streamer/[id]/_Component/streamerCard"
import { currentStreamerIdAtom } from "@/components/Atoms"
import { useWindowSize } from "@/components/hooks"
import { Clip } from "@/models/clip"

import { MobileClipViewLayout } from "../../_Component/mobile/mobileClipViewLayout"

export default function StreamerClipPage(props: { id: string }) {
    const id = props.id
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>()
    function handleSetClip(clip: Clip) {
        setCurrentClip(clip)
    }
    //for set id
    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom)
    const [width] = useWindowSize()
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
        return <>
            <Grid
                container
                justifyContent='center'
                paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            >
                <Grid item xs={12} md={9}>
                    <StreamerCard />
                </Grid>
            </Grid>
            <ClipListLayout
                setClickedClip={handleSetClip}
            />
        </>
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

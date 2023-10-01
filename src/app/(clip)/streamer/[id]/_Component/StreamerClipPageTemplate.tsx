'use client'
import { Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { useEffect, useState } from 'react'

import { Home } from '@/app/(clip)/_Component/organisms/home'
import StreamerCard from '@/app/(clip)/streamer/[id]/_Component/molecules/streamerCard'
import { clipsAtom, currentStreamerIdAtom } from '@/components/Atoms'
import { useWindowSize } from '@/components/hooks'
import { Clip } from '@/models/clip'

import { MobileView } from '../../../_Component/organisms/mobileView'
import { PCView } from '../../../_Component/organisms/PCView'

export default function StreamerClipPageTemplate(props: { id: string }) {
    const id = props.id
    //extract streamerinfo
    //clips data
    const clipsLoadableAtom = loadable(clipsAtom)
    const [clipsValue] = useAtom(clipsLoadableAtom)
    const streamerInfo =
        clipsValue.state == `hasData`
            ? clipsValue.data?.streamerInfo
            : undefined
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

    if (currentClip === undefined) {
        return (
            <>
                <Grid
                    container
                    justifyContent='center'
                    paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
                >
                    <Grid item xs={12} md={9}>
                        <StreamerCard streamerInfo={streamerInfo}/>
                    </Grid>
                </Grid>
                <Home setClickedClip={handleSetClip} />
            </>
        )
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

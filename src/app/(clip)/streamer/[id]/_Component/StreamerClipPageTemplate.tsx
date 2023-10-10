'use client'
import { Grid } from '@mui/material'
import { useState } from 'react'

import { Home } from '@/app/(clip)/_Component/organisms/home'
import StreamerCard from '@/app/(clip)/streamer/[id]/_Component/molecules/streamerCard'
import { useWindowSize } from '@/components/hooks'
import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../../../models/clipDoc'
import { MobileView } from '../../../_Component/organisms/mobileView'
import { PCView } from '../../../_Component/organisms/PCView'

export default function StreamerClipPageTemplate(props: { clipDoc: ClipDoc }) {
    const { clipDoc } = props
    //extract streamerinfo
    const streamerInfo = clipDoc[`streamerInfo`]
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>()
    function handleSetClip(clip: Clip | undefined) {
        setCurrentClip(clip)
    }
    const [width] = useWindowSize()

    if (currentClip === undefined) {
        return (
            <>
                <Grid
                    container
                    justifyContent='center'
                    paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
                >
                    <Grid item xs={12} md={9}>
                        <StreamerCard streamerInfo={streamerInfo} />
                    </Grid>
                </Grid>
                <Home clipDoc={clipDoc} setClickedClip={handleSetClip} />
            </>
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

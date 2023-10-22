import { Stack, Grid } from '@mui/material'

import { BorderPaper } from '@/components/styledui'
import { Clip } from '@/models/clip'

import SquareAdvertisement from '../../../../components/adsense/squareAdvertisement'
import { ClipDoc } from '../../../../models/clipDoc'
import Player from '../atoms/common/player'
import ClipInfo from '../molecules/common/clipInfo'
import { StreamerInfo } from '../molecules/common/streamerInfo'
import SideClipCard from '../molecules/PC/sideClipCard'

export function PCView(props: {
    clipDoc: ClipDoc
    currentClip: Clip
    setClickedClip: (clip: Clip | undefined) => void
}) {
    const { clipDoc, currentClip, setClickedClip } = props

    return (
        <Grid container justifyContent='space-evenly'>
            <Grid item xs={8}>
                <Stack
                    direction='column'
                    spacing={1}
                    sx={{ minWidth: 0, marginTop: 4 }}
                >
                    <BorderPaper>
                        <Player embed_url={currentClip.embed_url} />
                    </BorderPaper>
                    <ClipInfo
                        title={currentClip.title}
                        view_count={currentClip.view_count}
                    />
                    <StreamerInfo clip={currentClip} />
                </Stack>
            </Grid>
            <Grid item zeroMinWidth xs={2}>
                <SquareAdvertisement />
                <SideClipCard
                    clipDoc={clipDoc}
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
        </Grid>
    )
}

import { Stack, Grid } from '@mui/material'

import { BorderPaper } from '@/components/styledui'
import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../../models/clipDoc'
import Player from '../atoms/common/player'
import ClipInfo from '../molecules/common/clipInfo'
import { StreamerInfo } from '../molecules/common/streamerInfo'
import SwiperClipCardList from '../molecules/common/swiperClipCardList'

export function MobileView(props: {
    clipDoc: ClipDoc
    currentClip: Clip
    setClickedClip: (clip: Clip) => void
}) {
    const { clipDoc, currentClip, setClickedClip } = props

    return (
        <Grid container justifyContent='center' paddingX={0} columnSpacing={4}>
            <Grid item zeroMinWidth xs={12}>
                <Stack direction='column' spacing={1} sx={{ minWidth: 0 }}>
                    <BorderPaper
                        sx={{
                            position: `sticky`,
                            top: 0,
                            zIndex: 1202,
                            marginTop: 0
                        }}
                    >
                        <Player embed_url={currentClip.embed_url} />
                    </BorderPaper>
                    <ClipInfo
                        title={currentClip.title}
                        view_count={currentClip.view_count}
                    />
                    <StreamerInfo clip={currentClip} />
                    <SwiperClipCardList
                        clipDoc={clipDoc}
                        setClickedClipUrl={setClickedClip}
                        sticky={true}
                    />
                </Stack>
            </Grid>
        </Grid>
    )
}

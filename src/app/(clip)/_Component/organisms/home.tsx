import { Grid } from '@mui/material'

import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../../models/clipDoc'
import SwiperClipCardList from '../molecules/common/swiperClipCardList'

export function Home(props: {
    clipDoc: ClipDoc
    setClickedClip: (clip: Clip) => void
}) {
    const { clipDoc, setClickedClip } = props
    return (
        <Grid
            container
            justifyContent='center'
            paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
        >
            <Grid item zeroMinWidth xs={12} md={9}>
                <SwiperClipCardList
                    clipDoc={clipDoc}
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
        </Grid>
    )
}

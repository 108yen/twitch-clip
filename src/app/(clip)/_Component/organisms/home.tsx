import { Grid } from '@mui/material'

import { Clip } from '@/models/clip'

import { AdmaxSideCard } from '../../../../components/admax/adCard'
import { ClipDoc } from '../../../../models/clipDoc'
import SwiperClipCardList from '../molecules/common/swiperClipCardList'

export function Home(props: {
    clipDoc: ClipDoc
    setClickedClip: (clip: Clip) => void
}) {
    const { clipDoc, setClickedClip } = props
    return (
        <Grid container justifyContent='space-evenly'>
            <Grid item zeroMinWidth xs={12} md={8}>
                <SwiperClipCardList
                    clipDoc={clipDoc}
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
            <Grid
                item
                zeroMinWidth
                md={2}
                xl={1}
                display={{ xs: `none`, md: `flex` }}
                justifyContent='center'
            >
                {/* <VerticalAdvertisement /> */}
                <AdmaxSideCard />
            </Grid>
        </Grid>
    )
}

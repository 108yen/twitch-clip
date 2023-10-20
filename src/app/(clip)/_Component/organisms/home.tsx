import { Grid } from '@mui/material'

import { Clip } from '@/models/clip'

import VerticalAdvertisement from '../../../../components/adsense/verticalAdvertisement'
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
            justifyContent='space-evenly'
            // paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            // spacing={2}
        >
            <Grid item zeroMinWidth xs={12} md={8}>
                <SwiperClipCardList
                    clipDoc={clipDoc}
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
            <Grid item zeroMinWidth md={2} display={{ xs: `none`, md: `flex` }}>
                <VerticalAdvertisement />
            </Grid>
        </Grid>
    )
}

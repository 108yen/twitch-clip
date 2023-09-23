import { Stack, Box, Typography, Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { loadable } from 'jotai/utils'

import { streamersAtom } from '@/components/Atoms'
import { BorderPaper } from '@/components/styledui'
import { Clip } from '@/models/clip'

import { StreamerInfo } from './common/streamerInfo'
import SwiperClipCardList from './common/swiperClipCardList'

export function MobileView({
    currentClip,
    setClickedClip
}: {
    currentClip: Clip
    setClickedClip: (clip: Clip) => void
}) {
    //streamer info
    const streamersLoadableAtom = loadable(streamersAtom)
    const [streamersValue] = useAtom(streamersLoadableAtom)
    const currentStreamer =
        streamersValue.state === `hasData`
            ? streamersValue.data?.find(
                  (e) => e.id == currentClip.broadcaster_id
              )
            : undefined

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
                        <Box
                            sx={{
                                position: `relative`,
                                width: `100%`,
                                height: 0,
                                paddingBottom: `56.25%`,
                                display: `flex`,
                                justifyContent: `center`
                            }}
                        >
                            <iframe
                                src={
                                    currentClip.embed_url +
                                    `&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`
                                }
                                allowFullScreen
                                loading='lazy'
                                style={{
                                    position: `absolute`,
                                    top: 0,
                                    left: 0,
                                    width: `100%`,
                                    height: `100%`,
                                    border: `none`
                                }}
                            />
                        </Box>
                    </BorderPaper>
                    <Stack
                        direction='row'
                        overflow='hidden'
                        justifyContent='space-between'
                        alignItems='flex-start'
                        flexGrow={1}
                    >
                        <Typography variant='h6' fontWeight='bold' noWrap>
                            {currentClip.title}
                        </Typography>
                        <Typography
                            align='right'
                            minWidth={95}
                            variant='body2'
                            color='grey'
                        >
                            {`${currentClip.view_count?.toLocaleString()} views`}
                        </Typography>
                    </Stack>
                    <StreamerInfo streamer={currentStreamer} />
                    <SwiperClipCardList
                        setClickedClipUrl={setClickedClip}
                        sticky={true}
                    />
                </Stack>
            </Grid>
        </Grid>
    )
}

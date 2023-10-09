import { Stack, Box, Typography, Grid } from '@mui/material'

import { BorderPaper } from '@/components/styledui'
import { Clip } from '@/models/clip'

import { StreamerInfo } from '../molecules/common/streamerInfo'
import SideClipCard from '../molecules/PC/sideClipCard'

export function PCView({
    currentClip,
    setClickedClip
}: {
    currentClip: Clip
    setClickedClip: (clip: Clip | undefined) => void
}) {
    return (
        <Grid
            container
            justifyContent='center'
            paddingX={{ xs: 0, md: 5, xl: 15 }}
            columnSpacing={4}
        >
            <Grid item xs={12} sm={9}>
                <Stack direction='column' spacing={1} sx={{ minWidth: 0 }}>
                    <BorderPaper
                        sx={{
                            marginTop: { xs: 0, md: 5 }
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
                                src={`${currentClip.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`}
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
                    <StreamerInfo clip={currentClip} />
                </Stack>
            </Grid>
            <Grid item zeroMinWidth xs={3}>
                <SideClipCard setClickedClipUrl={setClickedClip} />
            </Grid>
        </Grid>
    )
}

import { Launch } from '@mui/icons-material'
import { Avatar, Box, Paper, Skeleton, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { event } from '@/components/gtag'
import {
    BorderPaper,
    NoDecorationTypography,
    StyledLaunch
} from '@/components/styledui'

import { Streamer } from '../../../../../../models/streamer'

function StreamerCard(props: { streamerInfo: Streamer | undefined }) {
    const { streamerInfo } = props
    if (streamerInfo != undefined) {
        return (
            <Box
                sx={{
                    p: 2,
                    display: `flex`,
                    justifyContent: `center`
                }}
            >
                <BorderPaper
                    sx={{
                        p: 2,
                        overflow: `hidden`,
                        maxWidth: 700,
                        minWidth: { xs: 400, md: 600 }
                    }}
                >
                    <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={1}
                    >
                        <Link
                            href={`/streamer/${streamerInfo.id}?display_name=${streamerInfo.display_name}`}
                            aria-label='streamer page link'
                            style={{
                                textDecoration: `none`
                            }}
                        >
                            <Avatar
                                alt='top'
                                src={streamerInfo.profile_image_url}
                            />
                        </Link>

                        <Stack
                            spacing={0}
                            direction='column'
                            justifyContent='space-between'
                            flexGrow={1}
                            overflow='hidden'
                        >
                            <Stack
                                direction='row'
                                justifyContent='space-between'
                                alignItems='start'
                                flexGrow={1}
                                spacing={1}
                            >
                                <Typography variant='subtitle1' noWrap>
                                    {streamerInfo.display_name}
                                </Typography>
                                <Link
                                    href={
                                        `https://www.twitch.tv/` +
                                        streamerInfo.login
                                    }
                                    aria-label='twitch channel page link'
                                    target='_blank'
                                    style={{
                                        textDecoration: `none`
                                    }}
                                    onClick={() => {
                                        event(`click`, {
                                            label: `click_twitch_channel`,
                                            channel_title:
                                                streamerInfo.display_name,
                                            link_url:
                                                `https://www.twitch.tv/` +
                                                streamerInfo.login
                                        })
                                    }}
                                >
                                    <Stack direction='row' spacing={1}>
                                        <NoDecorationTypography variant='body2'>
                                            Twitch
                                        </NoDecorationTypography>
                                        <StyledLaunch fontSize='small' />
                                    </Stack>
                                </Link>
                            </Stack>
                            <Typography variant='body2' color='gray'>
                                {streamerInfo.description}
                            </Typography>

                            <Typography
                                noWrap
                                variant='body2'
                                color='gray'
                                textAlign='end'
                                width='100%'
                            >
                                {streamerInfo.follower_num?.toLocaleString()}
                                {` `}
                                followers
                            </Typography>
                        </Stack>
                    </Stack>
                </BorderPaper>
            </Box>
        )
    }
    return (
        <Box
            sx={{
                p: 2,
                display: `flex`,
                justifyContent: `center`
            }}
        >
            <Paper
                sx={{
                    p: 2,
                    overflow: `hidden`,
                    maxWidth: 700,
                    minWidth: { xs: 400, md: 600 }
                }}
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='flex-start'
                >
                    <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={1}
                    >
                        <Skeleton variant='circular' width={40} height={40} />
                        <Typography variant='subtitle1' noWrap>
                            <Skeleton width={150} />
                        </Typography>
                    </Stack>

                    <Stack direction='row' spacing={1}>
                        <Typography variant='body2'>Twitch</Typography>
                        <Launch fontSize='small' />
                    </Stack>
                </Stack>
                <Stack
                    ml={6}
                    spacing={0}
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                >
                    <Typography variant='body2'>
                        <Skeleton width={350} />
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}

export default StreamerCard

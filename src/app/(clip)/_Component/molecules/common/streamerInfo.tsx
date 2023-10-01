import { Stack, Typography, Avatar } from '@mui/material'
import Link from 'next/link'

import { event } from '@/components/gtag'
import { NoDecorationTypography, StyledLaunch } from '@/components/styledui'

import { Clip } from '../../../../../models/clip'

export function StreamerInfo({ clip }: { clip: Clip }) {
    return (
        <Stack
            direction='row'
            overflow='hidden'
            alignItems='center'
            spacing={1}
        >
            <Link
                href={`/streamer/${clip.broadcaster_id}?display_name=${clip.broadcaster_name}`}
                style={{
                    textDecoration: `none`
                }}
            >
                <Avatar
                    sx={{ width: 35, height: 35 }}
                    alt='top'
                    src={clip.profile_image_url}
                />
            </Link>
            <Stack
                direction='row'
                overflow='hidden'
                justifyContent='space-between'
                alignItems='flex-start'
                flexGrow={1}
            >
                <Stack direction='column' overflow='hidden'>
                    <Link
                        href={`/streamer/${clip.broadcaster_id}?display_name=${clip.broadcaster_name}`}
                        aria-label='streamer page link'
                        style={{
                            textDecoration: `none`
                        }}
                    >
                        <NoDecorationTypography
                            variant='body1'
                            fontWeight='bold'
                        >
                            {clip.broadcaster_name}
                        </NoDecorationTypography>
                        <Typography variant='inherit' color='grey'>
                            {`${clip.broadcaster_follower_num?.toLocaleString()} followers`}
                        </Typography>
                    </Link>
                </Stack>
                <Link
                    href={`https://www.twitch.tv/` + clip.broadcaster_login}
                    aria-label='twitch channel page link'
                    target='_blank'
                    style={{
                        textDecoration: `none`
                    }}
                    onClick={() => {
                        event(`click`, {
                            label: `click_twitch_channel`,
                            channel_title: clip.broadcaster_name,
                            link_url:
                                `https://www.twitch.tv/` +
                                clip.broadcaster_login
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
        </Stack>
    )
}

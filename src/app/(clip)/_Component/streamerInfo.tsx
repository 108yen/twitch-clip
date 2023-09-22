import { Stack,  Typography,  Avatar, Skeleton } from "@mui/material"
import Link from "next/link"

import { event } from "@/components/gtag"
import {  NoDecorationTypography, StyledLaunch } from "@/components/styledui"
import { Streamer } from "@/models/streamer"

export function StreamerInfo({ streamer }: { streamer: Streamer | undefined }) {
    if (streamer != undefined) {
        return (
            <Stack
                direction='row'
                overflow='hidden'
                alignItems='center'
                spacing={1}
            >
                <Link
                    href={`/streamer/${streamer.id}?display_name=${streamer.display_name}`}
                    style={{
                        textDecoration: `none`,
                    }}
                >
                    <Avatar
                        sx={{ width: 35, height: 35 }}
                        alt='top'
                        src={streamer.profile_image_url} />
                </Link>
                <Stack
                    direction='row'
                    overflow='hidden'
                    justifyContent='space-between'
                    alignItems='flex-start'
                    flexGrow={1}
                >
                    <Stack
                        direction='column'
                        overflow='hidden'
                    >
                        <Link
                            href={`/streamer/${streamer.id}?display_name=${streamer.display_name}`}
                            aria-label='streamer page link'
                            style={{
                                textDecoration: `none`,
                            }}
                        >
                            <NoDecorationTypography variant='body1' fontWeight='bold'>
                                {streamer.display_name}
                            </NoDecorationTypography>
                            <Typography variant='inherit' color='grey'>
                                {streamer.follower_num?.toLocaleString()} followers
                            </Typography>
                        </Link>
                    </Stack>
                    <Link
                        href={`https://www.twitch.tv/` + streamer.login}
                        aria-label='twitch channel page link'
                        target='_blank'
                        style={{
                            textDecoration: `none`,
                        }}
                        onClick={() => {
                            event(`click`, {
                                label: `click_twitch_channel`,
                                channel_title: streamer.display_name,
                                link_url: `https://www.twitch.tv/` + streamer.login,
                            })
                        }}

                    >
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <NoDecorationTypography
                                variant='body2'
                            >
                                Twitch
                            </NoDecorationTypography>
                            <StyledLaunch fontSize='small' />
                        </Stack>
                    </Link>
                </Stack>
            </Stack>
        )
    } else {
        return (
            <Stack
                direction='row'
                overflow='hidden'
                spacing={1}
            >
                <Skeleton
                    variant='circular'
                    width={35}
                    height={35} />
                <Stack
                    direction='column'
                    overflow='hidden'
                >
                    <Skeleton width={150} />
                </Stack>
            </Stack>

        )
    }
}

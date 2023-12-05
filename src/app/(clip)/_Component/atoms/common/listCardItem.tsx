import { Stack, Typography, Avatar } from '@mui/material'
import Link from 'next/link'

import { event } from '@/components/googleAnalytics/gtag'

import {
    BorderPaper,
    StyledLaunch,
    NoDecorationTypography
} from '../../../../../components/styledui'
import { Clip } from '../../../../../models/clip'

export default function ListCardItem({
    clip,
    tab,
    setClickedClipUrl
}: {
    clip: Clip
    tab: string
    setClickedClipUrl: (clip: Clip) => void
}) {
    const imageWidth = 300

    function formatDate(dateString: string) {
        const date = new Date(dateString)

        const options: Intl.DateTimeFormatOptions = {
            timeZone: `Asia/Tokyo`,
            year: `numeric`,
            month: `2-digit`,
            day: `2-digit`,
            hour: `2-digit`,
            minute: `2-digit`,
            second: `2-digit`
        }

        const formattedDate = new Intl.DateTimeFormat(`ja-JP`, options).format(
            date
        )
        return formattedDate
    }

    return (
        <BorderPaper
            sx={{
                marginX: { xs: 0, sm: 1 },
                marginY: { xs: 1, sm: 2 }
            }}
        >
            <Stack
                direction='row'
                overflow='hidden'
                sx={{
                    height: { xs: 110, sm: 170 }
                }}
            >
                <img
                    src={clip.thumbnail_url}
                    alt={clip.title}
                    width={imageWidth}
                    height={(imageWidth * 9) / 16}
                    loading='lazy'
                    style={{
                        width: `auto`,
                        height: `100%`
                    }}
                />
                <Stack
                    direction='column'
                    overflow='hidden'
                    p={1}
                    sx={{ flexGrow: 1 }}
                >
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography
                            variant='h6'
                            noWrap
                            fontWeight='bold'
                            component='div'
                            sx={{
                                cursor: `pointer`
                            }}
                            onClick={() => {
                                setClickedClipUrl(clip)
                                event(`click`, {
                                    label: `click_clip_title`,
                                    clip_title: clip.title,
                                    ranking_period: tab,
                                    link_url: clip.url
                                })
                            }}
                        >
                            {clip.title}
                        </Typography>
                        <Link
                            href={clip.url ?? ``}
                            target='_blank'
                            style={{
                                textDecoration: `none`
                            }}
                            onClick={() => {
                                event(`click`, {
                                    label: `click_twitch_clip_link`,
                                    clip_title: clip.title,
                                    ranking_period: tab,
                                    link_url: clip.url
                                })
                            }}
                        >
                            <StyledLaunch fontSize='small' />
                        </Link>
                    </Stack>
                    <Link
                        href={`/streamer/${clip.broadcaster_id}`}
                        aria-label='twitch clip page link'
                        prefetch={false}
                        style={{
                            textDecoration: `none`
                        }}
                    >
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Avatar alt='icon' src={clip.profile_image_url} />
                            <NoDecorationTypography noWrap variant='body1'>
                                {clip.broadcaster_name}
                            </NoDecorationTypography>
                        </Stack>
                    </Link>
                    <Typography
                        noWrap
                        variant='body1'
                        display={{ xs: `none`, sm: `flex` }}
                    >
                        created_by : {clip.creator_name}
                    </Typography>
                    <Typography
                        noWrap
                        variant='body1'
                        display={{ xs: `none`, sm: `flex` }}
                    >
                        created_at : {formatDate(clip.created_at ?? ``)}
                    </Typography>
                    <Typography
                        noWrap
                        variant='body1'
                        color='gray'
                        textAlign='end'
                    >
                        {clip.view_count?.toLocaleString() + ` views`}
                    </Typography>
                </Stack>
            </Stack>
        </BorderPaper>
    )
}

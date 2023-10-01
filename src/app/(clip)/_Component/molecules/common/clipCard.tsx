import { Avatar, Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
    clipCardsDisplayNumAtom,
    clipsAtom,
    moreItemIsExistAtom,
    tabNameAtom
} from '@/components/Atoms'
import { event } from '@/components/gtag'
import {
    BorderPaper,
    NoDecorationTypography,
    StyledLaunch
} from '@/components/styledui'
import { Clip } from '@/models/clip'

function ClipCardItem({
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
                        href={`/streamer/${clip.broadcaster_id}?display_name=${clip.broadcaster_name}`}
                        aria-label='twitch clip page link'
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

export default function ClipCardList({
    setClickedClipUrl
}: {
    setClickedClipUrl: (clip: Clip) => void
}) {
    //clips data
    const clipsLoadableAtom = loadable(clipsAtom)
    const [clipsValue] = useAtom(clipsLoadableAtom)
    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useAtom(clipCardsDisplayNumAtom)
    const [hasMore, setHasMore] = useAtom(moreItemIsExistAtom)
    //period tab name
    const tabLoadableAtom = loadable(tabNameAtom)
    const [tabValue] = useAtom(tabLoadableAtom)

    function loadMore(clips: Clip[]) {
        //if max item num is clips num
        if (viewItemNum >= clips.length - 1) {
            setHasMore(false)
        }
        //load each 1 items
        setViewItemNum(viewItemNum + 1)
    }

    const loader = (
        <Box
            key={0}
            sx={{
                display: `flex`,
                justifyContent: `center`,
                m: 2
            }}
        >
            <CircularProgress color='secondary' />
        </Box>
    )

    const endMessage = (
        <Box key={0} sx={{ m: 3, display: `flex`, justifyContent: `center` }}>
            <Typography variant='inherit' color='gray'>
                no more clips
            </Typography>
        </Box>
    )

    if (clipsValue.state === `hasData` && tabValue.state === `hasData`) {
        const tab = tabValue.data
        let clips: Array<Clip> = []
        if (clipsValue.data != undefined) {
            const clipDoc = clipsValue.data[tab]
            if (clipDoc != undefined) {
                clips = clipsValue.data[tab] as Array<Clip>
            }
        }

        if (clips.length != 0) {
            return (
                <>
                    <InfiniteScroll
                        dataLength={viewItemNum}
                        next={() => {
                            loadMore(clips)
                        }}
                        hasMore={hasMore}
                        loader={loader}
                        endMessage={endMessage}
                    >
                        {clips.slice(0, viewItemNum).map((e, index) => {
                            return (
                                <ClipCardItem
                                    key={index}
                                    clip={e}
                                    tab={tab}
                                    setClickedClipUrl={setClickedClipUrl}
                                />
                            )
                        })}
                    </InfiniteScroll>
                </>
            )
        } else {
            return endMessage
        }
    } else if (clipsValue.state === `loading` || tabValue.state === `loading`) {
        return loader
    } else {
        //error handling
        if (clipsValue.state === `hasError`) {
            event(`error`, {
                label: `click_load_error`
            })
        } else if (tabValue.state === `hasError`) {
            event(`error`, {
                label: `tab_load_error`
            })
        }
        return (
            <Box key={0} sx={{ display: `flex`, justifyContent: `center` }}>
                <Typography variant='inherit' color='gray'>
                    load error
                </Typography>
            </Box>
        )
    }
}

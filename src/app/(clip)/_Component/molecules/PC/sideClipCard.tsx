import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
    Typography,
    Divider,
    Box,
    CircularProgress,
    Stack,
    Avatar,
    MenuItem,
    SelectChangeEvent,
    Tooltip
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { event } from '@/components/gtag'
import { useWindowSize } from '@/components/hooks'
import {
    BorderPaper,
    BorderSelect,
    NoDecorationTypography
} from '@/components/styledui'
import { Clip } from '@/models/clip'

import { ClipDoc } from '../../../../../models/clipDoc'
import getTabNameList from '../utils/getTabNameList'

function CardList(props: {
    tab: string
    clips: Array<Clip>
    setClickedClipUrl: (clip: Clip) => void
}) {
    const { tab, clips, setClickedClipUrl } = props

    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useState(7)
    const [hasMore, setHasMore] = useState(true)
    //window size
    const [, height] = useWindowSize()

    function loadMore(clips: Clip[]) {
        //if max item num is clips num
        if (viewItemNum >= clips.length - 1) {
            setHasMore(false)
            event(`scroll`, {
                label: `load_all_clips`
            })
        }
        //load each 1 items
        setViewItemNum(viewItemNum + 1)
    }
    const loader = (
        <Box key={0} sx={{ display: `flex`, justifyContent: `center` }}>
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

    if (clips.length != 0) {
        return (
            <InfiniteScroll
                dataLength={viewItemNum}
                next={() => {
                    loadMore(clips)
                }}
                hasMore={hasMore}
                loader={loader}
                endMessage={endMessage}
                height={height - 133}
            >
                {clips.slice(0, viewItemNum).map((e, index) => {
                    return (
                        <CardItem
                            key={index}
                            clip={e}
                            tab={tab}
                            setClickedClipUrl={setClickedClipUrl}
                        />
                    )
                })}
            </InfiniteScroll>
        )
    } else {
        return endMessage
    }
}

function CardItem(props: {
    clip: Clip
    tab: string
    setClickedClipUrl: (clip: Clip) => void
}) {
    const { clip, tab, setClickedClipUrl } = props

    return (
        <Box
            sx={{
                marginY: 2
            }}
        >
            <Tooltip followCursor placement='top' title={clip.title}>
                <Stack
                    direction='column'
                    overflow='hidden'
                    spacing={1}
                    sx={{ flexGrow: 1 }}
                >
                    <BorderPaper
                        sx={{
                            position: `relative`,
                            width: `100%`,
                            height: 0,
                            paddingBottom: `56.25%`,
                            display: `flex`,
                            justifyContent: `center`,
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
                        <img
                            src={clip.thumbnail_url}
                            alt={clip.title}
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
                    </BorderPaper>
                    <Link
                        href={`/streamer/${clip.broadcaster_id}?display_name=${clip.broadcaster_name}`}
                        style={{
                            textDecoration: `none`
                        }}
                    >
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Avatar
                                sx={{ width: 35, height: 35 }}
                                alt='top'
                                src={clip.profile_image_url}
                            />
                            <Stack
                                direction='column'
                                overflow='hidden'
                                flexGrow={1}
                            >
                                <NoDecorationTypography variant='body1' noWrap>
                                    {clip.title}
                                </NoDecorationTypography>
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                    flexGrow={1}
                                >
                                    <Typography
                                        noWrap
                                        variant='body1'
                                        color='grey'
                                    >
                                        {clip.broadcaster_name}
                                    </Typography>
                                    <Typography
                                        noWrap
                                        variant='body2'
                                        color='grey'
                                    >
                                        {clip.view_count?.toLocaleString()}
                                        {` `}
                                        views
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Link>
                </Stack>
            </Tooltip>
        </Box>
    )
}

export default function SideClipCard(props: {
    clipDoc: ClipDoc
    setClickedClipUrl: (clip: Clip | undefined) => void
}) {
    const { clipDoc, setClickedClipUrl } = props

    const tabNameList = getTabNameList(clipDoc)
    //tab index
    const [tab, setTab] = useState(0)
    const currentTabName = tabNameList[tab]
    const currentClips = clipDoc[currentTabName] as Array<Clip>

    function handleTabChange(event: SelectChangeEvent<unknown>) {
        setTab(event.target.value as number)
    }

    return (
        <Stack direction='column' overflow='hidden' flexGrow={1}>
            <Stack
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
            >
                <BorderSelect
                    size='small'
                    value={tab}
                    onChange={handleTabChange}
                >
                    {tabNameList.map((e, index) => (
                        <MenuItem key={index} value={index}>
                            {e}
                        </MenuItem>
                    ))}
                </BorderSelect>
            </Stack>
            <Tooltip followCursor placement='top' title='リスト表示にもどる'>
                <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    color='grey'
                    onClick={() => {
                        setClickedClipUrl(undefined)
                        event(`click`, {
                            label: `click_return_to_list_view`
                        })
                    }}
                    sx={{
                        cursor: `pointer`
                    }}
                >
                    <ChevronLeftIcon />
                    <Typography variant='subtitle1'>clips</Typography>
                </Stack>
            </Tooltip>
            <Divider />
            <CardList
                tab={currentTabName}
                clips={currentClips}
                setClickedClipUrl={setClickedClipUrl}
            />
        </Stack>
    )
}

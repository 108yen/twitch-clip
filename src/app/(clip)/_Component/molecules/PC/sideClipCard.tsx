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
import { useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
    clipCardsDisplayNumAtom,
    clipsAtom,
    moreItemIsExistAtom,
    tabAtom,
    tabNameAtom,
    tabNameListAtom
} from '@/components/Atoms'
import { event } from '@/components/gtag'
import { useWindowSize } from '@/components/hooks'
import {
    BorderPaper,
    BorderSelect,
    NoDecorationTypography
} from '@/components/styledui'
import { Clip } from '@/models/clip'

function CardList({
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
    //window size
    const [, height] = useWindowSize()

    function loadMore(clips: Clip[]) {
        //if max item num is clips num
        if (viewItemNum >= clips.length - 1) {
            setHasMore(false)
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

function CardItem({
    clip,
    tab,
    setClickedClipUrl
}: {
    clip: Clip
    tab: string
    setClickedClipUrl: (clip: Clip) => void
}) {
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

export default function SideClipCard({
    setClickedClipUrl
}: {
    setClickedClipUrl: (clip: Clip | undefined) => void
}) {
    //tab index
    const [tab, setTab] = useAtom(tabAtom)
    //get tab name list
    const tabNameListLoadableAtom = loadable(tabNameListAtom)
    const [tabNameListValue] = useAtom(tabNameListLoadableAtom)
    //use this
    const tabNameList =
        tabNameListValue.state === `hasData`
            ? tabNameListValue.data
            : [
                  `day`, //
                  `week`,
                  `month`,
                  `year`,
                  `all`
              ]

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
                            label: `click_return_to_list_view`,
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
            <CardList setClickedClipUrl={setClickedClipUrl} />
        </Stack>
    )
}

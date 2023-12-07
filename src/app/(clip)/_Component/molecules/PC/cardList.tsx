import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { event } from '@/components/googleAnalytics/gtag'

import { PCCard } from '../../../../../components/admax/adsCard'
import { Clip } from '../../../../../models/clip'
import CardItem from '../../atoms/PC/cardItem'

export default function CardList(props: {
    hasMore: boolean
    viewItemNum: number
    loadAll: () => void
    incrementViewItemNum: () => void
    tab: string
    clips: Array<Clip>
    setClickedClipUrl: (clip: Clip) => void
}) {
    const {
        hasMore,
        viewItemNum,
        loadAll,
        incrementViewItemNum,
        tab,
        clips,
        setClickedClipUrl
    } = props

    //window size
    const height = window.innerHeight

    useEffect(() => {
        console.log(height)
    }, [height])

    function loadMore(clips: Clip[]) {
        //if max item num is clips num
        if (viewItemNum >= clips.length - 1) {
            loadAll()
            event(`scroll`, {
                label: `load_all_clips`
            })
        }
        //load each 1 items
        incrementViewItemNum()
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

    const cardItems = useMemo(
        () =>
            clips.slice(0, viewItemNum).map((e, index) => {
                if ((index % 10 == 0 && index != 0) || index == 2) {
                    return (
                        <Stack key={index} direction='column'>
                            {/* <SquareAdvertisement /> */}
                            <PCCard />
                            <CardItem
                                clip={e}
                                tab={tab}
                                setClickedClipUrl={setClickedClipUrl}
                            />
                        </Stack>
                    )
                }
                return (
                    <CardItem
                        key={index}
                        clip={e}
                        tab={tab}
                        setClickedClipUrl={setClickedClipUrl}
                    />
                )
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            clips, //
            tab,
            // setClickedClipUrl,
            viewItemNum
        ]
    )

    if (clips.length != 0) {
        return (
            <InfiniteScroll
                style={{ overflowX: `hidden` }}
                dataLength={viewItemNum}
                next={() => {
                    loadMore(clips)
                }}
                hasMore={hasMore}
                loader={loader}
                endMessage={endMessage}
                height={height - 121}
            >
                {cardItems}
            </InfiniteScroll>
        )
    } else {
        return endMessage
    }
}

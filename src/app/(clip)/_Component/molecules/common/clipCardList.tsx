import { Box, CircularProgress, Typography } from '@mui/material'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { event } from '@/components/gtag'
import { Clip } from '@/models/clip'

import ListCardItem from '../../atoms/common/listCardItem'

export default function ClipCardList(props: {
    tab: string
    clips: Array<Clip>
    setClickedClipUrl: (clip: Clip) => void
}) {
    const { tab, clips, setClickedClipUrl } = props

    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useState(7)
    const [hasMore, setHasMore] = useState(true)

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
                            <ListCardItem
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
}

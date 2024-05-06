import { Box, CircularProgress, Typography } from "@mui/material"
import { useMemo } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

import HorizontalAdvertisement from "@/components/adsense/horizontalAdvertisement"
import { event } from "@/components/googleAnalytics/gtag"
import { Clip } from "@/models/clip"

import ListCardItem from "../../atoms/common/listCardItem"

export default function ClipCardList(props: {
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
    <Box
      key={0}
      sx={{
        display: `flex`,
        justifyContent: `center`,
        m: 2
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  )

  const endMessage = (
    <Box key={0} sx={{ m: 3, display: `flex`, justifyContent: `center` }}>
      <Typography variant="inherit" color="gray">
        no more clips
      </Typography>
    </Box>
  )

  const cardItems = useMemo(
    () =>
      clips.slice(0, viewItemNum).map((e, index) => {
        // if (index % 10 == 0 && index != 0) {
        if (index == 10) {
          return (
            <Box key={index}>
              <Box display={{ xs: `flex`, md: `none` }} width="100%">
                <HorizontalAdvertisement />
              </Box>
              <ListCardItem
                clip={e}
                tab={tab}
                setClickedClipUrl={setClickedClipUrl}
              />
            </Box>
          )
        }
        return (
          <ListCardItem
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
        dataLength={viewItemNum}
        next={() => {
          loadMore(clips)
        }}
        hasMore={hasMore}
        loader={loader}
        endMessage={endMessage}
      >
        {cardItems}
      </InfiniteScroll>
    )
  } else {
    return endMessage
  }
}

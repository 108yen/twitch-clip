import { event } from "@/components/googleAnalytics/gtag"
import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

import SquareAdvertisement from "../../../../../components/adsense/squareAdvertisement"
import { Clip } from "../../../../../models/clip"
import CardItem from "../../atoms/PC/cardItem"

export default function CardList(props: {
  clips: Array<Clip>
  hasMore: boolean
  incrementViewItemNum: () => void
  loadAll: () => void
  setClickedClipUrl: (clip: Clip) => void
  tab: string
  viewItemNum: number
}) {
  const {
    clips,
    hasMore,
    incrementViewItemNum,
    loadAll,
    setClickedClipUrl,
    tab,
    viewItemNum,
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
      event("scroll", {
        label: "load_all_clips",
      })
    }
    //load each 1 items
    incrementViewItemNum()
  }
  const loader = (
    <Box key={0} sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="secondary" />
    </Box>
  )

  const endMessage = (
    <Box key={0} sx={{ display: "flex", justifyContent: "center", m: 3 }}>
      <Typography color="gray" variant="inherit">
        no more clips
      </Typography>
    </Box>
  )

  const cardItems = useMemo(
    () =>
      clips.slice(0, viewItemNum).map((e, index) => {
        if ((index % 10 == 0 && index != 0) || index == 2) {
          return (
            <Stack direction="column" key={index}>
              <SquareAdvertisement />
              <CardItem
                clip={e}
                setClickedClipUrl={setClickedClipUrl}
                tab={tab}
              />
            </Stack>
          )
        }
        return (
          <CardItem
            clip={e}
            key={index}
            setClickedClipUrl={setClickedClipUrl}
            tab={tab}
          />
        )
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      clips, //
      tab,
      // setClickedClipUrl,
      viewItemNum,
    ],
  )

  if (clips.length != 0) {
    return (
      <InfiniteScroll
        dataLength={viewItemNum}
        endMessage={endMessage}
        hasMore={hasMore}
        height={height - 121}
        loader={loader}
        next={() => {
          loadMore(clips)
        }}
        style={{ overflowX: "hidden" }}
      >
        {cardItems}
      </InfiniteScroll>
    )
  } else {
    return endMessage
  }
}

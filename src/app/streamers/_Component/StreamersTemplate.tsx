"use client"
import { Divider, Grid } from "@mui/material"
import { useState } from "react"

import VerticalAdvertisement from "../../../components/adsense/side-bar-ad"
import { Streamer } from "../../../models/streamer"
import StreamerList from "./molecules/StreamerList"
import StreamersPageHeader from "./molecules/streamersPageHeader"

export default function StreamersTemplate(props: {
  streamers: Array<Streamer>
}) {
  const { streamers } = props
  // search
  const [searchText, setSearchText] = useState<string>("")
  const filteredStreamer = streamers.filter((streamer) => {
    return (
      streamer.display_name?.includes(searchText) ||
      streamer.login?.includes(searchText)
    )
  })
  const channelNum = filteredStreamer.length

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item md={8} xs={12}>
        <StreamersPageHeader
          channelNum={channelNum}
          handleSearchTextChange={handleSearchTextChange}
          searchText={searchText}
        />
        <Divider
          sx={{
            marginX: { sm: 1, xs: 0 },
          }}
        />
        <StreamerList streamers={filteredStreamer} />
      </Grid>
      <Grid
        display={{ md: "flex", xs: "none" }}
        item
        md={2}
        xl={1}
        zeroMinWidth
      >
        <VerticalAdvertisement />
      </Grid>
    </Grid>
  )
}

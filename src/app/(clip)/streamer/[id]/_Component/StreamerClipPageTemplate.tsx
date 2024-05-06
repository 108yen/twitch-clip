"use client"
import {
  AppBar,
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Toolbar
} from "@mui/material"
import { SyntheticEvent, useState } from "react"

import StreamerCard from "@/app/(clip)/streamer/[id]/_Component/molecules/streamerCard"
import { Clip } from "@/models/clip"

import VerticalAdvertisement from "../../../../../components/adsense/verticalAdvertisement"
import { ClipDoc } from "../../../../../models/clipDoc"
import SwiperClipCardList from "../../../_Component/molecules/common/swiperClipCardList"
import { PCView } from "../../../_Component/organisms/PCView"
import { MobileView } from "../../../_Component/organisms/mobileView"

export default function StreamerClipPageTemplate(props: { clipDoc: ClipDoc }) {
  const { clipDoc } = props
  //extract streamerinfo
  const streamerInfo = clipDoc[`streamerInfo`]
  //set clicked clip
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()
  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }
  //set select
  const [selectTab, setSelectTab] = useState<`trend` | `history`>(`trend`)
  function handleTabChange(
    _: SyntheticEvent<Element, Event>,
    val: `trend` | `history`
  ) {
    setSelectTab(val)
  }
  function clipSeparation(clipDoc: ClipDoc, val: `trend` | `history`) {
    const trend = [
      `day`, //
      `week`,
      `month`,
      `year`,
      `all`
    ]

    const result = new ClipDoc()
    for (const prop in clipDoc) {
      if (
        (val == `trend` && trend.includes(prop)) ||
        (val == `history` && !trend.includes(prop))
      ) {
        result[prop] = clipDoc[prop]
      }
    }
    return result
  }
  const filterdClipDoc = clipSeparation(clipDoc, selectTab)

  //width
  const width = window.innerWidth

  if (currentClip === undefined) {
    return (
      <>
        <Divider />
        <Grid container justifyContent="space-evenly">
          <Grid item zeroMinWidth xs={12} md={8}>
            <AppBar position="relative" elevation={0}>
              <Toolbar
                sx={{
                  display: `flex`,
                  justifyContent: `center`
                }}
              >
                <Stack
                  direction="column"
                  flexGrow={1}
                  paddingY={5}
                  justifyContent="center"
                  overflow="hidden"
                  maxWidth={800}
                >
                  <StreamerCard streamerInfo={streamerInfo} />
                  <Box
                    sx={{
                      justifyContent: `start`,
                      display: `flex`
                    }}
                  >
                    <Tabs
                      TabIndicatorProps={{
                        sx: {
                          height: `1px`,
                          backgroundColor: `text.primary`
                        }
                      }}
                      sx={{
                        "& .MuiTab-root": {
                          paddingX: 2,
                          minWidth: 0,
                          textTransform: `none`
                        }
                      }}
                      textColor="inherit"
                      value={selectTab}
                      onChange={handleTabChange}
                    >
                      <Tab key={0} label="Trend" value="trend" />
                      <Tab key={1} label="History" value="history" />
                    </Tabs>
                  </Box>
                </Stack>
              </Toolbar>
            </AppBar>
            <SwiperClipCardList
              clipDoc={filterdClipDoc}
              setClickedClipUrl={handleSetClip}
            />
          </Grid>
          <Grid
            item
            zeroMinWidth
            md={2}
            xl={1}
            display={{ xs: `none`, md: `flex` }}
            justifyContent="center"
          >
            <VerticalAdvertisement />
            {/* <AdmaxPCSideCard /> */}
          </Grid>
        </Grid>
      </>
    )
  } else {
    if (width < 600) {
      return (
        <MobileView
          clipDoc={clipDoc}
          currentClip={currentClip}
          setClickedClip={handleSetClip}
        />
      )
    } else {
      return (
        <PCView
          clipDoc={clipDoc}
          currentClip={currentClip}
          setClickedClip={handleSetClip}
        />
      )
    }
  }
}

"use client"
import StreamerCard from "@/app/(clip)/streamer/[id]/_Component/molecules/streamerCard"
import { ClipListTabs } from "@/components/data-display"
import { ClipProvider } from "@/contexts"
import { Clip } from "@/models/clip"
import {
  AppBar,
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material"
import { SyntheticEvent, useState } from "react"

import VerticalAdvertisement from "../../../../../components/adsense/side-bar-ad"
import { ClipDoc } from "../../../../../models/clipDoc"
import { MobileView } from "../../../_Component/organisms/mobileView"
import { PCView } from "../../../_Component/organisms/PCView"

export default function StreamerClipPageTemplate(props: { clipDoc: ClipDoc }) {
  const { clipDoc } = props
  //extract streamer info
  const streamerInfo = clipDoc["streamerInfo"]
  //set clicked clip
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()
  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }
  //set select
  const [selectTab, setSelectTab] = useState<"history" | "trend">("trend")
  function handleTabChange(
    _: SyntheticEvent<Element, Event>,
    val: "history" | "trend",
  ) {
    setSelectTab(val)
  }
  function clipSeparation(clipDoc: ClipDoc, val: "history" | "trend") {
    const trend = [
      "day", //
      "week",
      "month",
      "year",
      "all",
    ]

    const result = new ClipDoc()
    for (const prop in clipDoc) {
      if (
        (val == "trend" && trend.includes(prop)) ||
        (val == "history" && !trend.includes(prop))
      ) {
        result[prop] = clipDoc[prop]
      }
    }
    return result
  }
  const filteredClipDoc = clipSeparation(clipDoc, selectTab)

  //width
  const width = window.innerWidth

  if (currentClip === undefined) {
    return (
      <>
        <Divider />
        <Grid container justifyContent="space-evenly">
          <Grid item md={8} xs={12} zeroMinWidth>
            <AppBar elevation={0} position="relative">
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack
                  direction="column"
                  flexGrow={1}
                  justifyContent="center"
                  maxWidth={800}
                  overflow="hidden"
                  paddingY={5}
                >
                  <StreamerCard streamerInfo={streamerInfo} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <Tabs
                      onChange={handleTabChange}
                      sx={{
                        "& .MuiTab-root": {
                          minWidth: 0,
                          paddingX: 2,
                          textTransform: "none",
                        },
                      }}
                      TabIndicatorProps={{
                        sx: {
                          backgroundColor: "text.primary",
                          height: "1px",
                        },
                      }}
                      textColor="inherit"
                      value={selectTab}
                    >
                      <Tab key={0} label="Trend" value="trend" />
                      <Tab key={1} label="History" value="history" />
                    </Tabs>
                  </Box>
                </Stack>
              </Toolbar>
            </AppBar>

            <ClipProvider clipDoc={filteredClipDoc} setClipUrl={handleSetClip}>
              <ClipListTabs />
            </ClipProvider>
          </Grid>
          <Grid
            display={{ md: "flex", xs: "none" }}
            item
            justifyContent="center"
            md={2}
            xl={1}
            zeroMinWidth
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

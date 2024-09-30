"use client"
import { Box, CircularProgress, Divider, Grid } from "@mui/material"

import StreamersPageHeader from "./_Component/molecules/streamersPageHeader"

export default function Loading() {
  const searchText = ""
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSearchTextChange = () => {}
  const channelNum = 0

  return (
    <>
      <Grid
        container
        justifyContent="center"
        paddingX={{ lg: 15, md: 5, xl: 20, xs: 0 }}
      >
        <Grid item md={9} xs={12}>
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
          <Box key={0} sx={{ display: "flex", justifyContent: "center", m: 5 }}>
            <CircularProgress color="secondary" />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

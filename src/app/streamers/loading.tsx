"use client"
import { Box, CircularProgress, Divider, Grid } from "@mui/material"

import StreamersPageHeader from "./_Component/molecules/streamersPageHeader"

export default function Loading() {
  const searchText = ""
  const handleSearchTextChange = () => { }
  const channelNum = 0

  return (
    <>
      <Grid
        container
        justifyContent="center"
        paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
      >
        <Grid item xs={12} md={9}>
          <StreamersPageHeader
            searchText={searchText}
            handleSearchTextChange={handleSearchTextChange}
            channelNum={channelNum}
          />
          <Divider
            sx={{
              marginX: { xs: 0, sm: 1 },
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

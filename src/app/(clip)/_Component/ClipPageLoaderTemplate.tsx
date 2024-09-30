import { Box, CircularProgress, Grid, Stack, Tab, Tabs } from "@mui/material"

export default function ClipPageLoaderTemplate() {
  const tabNameList = [
    "day", //
    "week",
    "month",
    "year",
    "all",
  ]

  return (
    <Grid
      container
      justifyContent="center"
      paddingX={{ lg: 15, md: 5, xl: 20, xs: 0 }}
    >
      <Grid item md={9} xs={12} zeroMinWidth>
        <Stack direction="column" spacing={0.1} sx={{ minWidth: 0 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              zIndex: 1200,
            }}
          >
            <Tabs
              indicatorColor="secondary"
              scrollButtons={true}
              textColor="secondary"
              value={0}
              variant="scrollable"
            >
              {tabNameList.map((e, index) => (
                <Tab key={index} label={e} value={index} />
              ))}
            </Tabs>
          </Box>
          <Box
            key={0}
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 5,
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}

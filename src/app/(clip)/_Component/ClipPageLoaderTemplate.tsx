import { Box, CircularProgress, Grid, Stack, Tab, Tabs } from '@mui/material'

export default function ClipPageLoaderTemplate() {
  const tabNameList = [
    `day`, //
    `week`,
    `month`,
    `year`,
    `all`
  ]

  return (
    <Grid
      container
      justifyContent='center'
      paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
    >
      <Grid item zeroMinWidth xs={12} md={9}>
        <Stack direction='column' spacing={0.1} sx={{ minWidth: 0 }}>
          <Box
            sx={{
              zIndex: 1200,
              borderBottom: 1,
              borderColor: `divider`,
              justifyContent: `center`,
              display: `flex`
            }}
          >
            <Tabs
              value={0}
              textColor='secondary'
              indicatorColor='secondary'
              variant='scrollable'
              scrollButtons={true}
            >
              {tabNameList.map((e, index) => (
                <Tab key={index} label={e} value={index} />
              ))}
            </Tabs>
          </Box>
          <Box
            key={0}
            sx={{
              display: `flex`,
              justifyContent: `center`,
              p: 5
            }}
          >
            <CircularProgress color='secondary' />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}

import { Grid } from "@mui/material"

import VerticalAdvertisement from "@/components/adsense/verticalAdvertisement"
import { ClipListView } from "@/components/data-display"
import { ClipProvider } from "@/contexts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"

export function Home(props: {
  clipDoc: ClipDoc
  setClickedClip: (clip: Clip) => void
}) {
  const { clipDoc, setClickedClip } = props
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item zeroMinWidth xs={12} md={8}>
        <ClipProvider clipDoc={clipDoc} setClipUrl={setClickedClip}>
          <ClipListView />
        </ClipProvider>
      </Grid>
      <Grid
        item
        zeroMinWidth
        md={2}
        xl={1}
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
      >
        <VerticalAdvertisement />
        {/* <AdmaxPCSideCard /> */}
      </Grid>
    </Grid>
  )
}

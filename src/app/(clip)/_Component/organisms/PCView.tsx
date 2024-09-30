import { BorderPaper } from "@/components/styledui"
import { Clip } from "@/models/clip"
import { Grid, Stack } from "@mui/material"

import { ClipDoc } from "../../../../models/clipDoc"
import Player from "../atoms/common/player"
import ClipInfo from "../molecules/common/clipInfo"
import { StreamerInfo } from "../molecules/common/streamerInfo"
import SideClipCard from "../molecules/PC/sideClipCard"

export function PCView(props: {
  clipDoc: ClipDoc
  currentClip: Clip
  setClickedClip: (clip: Clip | undefined) => void
}) {
  const { clipDoc, currentClip, setClickedClip } = props

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={8}>
        <Stack
          direction="column"
          spacing={1}
          sx={{ marginTop: 3, minWidth: 0 }}
        >
          <BorderPaper>
            <Player embed_url={currentClip.embed_url} />
          </BorderPaper>
          <ClipInfo
            title={currentClip.title}
            view_count={currentClip.view_count}
          />
          <StreamerInfo clip={currentClip} />
        </Stack>
      </Grid>
      <Grid item xs={2} zeroMinWidth>
        <SideClipCard clipDoc={clipDoc} setClickedClipUrl={setClickedClip} />
      </Grid>
    </Grid>
  )
}

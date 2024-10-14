import { ClipListTabs } from "@/components/data-display"
import { BorderPaper } from "@/components/styledui"
import { ClipProvider } from "@/contexts"
import { Clip } from "@/models/clip"
import { Grid, Stack } from "@mui/material"

import { ClipDoc } from "../../../../models/clipDoc"
import Player from "../atoms/common/player"
import ClipInfo from "../molecules/common/clipInfo"
import { StreamerInfo } from "../molecules/common/streamerInfo"

export function MobileView(props: {
  clipDoc: ClipDoc
  currentClip: Clip
  setClickedClip: (clip: Clip) => void
}) {
  const { clipDoc, currentClip, setClickedClip } = props

  return (
    <Grid columnSpacing={4} container justifyContent="center" paddingX={0}>
      <Grid item xs={12} zeroMinWidth>
        <Stack direction="column" spacing={1} sx={{ minWidth: 0 }}>
          <BorderPaper
            sx={{
              marginTop: 0,
              position: "sticky",
              top: 0,
              zIndex: 1202,
            }}
          >
            <Player embed_url={currentClip.embed_url} />
          </BorderPaper>
          <ClipInfo
            title={currentClip.title}
            view_count={currentClip.view_count}
          />
          <StreamerInfo clip={currentClip} />

          <ClipProvider clipDoc={clipDoc} setClipUrl={setClickedClip}>
            <ClipListTabs />
          </ClipProvider>
        </Stack>
      </Grid>
    </Grid>
  )
}

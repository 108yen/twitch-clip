import { event } from "@/components/googleAnalytics/gtag"
import { BorderSelect } from "@/components/styledui"
import { Clip } from "@/models/clip"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import {
  Divider,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import { useMemo, useState } from "react"

import { ClipDoc } from "../../../../../models/clipDoc"
import getTabNameList from "../../utils/getTabNameList"
import CardList from "./cardList"

export default function SideClipCard(props: {
  clipDoc: ClipDoc
  setClickedClipUrl: (clip: Clip | undefined) => void
}) {
  const { clipDoc, setClickedClipUrl } = props

  const tabNameList = useMemo(() => getTabNameList(clipDoc), [clipDoc])
  //tab index
  const [tab, setTab] = useState(0)
  const currentTabName = tabNameList[tab]
  const currentClips = clipDoc[currentTabName] as Array<Clip>

  //to infinite scroller
  const [viewItemNum, setViewItemNum] = useState(7)
  const [hasMore, setHasMore] = useState(true)

  function loadAll() {
    setHasMore(false)
  }

  function incrementViewItemNum() {
    setViewItemNum(viewItemNum + 1)
  }

  function resetState() {
    setHasMore(true)
    setViewItemNum(7)
  }

  function handleTabChange(event: SelectChangeEvent<unknown>) {
    resetState()
    setTab(event.target.value as number)
  }

  return (
    <Stack direction="column" flexGrow={1} overflow="hidden">
      <Stack alignItems="end" direction="row" justifyContent="space-between">
        <Tooltip followCursor placement="top" title="リスト表示にもどる">
          <Stack
            alignItems="center"
            color="grey"
            direction="row"
            justifyContent="flex-start"
            onClick={() => {
              setClickedClipUrl(undefined)
              event("click", {
                label: "click_return_to_list_view",
              })
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            <ChevronLeftIcon />
            <Typography variant="subtitle1">clips</Typography>
          </Stack>
        </Tooltip>
        <BorderSelect
          onChange={handleTabChange}
          size="small"
          sx={{ marginBottom: 2 }}
          value={tab}
        >
          {tabNameList.map((e, index) => (
            <MenuItem key={index} value={index}>
              {e}
            </MenuItem>
          ))}
        </BorderSelect>
      </Stack>
      <Divider />
      <CardList
        clips={currentClips}
        hasMore={hasMore}
        incrementViewItemNum={incrementViewItemNum}
        loadAll={loadAll}
        setClickedClipUrl={setClickedClipUrl}
        tab={currentTabName}
        viewItemNum={viewItemNum}
      />
    </Stack>
  )
}

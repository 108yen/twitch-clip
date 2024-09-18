import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import {
  Divider,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography
} from "@mui/material"
import { useMemo, useState } from "react"

import { ClipDoc } from "../../../../../models/clipDoc"
import getTabNameList from "../../utils/getTabNameList"
import CardList from "./cardList"
import { event } from "@/components/googleAnalytics/gtag"
import { BorderSelect } from "@/components/styledui"
import { Clip } from "@/models/clip"



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
    <Stack direction="column" overflow="hidden" flexGrow={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="end">
        <Tooltip followCursor placement="top" title="リスト表示にもどる">
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            color="grey"
            onClick={() => {
              setClickedClipUrl(undefined)
              event("click", {
                label: "click_return_to_list_view"
              })
            }}
            sx={{
              cursor: "pointer"
            }}
          >
            <ChevronLeftIcon />
            <Typography variant="subtitle1">clips</Typography>
          </Stack>
        </Tooltip>
        <BorderSelect
          size="small"
          value={tab}
          onChange={handleTabChange}
          sx={{ marginBottom: 2 }}
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
        hasMore={hasMore}
        viewItemNum={viewItemNum}
        loadAll={loadAll}
        incrementViewItemNum={incrementViewItemNum}
        clips={currentClips}
        tab={currentTabName}
        setClickedClipUrl={setClickedClipUrl}
      />
    </Stack>
  )
}

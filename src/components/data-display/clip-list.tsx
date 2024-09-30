import { Box, InfiniteScrollArea, Loading, Text } from "@yamada-ui/react"
import { useMemo, useState } from "react"
import { InlineAD } from "@/components/adsense"
import { ClipCard } from "@/components/data-display"
import { Clip } from "@/models/clip"

const START_INDEX = 6
const LOAD_INDEX = 2

type ClipListProps = {
  clips: Clip[]
  tab: string
  setClickedClipUrl?: (clip: Clip) => void
}

export function ClipList({ clips, tab, setClickedClipUrl }: ClipListProps) {
  const [count, setCount] = useState<number>(START_INDEX)

  const filteredClips = useMemo(
    () =>
      clips.slice(0, count).map((clip, index) =>
        index == 10 ? (
          <Box key={index}>
            <InlineAD />
            <ClipCard
              clip={clip}
              tab={tab}
              setClickedClipUrl={setClickedClipUrl}
            />
          </Box>
        ) : (
          <ClipCard
            key={index}
            clip={clip}
            tab={tab}
            setClickedClipUrl={setClickedClipUrl}
          />
        ),
      ),
    [clips, count, setClickedClipUrl, tab],
  )

  return (
    <InfiniteScrollArea
      marginY="md"
      gap={{ base: "md", sm: "sm" }}
      onLoad={({ index, finish }) => {
        setCount((prev) => prev + LOAD_INDEX)

        if (index * LOAD_INDEX + 6 >= 100) {
          finish()
        }
      }}
      loading={<Loading fontSize="2xl" />}
      finish={<Text>no more clips</Text>}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

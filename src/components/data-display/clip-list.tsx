import { InlineAD } from "@/components/adsense"
import { ClipCard } from "@/components/data-display"
import { Clip } from "@/models/clip"
import { Box, InfiniteScrollArea, Loading, Text } from "@yamada-ui/react"
import { useMemo, useState } from "react"

const START_INDEX = 6
const LOAD_INDEX = 2

type ClipListProps = {
  clips: Clip[]
  setClickedClipUrl?: (clip: Clip) => void
  tab: string
}

export function ClipList({ clips, setClickedClipUrl, tab }: ClipListProps) {
  const [count, setCount] = useState<number>(START_INDEX)

  const filteredClips = useMemo(
    () =>
      clips.slice(0, count).map((clip, index) =>
        index == 10 ? (
          <Box key={index}>
            <InlineAD />
            <ClipCard
              clip={clip}
              setClickedClipUrl={setClickedClipUrl}
              tab={tab}
            />
          </Box>
        ) : (
          <ClipCard
            clip={clip}
            key={index}
            setClickedClipUrl={setClickedClipUrl}
            tab={tab}
          />
        ),
      ),
    [clips, count, setClickedClipUrl, tab],
  )

  return (
    <InfiniteScrollArea
      finish={<Text>no more clips</Text>}
      gap={{ base: "md", sm: "sm" }}
      loading={<Loading fontSize="2xl" />}
      marginY="md"
      onLoad={({ finish, index }) => {
        setCount((prev) => prev + LOAD_INDEX)

        if (index * LOAD_INDEX + 6 >= 100) {
          finish()
        }
      }}
    >
      {filteredClips}
    </InfiniteScrollArea>
  )
}

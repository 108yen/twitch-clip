import { InfiniteScrollArea, Loading, Text } from "@yamada-ui/react"
import { useMemo, useState } from "react"
import { ClipCard } from "@/components/data-display"
import { Clip } from "@/models/clip"

const START_INDEX = 6
const LOAD_INDEX = 2

type ClipListProps = {
  clips: Clip[]
  tab: string
  setClickedClipUrl: (clip: Clip) => void
}

export function ClipList({ clips, tab, setClickedClipUrl }: ClipListProps) {
  const [count, setCount] = useState<number>(START_INDEX)

  const filteredClips = useMemo(
    () =>
      clips
        .slice(0, count)
        .map((clip, index) => (
          <ClipCard
            key={index}
            clip={clip}
            tab={tab}
            setClickedClipUrl={setClickedClipUrl}
          />
        )),
    [clips, count, setClickedClipUrl, tab],
  )

  return (
    <InfiniteScrollArea
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

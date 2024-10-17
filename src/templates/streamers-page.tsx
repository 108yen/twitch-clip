"use client"
import { ChannelCard } from "@/components/data-display"
import { SearchChannel } from "@/components/form"
import { ClipListLayout } from "@/layouts"
import { Streamer } from "@/models/streamer"
import { VStack } from "@yamada-ui/react"
import { useMemo, useState } from "react"

interface StreamersProps {
  streamers: Streamer[]
}

export function Streamers({ streamers }: StreamersProps) {
  const [text, setText] = useState("")

  const filteredChannels = useMemo(
    () =>
      streamers.filter(
        (streamer) =>
          streamer.display_name?.includes(text) ||
          streamer.login?.includes(text),
      ),
    [streamers, text],
  )

  return (
    <ClipListLayout>
      <VStack gap="md">
        <SearchChannel num={filteredChannels.length} onChange={setText} />

        {filteredChannels.map((streamer, index) => (
          <ChannelCard key={index} streamer={streamer} />
        ))}
      </VStack>
    </ClipListLayout>
  )
}

"use client"
import { ChannelCard } from "@/components/data-display"
import { SearchChannel } from "@/components/form"
import { AppLayout } from "@/layouts"
import { Streamer } from "@/models/streamer"
import { VStack } from "@yamada-ui/react"
import { useDeferredValue, useMemo, useState } from "react"

interface StreamersProps {
  streamers: Streamer[]
}

export function Streamers({ streamers }: StreamersProps) {
  const [text, setText] = useState("")
  const deferredText = useDeferredValue(text)

  const filteredChannels = useMemo(
    () =>
      streamers.filter(
        (streamer) =>
          streamer.display_name?.includes(deferredText) ||
          streamer.login?.includes(deferredText),
      ),
    [streamers, deferredText],
  )

  return (
    <AppLayout>
      <VStack gap="md">
        <SearchChannel num={filteredChannels.length} onChange={setText} />

        {filteredChannels.map((streamer, index) => (
          <ChannelCard key={index} streamer={streamer} />
        ))}
      </VStack>
    </AppLayout>
  )
}

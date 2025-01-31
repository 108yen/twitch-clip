"use client"
import { Streamer } from "@/models/streamer"
import { ChannelCard } from "@/ui/components/data-display"
import { SearchChannels } from "@/ui/components/form"
import { AppLayout } from "@/ui/layouts"
import { TwitchIcon } from "@yamada-ui/lucide"
import { EmptyState, VStack } from "@yamada-ui/react"
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
        <SearchChannels num={filteredChannels.length} onChange={setText} />

        {filteredChannels.length == 0 ? (
          <EmptyState
            description="No channels were found in the search"
            indicator={<TwitchIcon />}
            size="lg"
            title="No channels"
          />
        ) : null}

        {filteredChannels.map((streamer, index) => (
          <ChannelCard key={index} streamer={streamer} />
        ))}
      </VStack>
    </AppLayout>
  )
}

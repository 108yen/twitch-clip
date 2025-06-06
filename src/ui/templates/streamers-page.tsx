"use client"
import { Streamer } from "@/models/streamer"
import { ChannelCard } from "@/ui/components/data-display"
import { SearchChannels } from "@/ui/components/form"
import { AppLayout } from "@/ui/layouts"
import { TwitchIcon } from "@yamada-ui/lucide"
import { EmptyState, VStack } from "@yamada-ui/react"
import { useSearchParams } from "next/navigation"
import { useDeferredValue, useMemo, useState } from "react"
import { PageHeader } from "../components/layouts"

function streamerFilter(text: string) {
  return function ({ display_name, login, teams }: Streamer) {
    if (display_name?.includes(text)) return true
    if (login?.includes(text)) return true

    if (teams?.some(({ display_name }) => display_name?.includes(text)))
      return true
    if (teams?.some(({ name }) => name?.includes(text))) return true

    return false
  }
}
interface StreamersProps {
  streamers: Streamer[]
}

export function Streamers({ streamers }: StreamersProps) {
  const searchParams = useSearchParams()

  const [text, setText] = useState(searchParams.get("text") ?? "")
  const deferredText = useDeferredValue(text)

  const filteredChannels = useMemo(
    () => streamers.filter(streamerFilter(deferredText)),
    [streamers, deferredText],
  )

  return (
    <AppLayout>
      <PageHeader title="Channels" />

      <VStack gap="md">
        <SearchChannels
          num={filteredChannels.length}
          onChange={setText}
          value={text}
        />

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

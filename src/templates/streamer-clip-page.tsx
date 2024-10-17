"use client"

import { ClipListTabs, StreamerCard } from "@/components/data-display"
import { MobileView, PCView } from "@/components/layouts"
import { ClipProvider } from "@/contexts"
import { ClipListLayout } from "@/layouts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { splitClipDoc } from "@/utils/clip"
import { Tab, Tabs, VStack } from "@yamada-ui/react"
import { useMemo, useState } from "react"

interface StreamerClipPageProps {
  clipDoc: ClipDoc
}

export function StreamerClipPage({ clipDoc }: StreamerClipPageProps) {
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()
  const [index, onChange] = useState(0)

  const streamer = clipDoc.streamerInfo
  const width = window.innerWidth

  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }

  const [trend, history] = useMemo(() => splitClipDoc(clipDoc), [clipDoc])

  return (
    <ClipProvider
      clipDoc={index ? history : trend}
      currentClip={currentClip}
      setClipUrl={handleSetClip}
    >
      {currentClip === undefined ? (
        <ClipListLayout>
          <VStack gap="md" mt="md" overflow="hidden">
            <StreamerCard streamer={streamer!} />

            <Tabs
              color={["blackAlpha.600", "whiteAlpha.600"]}
              colorScheme="neutral"
              index={index}
              onChange={onChange}
              w="fit-content"
            >
              <Tab value="trend">Trend</Tab>
              <Tab value="history">History</Tab>
            </Tabs>

            <ClipListTabs />
          </VStack>
        </ClipListLayout>
      ) : width < 600 ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

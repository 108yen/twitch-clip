"use client"

import { ClipProvider } from "@/contexts"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { ClipListTabs, StreamerCard } from "@/ui/components/data-display"
import { MobileView, PCView } from "@/ui/components/layouts"
import { AppLayout } from "@/ui/layouts"
import { splitClipDoc } from "@/utils/clip"
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  useBreakpoint,
  VStack,
} from "@yamada-ui/react"
import { useMemo, useState } from "react"

interface StreamerClipPageProps {
  clipDoc: ClipDoc
}

export function StreamerClipPage({ clipDoc }: StreamerClipPageProps) {
  const [currentClip, setCurrentClip] = useState<Clip | undefined>()
  const [index, onChange] = useState(0)
  const breakpoint = useBreakpoint()

  const [trend, history] = useMemo(() => splitClipDoc(clipDoc), [clipDoc])

  const streamer = clipDoc.streamerInfo

  function handleSetClip(clip: Clip | undefined) {
    setCurrentClip(clip)
  }

  return (
    <ClipProvider
      clipDoc={index ? history : trend}
      currentClip={currentClip}
      setClipUrl={handleSetClip}
    >
      {currentClip === undefined ? (
        <AppLayout>
          <VStack gap="md" mt="md" w="full">
            <StreamerCard streamer={streamer!} />

            <Tabs colorScheme="neutral" index={index} onChange={onChange}>
              <TabList
                color={["blackAlpha.600", "whiteAlpha.600"]}
                w="fit-content"
              >
                <Tab value="trend">Trend</Tab>
                <Tab value="history">History</Tab>
              </TabList>

              <TabPanel paddingX={0} paddingY="md">
                <ClipListTabs />
              </TabPanel>
              <TabPanel paddingX={0} paddingY="md">
                <ClipListTabs />
              </TabPanel>
            </Tabs>
          </VStack>
        </AppLayout>
      ) : breakpoint == "sm" ? (
        <MobileView />
      ) : (
        <PCView />
      )}
    </ClipProvider>
  )
}

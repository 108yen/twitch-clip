"use client"
import { isArray, Tab, TabList, TabPanel, Tabs } from "@yamada-ui/react"
import { useMemo, useState } from "react"
import { ClipList } from "@/components/data-display"
import { useClip } from "@/contexts"
import { getTabs } from "@/utils/clip"

interface ClipListViewProps {
  isSticky?: boolean
}

export function ClipListView({ isSticky }: ClipListViewProps) {
  const { clipDoc, setClipUrl } = useClip()
  const [index, onChange] = useState(0)

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  //TODO: sticky
  // const tabStyles = useMemo(
  //   () =>
  //     isSticky ? { position: "sticky", top: (window.innerWidth * 9) / 16 } : {},
  //   [isSticky],
  // )

  return (
    <>
      <Tabs
        index={index}
        onChange={(index) => onChange(index)}
        align="center"
        colorScheme="secondary"
      >
        <TabList>
          {/* <TabList {...tabStyles}> */}
          {tabs.map((tab) => (
            <Tab
              key={tab}
              fontSize="sm"
              p={3}
              w="4xs"
              _selected={{
                borderWidth: "2px",
                color: "secondary",
                borderColor: "currentColor",
              }}
            >
              {tab.toUpperCase()}
            </Tab>
          ))}
        </TabList>

        {tabs.map((tab) => {
          const clips = clipDoc?.[tab]

          if (!isArray(clips)) return

          return (
            <TabPanel key={tab} p={0}>
              <ClipList
                key={tab}
                clips={clips}
                tab={tab}
                setClickedClipUrl={setClipUrl}
              />
            </TabPanel>
          )
        })}
      </Tabs>

      {/* <Carousel
        index={index}
        withControls={false}
        withIndicators={false}
        draggable={false}
        h="full"
      >
        {tabs.map((tab) => {
          const clips = clipDoc?.[tab]

          if (!isArray(clips)) return

          return (
            <CarouselSlide key={tab}>
              <ClipList
                key={tab}
                clips={clips}
                tab={tab}
                setClickedClipUrl={setClipUrl}
              />
            </CarouselSlide>
          )
        })}
      </Carousel> */}
    </>
  )
}

"use client"
import { ClipList } from "@/components/data-display"
import { useClip } from "@/contexts"
import { getTabs } from "@/utils/clip"
import { isArray, Tab, TabList, TabPanel, Tabs } from "@yamada-ui/react"
import { useMemo, useState } from "react"

// interface ClipListViewProps {
//   isSticky?: boolean
// }

export function ClipListTabs() {
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
        align="center"
        colorScheme="secondary"
        index={index}
        onChange={(index) => onChange(index)}
      >
        <TabList>
          {/* <TabList {...tabStyles}> */}
          {tabs.map((tab) => (
            <Tab
              _selected={{
                borderColor: "currentColor",
                borderWidth: "2px",
                color: "secondary",
              }}
              fontSize="sm"
              key={tab}
              p={3}
              w="4xs"
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
                clips={clips}
                key={tab}
                setClickedClipUrl={setClipUrl}
                tab={tab}
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

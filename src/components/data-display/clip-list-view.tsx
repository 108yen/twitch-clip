"use client"
import { Carousel, CarouselSlide } from "@yamada-ui/carousel"
import { isArray, Tab, Tabs } from "@yamada-ui/react"
import { useMemo, useState } from "react"
import { ClipList } from "@/components/data-display"
import { useClip } from "@/contexts"
import { getTabs } from "@/utils/clip"

export function ClipListView() {
  const { clipDoc, setClipUrl } = useClip()
  const [index, onChange] = useState(0)

  const tabs = useMemo(() => getTabs(clipDoc), [clipDoc])

  return (
    <>
      <Tabs
        index={index}
        onChange={(index) => {
          console.log(index)
          onChange(index)
        }}
        align="center"
        colorScheme="secondary"
      >
        {tabs.map((tab) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </Tabs>

      <Carousel
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
      </Carousel>
    </>
  )
}

"use client"
import { TabsProps, useWindowEvent, VStack } from "@yamada-ui/react"
import { useMemo, useRef, useState } from "react"
import { useClip } from "@/contexts"
import { useScrollY } from "@/hooks"
import { ClipInfo, ClipListTabs, Player, StreamerInfo } from "../data-display"

export function MobileView() {
  const tabsRef = useRef<HTMLDivElement>(undefined)
  const { currentClip } = useClip()
  const y = useScrollY()
  const [width, setWidth] = useState(window?.innerWidth ?? 0)

  const { height = 0 } = tabsRef.current?.getBoundingClientRect() ?? {}
  const isScroll = y > height

  const tabsProps: TabsProps = useMemo(
    () => ({
      backdropBlur: "50px",
      backdropFilter: "auto",
      bg: isScroll ? ["whiteAlpha.700", "blackAlpha.700"] : undefined,
      carouselProps: {
        px: "xs",
      },
      position: "sticky",
      ref: tabsRef,
      shadow: isScroll ? ["base", "dark-sm"] : undefined,
      top: (width * 9) / 16,
      zIndex: "guldo",
    }),
    [isScroll, width],
  )

  useWindowEvent("resize", () => setWidth(window?.innerWidth))

  return (
    <VStack as="main" gap={1}>
      <Player
        embedUrl={currentClip?.embed_url}
        position="sticky"
        top={0}
        zIndex="jeice"
      />

      <ClipInfo />

      <StreamerInfo />

      <ClipListTabs {...tabsProps} />
    </VStack>
  )
}

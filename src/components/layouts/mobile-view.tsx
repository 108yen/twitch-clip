"use client"
import { ClipInfo, ClipListTabs, StreamerInfo } from "@/components/data-display"
import { useClip } from "@/contexts"
import { useScrollY } from "@/hooks"
import {
  AspectRatio,
  TabsProps,
  useWindowEvent,
  VStack,
} from "@yamada-ui/react"
import { useMemo, useRef, useState } from "react"

export function MobileView() {
  const tabsRef = useRef<HTMLDivElement>()
  const { currentClip } = useClip()
  const y = useScrollY()
  const [width, setWidth] = useState(window.innerWidth ?? 0)

  const { height = 0 } = tabsRef.current?.getBoundingClientRect() ?? {}
  const isScroll = y > height

  const tabsProps: TabsProps = useMemo(
    () => ({
      backdropBlur: "50px",
      backdropFilter: "auto",
      bg: isScroll ? ["whiteAlpha.700", "blackAlpha.700"] : undefined,
      position: "sticky",
      ref: tabsRef,
      shadow: isScroll ? ["base", "dark-sm"] : undefined,
      top: (width * 9) / 16,
      zIndex: "guldo",
    }),
    [isScroll, width],
  )

  useWindowEvent("resize", () => setWidth(window.innerWidth))

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <VStack gap={1}>
      <AspectRatio
        apply="layoutStyles.borderCard"
        position="sticky"
        ratio={16 / 9}
        top={0}
        w="full"
        zIndex="jeice"
      >
        <iframe allowFullScreen loading="lazy" src={src} />
      </AspectRatio>

      <ClipInfo />

      <StreamerInfo />

      <ClipListTabs tabsProps={tabsProps} />
    </VStack>
  )
}

"use client"
import { ClipInfo, ClipListTabs, StreamerInfo } from "@/components/data-display"
import { useClip } from "@/contexts"
import { useScrollY } from "@/hooks"
import {
  AspectRatio,
  Box,
  Skeleton,
  TabsProps,
  useBoolean,
  useWindowEvent,
  VStack,
} from "@yamada-ui/react"
import { useEffect, useMemo, useRef, useState } from "react"

export function MobileView() {
  const tabsRef = useRef<HTMLDivElement>()
  const { currentClip } = useClip()
  const y = useScrollY()
  const [width, setWidth] = useState(window?.innerWidth ?? 0)
  const [isMounted, { off, on }] = useBoolean()

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

  useWindowEvent("resize", () => setWidth(window?.innerWidth))

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  useEffect(off, [off, src])

  return (
    <VStack gap={1}>
      <Box position="sticky" top={0} zIndex="jeice">
        <Skeleton isFitContent isLoaded={isMounted} w="full">
          <AspectRatio apply="layoutStyles.borderCard" ratio={16 / 9} w="full">
            <iframe allowFullScreen loading="lazy" onLoad={on} src={src} />
          </AspectRatio>
        </Skeleton>
      </Box>

      <ClipInfo />

      <StreamerInfo />

      <ClipListTabs tabsProps={tabsProps} />
    </VStack>
  )
}

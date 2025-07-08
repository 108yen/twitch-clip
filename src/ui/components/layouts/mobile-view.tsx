"use client"
import { TabsProps, VStack } from "@yamada-ui/react"
import { useMemo, useRef } from "react"
import { CONSTANT } from "@/constant"
import { useClip } from "@/contexts"
import { useSubscribeEvent } from "@/hooks"
import { ClipInfo, ClipListTabs, Player, StreamerInfo } from "../data-display"

export function MobileView() {
  const tabsRef = useRef<HTMLDivElement>(undefined)
  const { currentClip } = useClip()

  const stickyPoint = useSubscribeEvent<number>(
    "resize",
    () => (window?.innerWidth ?? 0) * CONSTANT.ASPECT_RATIO.Full_HD,
    () => 0,
  )
  const sticky = useSubscribeEvent<boolean>(
    "scroll",
    () =>
      Math.abs(
        (tabsRef.current?.getBoundingClientRect().top ?? 0) - stickyPoint,
      ) <= 0.01,
    () => false,
  )

  const tabsProps: TabsProps = useMemo(
    () => ({
      backdropBlur: "50px",
      backdropFilter: "auto",
      bg: sticky ? ["whiteAlpha.700", "blackAlpha.700"] : undefined,
      carouselProps: {
        px: "xs",
      },
      position: "sticky",
      ref: tabsRef,
      shadow: sticky ? ["base", "dark-sm"] : undefined,
      top: stickyPoint,
      transitionDuration: "slower",
      transitionProperty: "common",
      zIndex: "guldo",
    }),
    [sticky, stickyPoint],
  )

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

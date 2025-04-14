"use client"
import { useClip } from "@/contexts"
import { Grid, GridItem, VStack } from "@yamada-ui/react"

import { ClipInfo, Player, SideClipTabs, StreamerInfo } from "../data-display"

export function PCView() {
  const { currentClip } = useClip()

  return (
    <Grid
      gap={{ "2xl": "xl", base: "3xl", xl: "lg" }}
      marginX={{ "2xl": "xl", base: "3xl", xl: "lg" }}
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={9} w="full">
        <VStack gap={2} marginTop="md">
          <Player embedUrl={currentClip?.embed_url} />

          <ClipInfo />

          <StreamerInfo />
        </VStack>
      </GridItem>

      <GridItem colSpan={3} w="full">
        <SideClipTabs />
      </GridItem>
    </Grid>
  )
}

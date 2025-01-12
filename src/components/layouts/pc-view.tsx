"use client"
import { ClipInfo, SideClipTabs, StreamerInfo } from "@/components/data-display"
import { useClip } from "@/contexts"
import { AspectRatio, Grid, GridItem, VStack } from "@yamada-ui/react"

export function PCView() {
  const { currentClip } = useClip()

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <Grid
      gap={{ "2xl": "xl", base: "3xl", xl: "lg" }}
      marginX={{ "2xl": "xl", base: "3xl", xl: "lg" }}
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={9} w="full">
        <VStack gap={2} marginTop="md">
          <AspectRatio layerStyle="player" ratio={16 / 9} w="full">
            <iframe allowFullScreen loading="lazy" src={src} />
          </AspectRatio>

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

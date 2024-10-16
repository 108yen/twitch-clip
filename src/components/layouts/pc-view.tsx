"use client"
import { SideClipTabs } from "@/components/data-display"
import { useClip } from "@/contexts"
import {
  AspectRatio,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@yamada-ui/react"

// TODO: refactor styles
export function PCView() {
  const { currentClip } = useClip()

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <Grid gap="3xl" marginX="3xl" templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={9} w="full">
        <VStack gap={1} marginTop="md">
          <AspectRatio apply="layoutStyles.borderCard" ratio={16 / 9} w="full">
            <iframe allowFullScreen loading="lazy" src={src} />
          </AspectRatio>

          <HStack overflow="hidden" w="full">
            <Text>{currentClip?.title}</Text>

            <Text>{`${currentClip?.view_count?.toLocaleString()} views`}</Text>
          </HStack>
        </VStack>
      </GridItem>

      <GridItem colSpan={3} w="full">
        <SideClipTabs />
      </GridItem>
    </Grid>
  )
}

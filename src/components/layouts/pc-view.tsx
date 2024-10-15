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

export function PCView() {
  const { currentClip } = useClip()

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <Grid templateColumns="repeat(10, 1fr)" w="full">
      <GridItem colSpan={8}>
        <HStack gap={1}>
          <AspectRatio
            allowFullScreen
            apply="layoutStyles.borderCard"
            as="iframe"
            loading="lazy"
            ratio={16 / 9}
            src={src}
            w="full"
          />

          <VStack overflow="hidden" w="full">
            <Text>{currentClip?.title}</Text>

            <Text>{`${currentClip?.view_count?.toLocaleString()} views`}</Text>
          </VStack>
        </HStack>
      </GridItem>

      <GridItem colSpan={2}>
        <SideClipTabs />
      </GridItem>
    </Grid>
  )
}

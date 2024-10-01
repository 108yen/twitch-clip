"use client"
import { useClip } from "@/contexts"
import {
  AspectRatio,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
} from "@yamada-ui/react"

export function PCView() {
  const { currentClip } = useClip()

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <Grid w="full" templateColumns="repeat(10, 1fr)">
      <GridItem colSpan={8}>
        <HStack gap={1}>
          <AspectRatio
            as="iframe"
            apply="layoutStyles.borderCard"
            w="full"
            ratio={16 / 9}
            allowFullScreen
            loading="lazy"
            src={src}
          />

          <VStack w="full" overflow="hidden">
            <Text>{currentClip?.title}</Text>

            <Text>{`${currentClip?.view_count?.toLocaleString()} views`}</Text>
          </VStack>
        </HStack>
      </GridItem>

      {/* TODO: side-clip-card */}
      <GridItem colSpan={2}></GridItem>
    </Grid>
  )
}

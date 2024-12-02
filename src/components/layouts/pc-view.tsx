"use client"
import { SideClipTabs, StreamerInfo } from "@/components/data-display"
import { useClip } from "@/contexts"
import {
  AspectRatio,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@yamada-ui/react"

export function PCView() {
  const { currentClip } = useClip()

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <Grid
      gap={{ base: "3xl", xl: "lg" }}
      marginX={{ base: "3xl", xl: "lg" }}
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={9} w="full">
        <VStack gap={2} marginTop="md">
          <AspectRatio apply="layoutStyles.player" ratio={16 / 9} w="full">
            <iframe allowFullScreen loading="lazy" src={src} />
          </AspectRatio>

          <HStack overflow="hidden" w="full">
            <Heading as="h2" isTruncated size="md">
              {currentClip?.title}
            </Heading>

            <Spacer />

            <Text textStyle="viewCount">{`${currentClip?.view_count?.toLocaleString()} views`}</Text>
          </HStack>

          <StreamerInfo />
        </VStack>
      </GridItem>

      <GridItem colSpan={3} w="full">
        <SideClipTabs />
      </GridItem>
    </Grid>
  )
}

"use client"
import { useClip } from "@/contexts"
import { Heading, HStack, Spacer, Text } from "@yamada-ui/react"

import { FavoriteButton } from "../form"

export function ClipInfo() {
  const { currentClip } = useClip()

  const { title, view_count } = currentClip!

  return (
    <HStack alignItems="flex-end" overflow="hidden" w="full">
      <Heading fontSize="xl" isTruncated variant="h5">
        {title}
      </Heading>

      <Spacer />

      <Text
        isTruncated
        textStyle="viewCount"
      >{`${view_count?.toLocaleString()} views`}</Text>

      <FavoriteButton clip={currentClip!} />
    </HStack>
  )
}

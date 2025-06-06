"use client"
import { useClip } from "@/contexts"
import { formatDate } from "@/utils/string"
import { Heading, HStack, Spacer, Text } from "@yamada-ui/react"
import { FavoriteButton } from "../form"

export function ClipInfo() {
  const { currentClip, showDate } = useClip()

  const { created_at = "", title, view_count } = currentClip!

  const subText = showDate
    ? formatDate(created_at, true)
    : `${view_count?.toLocaleString()} views`

  return (
    <HStack alignItems="flex-end" gap={0} overflow="hidden" w="full">
      <Heading fontSize="xl" isTruncated variant="h5">
        {title}
      </Heading>

      <FavoriteButton clip={currentClip!} />

      <Spacer />

      <Text
        aria-label={showDate ? "Created at" : "Clip view count"}
        isTruncated
        textStyle="viewCount"
      >
        {subText}
      </Text>
    </HStack>
  )
}

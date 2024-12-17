import { Clip } from "@/models/clip"
import { PaperclipIcon } from "@yamada-ui/lucide"
import { Center, EmptyState, isUndefined, Loading } from "@yamada-ui/react"

import { ClipGrid, ClipListTabs } from "../data-display"

interface FavoriteBodyProps {
  clips: Clip[] | undefined
  isPending: boolean
  width: number
}

export function FavoriteBody({ clips, isPending, width }: FavoriteBodyProps) {
  if (isPending || isUndefined(clips)) {
    return (
      <Center h="3xs" w="full">
        <Loading fontSize="2xl" />
      </Center>
    )
  }

  if (clips.length == 0) {
    return (
      <EmptyState
        description="Add clips to your favorites"
        indicator={<PaperclipIcon />}
        title="Your have no favorite clip"
      />
    )
  }

  if (width < 600) {
    return <ClipListTabs />
  }

  return <ClipGrid />
}

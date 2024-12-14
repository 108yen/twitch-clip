"use client"

import { usePage } from "@/contexts"
import { Clip } from "@/models/clip"
import { StarIcon } from "@yamada-ui/lucide"
import { IconButton } from "@yamada-ui/react"
import { useTransition } from "react"

interface FavoriteButtonProps {
  clip: Clip
}

export function FavoriteButton({ clip }: FavoriteButtonProps) {
  const { saveClip } = usePage()
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      const { id: clipId } = clip

      if (!clipId) return

      await saveClip(clip)

      return
    })
  }

  return (
    <IconButton
      aria-label="Favorite button"
      colorScheme="primary"
      disabled={isPending}
      fullRounded
      icon={<StarIcon fontSize="lg" />}
      onClick={handleClick}
      size="sm"
      variant="ghost"
    />
  )
}

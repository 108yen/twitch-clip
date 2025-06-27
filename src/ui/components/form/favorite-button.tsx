"use client"

import { StarIcon } from "@yamada-ui/lucide"
import { dataAttr, IconButton, Tooltip } from "@yamada-ui/react"
import { useToggleFavorite } from "@/hooks"
import { Clip } from "@/models/clip"

interface FavoriteButtonProps {
  clip: Clip
}

export function FavoriteButton({ clip }: FavoriteButtonProps) {
  const { favorite, pending, toggle } = useToggleFavorite(clip)

  return (
    <Tooltip label="お気に入りに登録する" placement="top">
      <IconButton
        aria-label="Favorite button"
        colorScheme="primary"
        data-selected={dataAttr(favorite)}
        disabled={pending}
        fullRounded
        icon={
          <StarIcon
            _selected={{ fill: "primary.500" }}
            data-selected={dataAttr(favorite)}
            fontSize="lg"
          />
        }
        onClick={toggle}
        size="sm"
        variant="ghost"
      />
    </Tooltip>
  )
}

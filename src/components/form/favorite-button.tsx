"use client"

import { usePage } from "@/contexts"
import { Clip } from "@/models/clip"
import { StarIcon } from "@yamada-ui/lucide"
import { dataAttr, IconButton } from "@yamada-ui/react"
import { useEffect, useState, useTransition } from "react"

interface FavoriteButtonProps {
  clip: Clip
}

export function FavoriteButton({ clip }: FavoriteButtonProps) {
  const { deleteClip, getClip, saveClip } = usePage()
  const [isPending, startTransition] = useTransition()
  const [check, setCheck] = useState(false)

  useEffect(
    () =>
      startTransition(async () => {
        const { id: clipId } = clip

        if (!clipId) return

        const storedClip = await getClip(clipId)

        if (typeof storedClip != "undefined") {
          setCheck(true)
        } else {
          setCheck(false)
        }
      }),
    [clip, getClip],
  )

  function handleClick() {
    startTransition(async () => {
      const { id: clipId } = clip

      if (!clipId) return

      if (check) {
        await deleteClip(clipId)
        setCheck(false)
      } else {
        await saveClip(clip)
        setCheck(true)
      }

      return
    })
  }

  return (
    <IconButton
      aria-label="Favorite button"
      colorScheme="primary"
      data-selected={dataAttr(check)}
      disabled={isPending}
      fullRounded
      icon={
        <StarIcon
          _selected={{ fill: "primary.500" }}
          data-selected={dataAttr(check)}
          fontSize="lg"
        />
      }
      onClick={handleClick}
      size="sm"
      variant="ghost"
    />
  )
}

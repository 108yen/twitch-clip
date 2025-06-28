import { isUndefined } from "@yamada-ui/react"
import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react"
import { usePage } from "@/contexts"
import { Clip } from "@/models/clip"
import { sendGAEvent } from "@/utils/google-analytics"

export function useToggleFavorite(clip: Clip) {
  const { id: clipId, title } = clip

  const { deleteClip, getClip, saveClip } = usePage()
  const [check, setCheck] = useState(false)
  const [optimisticCheckState, setCheckOptimistic] = useOptimistic<
    boolean,
    boolean
  >(check, (_currentState, optimisticValue) => optimisticValue)

  const [isPending, startTransition] = useTransition()

  const getCheckState = useCallback(async () => {
    if (!clipId) return

    const storedClip = await getClip(clipId)

    setCheck(!isUndefined(storedClip))
  }, [clipId, getClip])

  const toggleCheckState = useCallback(async () => {
    if (!clipId) return

    try {
      setCheckOptimistic(!check)

      if (check) {
        await deleteClip(clipId)
      } else {
        await saveClip(clip)
      }

      setCheck(!check)

      sendGAEvent("event", "click", {
        clip_title: title,
        label: "remove_from_favorite",
      })
    } catch {}

    return
  }, [check, clip, clipId, deleteClip, saveClip, setCheckOptimistic, title])

  useEffect(() => {
    startTransition(getCheckState)

    const channel = new BroadcastChannel("favorite-clips")

    const onMessage = () => {
      startTransition(getCheckState)
    }

    channel.addEventListener("message", onMessage)

    return () => {
      channel.removeEventListener("message", onMessage)
      channel.close()
    }
  }, [getCheckState])

  function toggleFavorite() {
    startTransition(toggleCheckState)
  }

  return {
    favorite: optimisticCheckState,
    pending: isPending,
    toggle: toggleFavorite,
  }
}

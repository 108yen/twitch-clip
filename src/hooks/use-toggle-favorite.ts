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

    if (!isUndefined(storedClip)) {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [clipId, getClip])

  const toggleCheckState = useCallback(async () => {
    if (!clipId) return

    try {
      if (check) {
        setCheckOptimistic(false)

        await deleteClip(clipId)
        setCheck(false)

        sendGAEvent("event", "click", {
          clip_title: title,
          label: "remove_from_favorite",
        })
      } else {
        setCheckOptimistic(true)

        await saveClip(clip)
        setCheck(true)

        sendGAEvent("event", "click", {
          clip_title: title,
          label: "add_to_favorite",
        })
      }
    } catch {
      return
    }

    return
  }, [check, clip, clipId, deleteClip, saveClip, setCheckOptimistic, title])

  useEffect(() => startTransition(getCheckState), [getCheckState])

  function toggleFavorite() {
    startTransition(toggleCheckState)
  }

  return {
    favorite: optimisticCheckState,
    pending: isPending,
    toggle: toggleFavorite,
  }
}

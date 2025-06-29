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

interface ToggleNotification {
  id: string
  type: "toggle-favorite"
}

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
    setCheckOptimistic(!check)

    const bc = new BroadcastChannel("twitch-clip_favorite")

    try {
      if (check) {
        await deleteClip(clipId)
        sendGAEvent("event", "click", {
          clip_title: title,
          label: "remove_from_favorite",
        })
      } else {
        await saveClip(clip)
        sendGAEvent("event", "click", {
          clip_title: title,
          label: "add_to_favorite",
        })
      }

      bc.postMessage({
        id: clipId,
        type: "toggle-favorite",
      })
    } catch {
    } finally {
      bc.close()
    }
  }, [check, clip, clipId, deleteClip, saveClip, setCheckOptimistic, title])

  useEffect(() => {
    const bc = new BroadcastChannel("twitch-clip_favorite")

    function onMessage(ev?: MessageEvent<ToggleNotification>) {
      if (!ev) return

      const { id, type } = ev.data

      if (type == "toggle-favorite" && id == clipId)
        startTransition(getCheckState)
    }

    startTransition(getCheckState)
    bc.onmessage = onMessage

    return () => bc.close()
  }, [clipId, getCheckState])

  return {
    favorite: optimisticCheckState,
    pending: isPending,
    toggle: () => startTransition(toggleCheckState),
  }
}

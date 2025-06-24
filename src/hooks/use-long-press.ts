import { MouseEvent, TouchEvent, useCallback, useRef } from "react"

interface Options {
  onCancel?: (event: MouseEvent | TouchEvent) => void
  onFinish?: (event: MouseEvent | TouchEvent) => void
  onStart?: (event: MouseEvent | TouchEvent) => void
  threshold?: number
}

export function useLongPress<T extends (...args: any[]) => any>(
  callback: T | undefined,
  options: Options = {},
) {
  const { onCancel, onFinish, onStart, threshold = 400 } = options
  const isLongPressActive = useRef(false)
  const isPressed = useRef(false)
  const timerId = useRef<ReturnType<typeof setTimeout>>(undefined)

  const start = useCallback(
    (event: MouseEvent | TouchEvent) => {
      onStart?.(event)

      isPressed.current = true
      timerId.current = setTimeout(() => {
        callback?.(event)
        isLongPressActive.current = true
      }, threshold)
    },
    [callback, onStart, threshold],
  )

  const end = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (isLongPressActive.current) {
        onFinish?.(event)
      } else if (isPressed.current) {
        onCancel?.(event)
      }

      isLongPressActive.current = false
      isPressed.current = false

      if (timerId.current) {
        window.clearTimeout(timerId.current)
      }
    },
    [onCancel, onFinish],
  )

  const mouseHandlers = {
    onMouseDown: start,
    onMouseLeave: end,
    onMouseUp: end,
  }

  const touchHandlers = {
    onTouchEnd: end,
    onTouchStart: start,
  }

  return {
    ...mouseHandlers,
    ...touchHandlers,
  }
}

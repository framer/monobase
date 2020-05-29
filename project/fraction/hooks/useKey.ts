import { useCallback, useEffect, useRef } from "react"

export type KeyboardEventCallback = (event?: KeyboardEvent) => void

export const useKey = (
  key: string,
  callback: KeyboardEventCallback,
  condition: boolean = true
) => {
  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event)
      }
    },
    [key, callback]
  )

  useEffect(() => {
    if (condition) {
      window.addEventListener("keydown", handleKey)
    }

    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [condition])
}

const createKeyHook = (key: string) => (
  callback: KeyboardEventCallback,
  condition?: boolean
) => useKey(key, callback, condition)

export const useEscapeKey = createKeyHook("Escape")

export const useEnterKey = createKeyHook("Enter")

export const useSpaceKey = createKeyHook(" ")

export const useTabKey = createKeyHook("Tab")

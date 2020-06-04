import { useRef } from "react"

export const useConstant = <T>(initialValue: () => T) => {
  const ref = useRef<T | null>(null)

  if (ref.current === null) {
    ref.current = initialValue()
  }

  return ref.current
}

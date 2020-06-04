import { useEffect, useState } from "react"
import { MotionValue } from "framer-motion"

export const useMotionValueState = <T>(
  motionValue: MotionValue<T>,
  condition: (value?: T) => boolean = () => true
) => {
  const [state, setState] = useState<T>(() => motionValue.get())

  useEffect(() => {
    const updateState = (value: T) => {
      if (condition(value)) {
        setState(value)
      }
    }

    setState(motionValue.get())
    const unsubscribeMotionValue = motionValue.onChange(updateState)

    return () => {
      unsubscribeMotionValue()
    }
  }, [])

  return [state, setState]
}

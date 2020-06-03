import { useEffect, useRef } from "react"
import { transform, useMotionValue, MotionValue } from "framer-motion"
import sync from "framesync"
import { dimension } from "fraction"
import {
  useIntersectionEffect,
  IntersectionEffectRef,
} from "./useIntersectionEffect"
import { useObserverValues } from "./useObserver"

export interface IntersectionPercentageOptions {
  orchestration?: "none" | "partial" | "complete"
  orchestrationRepeat?: boolean
  threshold?: [number, number]
}

const defaultOptions: IntersectionPercentageOptions = {
  orchestration: "none",
  orchestrationRepeat: false,
  threshold: [0, 1],
}

export const useIntersectionPercentage = (
  ref: IntersectionEffectRef,
  options: IntersectionPercentageOptions = defaultOptions
): MotionValue<number> => {
  const { scroll, viewportWidth, viewportHeight } = useObserverValues()
  const percentageOptions = useRef<IntersectionPercentageOptions>({
    ...defaultOptions,
    ...options,
  })
  const percentage = useMotionValue(0)

  useIntersectionEffect(ref, ({ boundingClientRect, target }, observer) => {
    let previousPercentage = percentage.get()
    let elementTop = boundingClientRect.y + scroll.get()
    let elementHeight = boundingClientRect.height
    let currentViewportHeight =
      viewportHeight.get() - dimension.navigationHeight

    let unsubscribeScroll = () => {}
    let unsubscribeViewportWidth = () => {}
    let unsubscribeViewportHeight = () => {}

    const onScrollChange = (scroll: number) => {
      sync.update(() => {
        const {
          orchestration,
          orchestrationRepeat,
          threshold,
        } = percentageOptions.current
        const initialPercentage =
          (scroll +
            dimension.navigationHeight +
            currentViewportHeight -
            elementTop) /
          (currentViewportHeight + elementHeight)
        const thresholdPercentage =
          threshold === [0, 1]
            ? initialPercentage
            : transform(initialPercentage, threshold, [0, 1])
        let orchestrationPercentage = thresholdPercentage

        if (orchestration === "partial") {
          orchestrationPercentage =
            orchestrationPercentage > previousPercentage
              ? orchestrationPercentage
              : previousPercentage
        }

        if (
          (orchestration === "partial" || orchestration === "complete") &&
          orchestrationPercentage === 1 &&
          !orchestrationRepeat &&
          observer instanceof IntersectionObserver
        ) {
          unsubscribeScroll()
          unsubscribeViewportWidth()
          unsubscribeViewportHeight()
          observer.disconnect()
        }

        previousPercentage = orchestrationPercentage
        percentage.set(previousPercentage)
      })
    }

    const onViewportChange = () => {
      sync.read(() => {
        const boundingClientRect = target.getBoundingClientRect()

        elementTop = boundingClientRect.y + scroll.get()
        elementHeight = boundingClientRect.height
        currentViewportHeight = viewportHeight.get()
      })

      onScrollChange(scroll.get())
    }

    onScrollChange(scroll.get())
    unsubscribeScroll = scroll.onChange(onScrollChange)
    unsubscribeViewportWidth = viewportWidth.onChange(onViewportChange)
    unsubscribeViewportHeight = viewportHeight.onChange(onViewportChange)

    return () => {
      const { orchestration, orchestrationRepeat } = percentageOptions.current

      if (
        (orchestration === "partial" || orchestration === "complete") &&
        orchestrationRepeat
      ) {
        previousPercentage = 0
        percentage.set(previousPercentage)
      }

      unsubscribeScroll()
      unsubscribeViewportWidth()
      unsubscribeViewportHeight()
    }
  })

  useEffect(() => {
    percentageOptions.current = { ...defaultOptions, ...options }
  }, [options])

  return percentage
}

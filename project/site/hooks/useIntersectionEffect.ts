import { useEffect, useRef, RefObject } from "react"
import { useIsomorphicLayoutEffect } from "fraction"

export type IntersectionEffectRef = RefObject<HTMLElement>

export type IntersectionEffect = (
  entry?: IntersectionObserverEntry,
  observer?: IntersectionObserver
) => IntersectionEffectExit

export type IntersectionEffectExit =
  | void
  | ((
      entry?: IntersectionObserverEntry,
      observer?: IntersectionObserver
    ) => void | undefined)

export const useIntersectionEffect = (
  ref: IntersectionEffectRef,
  callback: IntersectionEffect,
  options: IntersectionObserverInit = {},
  disconnectAfterExit = false
): IntersectionObserver => {
  const observer = useRef<IntersectionObserver>()
  const effect = useRef<IntersectionEffect>(callback)
  const exitEffect = useRef<IntersectionEffectExit>()
  const shouldDisconnectAfterExit = useRef(disconnectAfterExit)

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    let isInitialEffect = true
    if (!element) return

    observer.current = new IntersectionObserver(([entry]) => {
      const { isIntersecting } = entry

      if (isIntersecting || (isIntersecting && isInitialEffect)) {
        exitEffect.current = effect.current(entry, observer.current)
      } else if (!isInitialEffect && exitEffect.current instanceof Function) {
        exitEffect.current(entry, observer.current)
      }

      if (
        shouldDisconnectAfterExit.current &&
        observer.current instanceof IntersectionObserver &&
        !isInitialEffect &&
        !isIntersecting
      ) {
        observer.current.disconnect()
      }

      isInitialEffect = false
    }, options)

    observer.current.observe(element)

    return () => {
      observer.current.unobserve(element)
    }
  }, [ref, options])

  useEffect(() => {
    effect.current = callback
  }, [callback])

  useEffect(() => {
    shouldDisconnectAfterExit.current = disconnectAfterExit
  }, [disconnectAfterExit])

  return observer.current
}

import { useEffect, useRef, FC } from "react"
import { motionValue, MotionValue } from "framer-motion"
import { dimension, color, useIsomorphicLayoutEffect } from "fraction"
import { Dynamic } from "monobase"
import sync from "framesync"
import kebabCase from "lodash.kebabcase"

export interface NavigationTraits {
  navigationAccent?: string
  navigationTint?: string
  navigationTheme?: string
  navigationTransparent?: boolean
  navigationVibrant?: boolean
}

export interface NavigationThreshold {
  element: HTMLElement
  top: number
  bottom: number
}

export interface ObserverValues {
  scroll: MotionValue<number>
  documentWidth: MotionValue<number>
  documentHeight: MotionValue<number>
  viewportWidth: MotionValue<number>
  viewportHeight: MotionValue<number>
}

export interface DocumentResizeEvent {
  type: string
  contentRect: DOMRectReadOnly
}

export const observerValues: ObserverValues = {
  scroll: motionValue<number>(0),
  documentWidth: motionValue<number>(null),
  documentHeight: motionValue<number>(null),
  viewportWidth: motionValue<number>(null),
  viewportHeight: motionValue<number>(null),
}

const getNavigationElements = (navigationTraits: NavigationTraits) => {
  const query = Object.keys(navigationTraits)
    .map((navigationTrait) => `[data-${kebabCase(navigationTrait)}]:not(:root)`)
    .join(", ")
  const elements = document.querySelectorAll(query)

  return Array.from(elements)
}

const calculateNavigationTraits = (
  defaultTraits: NavigationTraits,
  scroll: number = 0,
  thresholds: NavigationThreshold[] = []
) => {
  const threshold = thresholds.find(
    ({ top, bottom }) => scroll >= top && scroll < bottom
  )
  const traits =
    threshold === undefined
      ? defaultTraits
      : { ...defaultTraits, ...threshold.element.dataset }

  return traits
}

const updateNavigationVariable = (
  property: string,
  navigationTraits: NavigationTraits,
  previousNavigationTraits: NavigationTraits
) => {
  const variable = `--${kebabCase(property)}`

  if (previousNavigationTraits[property] !== navigationTraits[property]) {
    if (
      navigationTraits[property] === undefined ||
      navigationTraits[property] === false
    ) {
      document.documentElement.style.removeProperty(variable)
    } else {
      document.documentElement.style.setProperty(
        variable,
        String(navigationTraits[property])
      )
    }
  }
}

const updateNavigationAttribute = (
  property: string,
  navigationTraits: NavigationTraits,
  previousNavigationTraits: NavigationTraits
) => {
  const attribute = `data-${kebabCase(property)}`

  if (previousNavigationTraits[property] !== navigationTraits[property]) {
    if (
      navigationTraits[property] === undefined ||
      navigationTraits[property] === false
    ) {
      document.documentElement.removeAttribute(attribute)
    } else {
      document.documentElement.setAttribute(
        attribute,
        String(navigationTraits[property])
      )
    }
  }
}

const updateNavigationTraits = (
  previousNavigationTraits: NavigationTraits,
  navigationTraits: NavigationTraits
) => {
  updateNavigationVariable(
    "navigationAccent",
    navigationTraits,
    previousNavigationTraits
  )
  updateNavigationVariable(
    "navigationTint",
    navigationTraits,
    previousNavigationTraits
  )
  updateNavigationAttribute(
    "navigationTheme",
    navigationTraits,
    previousNavigationTraits
  )
  updateNavigationAttribute(
    "navigationTransparent",
    navigationTraits,
    previousNavigationTraits
  )
  updateNavigationAttribute(
    "navigationVibrant",
    navigationTraits,
    previousNavigationTraits
  )
}

const calculateScrollThresholds = (
  navigationTraits: NavigationTraits
): NavigationThreshold[] => {
  const elements = getNavigationElements(navigationTraits)
  const scroll = observerValues.scroll.get()

  return elements.map((element) => {
    const boundingClientRect = element.getBoundingClientRect()
    const top = boundingClientRect.y + scroll - dimension.navigationHeight

    return {
      element,
      top,
      bottom: top + boundingClientRect.height,
    } as NavigationThreshold
  })
}

const initiateObserverValues = (
  navigationTraits: NavigationTraits
): [NavigationThreshold[], number, number, number, number, number] => {
  let thresholds: NavigationThreshold[] = []
  let scroll = 0
  let documentWidth: number
  let documentHeight: number
  let viewportWidth: number
  let viewportHeight: number

  sync.read(() => {
    thresholds = calculateScrollThresholds(navigationTraits)

    scroll = window.pageYOffset
    documentWidth = document.body.clientWidth
    documentHeight = document.body.clientHeight
    viewportWidth = window.innerWidth
    viewportHeight = window.innerHeight
  })

  sync.update(() => {
    observerValues.scroll.set(scroll)
    observerValues.documentWidth.set(documentWidth)
    observerValues.documentHeight.set(documentHeight)
    observerValues.viewportWidth.set(viewportWidth)
    observerValues.viewportHeight.set(viewportHeight)
  })

  return [
    thresholds,
    scroll,
    documentWidth,
    documentHeight,
    viewportWidth,
    viewportHeight,
  ]
}

export const StaticObserver: FC<NavigationTraits> = ({
  navigationAccent = undefined,
  navigationTint = color.primary,
  navigationTheme = "light",
  navigationTransparent = false,
  navigationVibrant = false,
}) => {
  const defaultNavigationTraits = useRef<NavigationTraits>({
    navigationAccent,
    navigationTint,
    navigationTheme,
    navigationTransparent,
    navigationVibrant,
  })

  useIsomorphicLayoutEffect(() => {
    let navigationTraits: NavigationTraits
    let previousNavigationTraits = defaultNavigationTraits.current
    let [
      thresholds,
      scroll,
      documentWidth,
      documentHeight,
      viewportWidth,
      viewportHeight,
    ] = initiateObserverValues(previousNavigationTraits)

    const updateObserverValues = (event: Event | DocumentResizeEvent) => {
      sync.read(() => {
        scroll = window.pageYOffset < 0 ? 0 : window.pageYOffset

        if (event.type === "document") {
          documentWidth = (event as DocumentResizeEvent).contentRect.width
          documentHeight = (event as DocumentResizeEvent).contentRect.height
        }

        if (event.type === "resize") {
          viewportWidth = window.innerWidth
          viewportHeight = window.innerHeight
        }

        if (event.type === "document" || event.type === "resize") {
          thresholds = calculateScrollThresholds(
            defaultNavigationTraits.current
          )
        }

        navigationTraits = calculateNavigationTraits(
          defaultNavigationTraits.current,
          scroll,
          thresholds
        )
      })

      sync.update(() => {
        observerValues.scroll.set(scroll)

        if (event.type === "document") {
          observerValues.documentWidth.set(documentWidth)
          observerValues.documentHeight.set(documentHeight)
        }

        if (event.type === "resize") {
          observerValues.viewportWidth.set(viewportWidth)
          observerValues.viewportHeight.set(viewportHeight)
        }

        if (scroll > dimension.navigationHeight) {
          document.documentElement.removeAttribute("data-navigation-ceiling")
        } else {
          document.documentElement.setAttribute(
            "data-navigation-ceiling",
            "true"
          )
        }

        updateNavigationTraits(previousNavigationTraits, navigationTraits)
        previousNavigationTraits = navigationTraits
      })
    }

    const documentObserver = new ResizeObserver(([{ contentRect }]) =>
      updateObserverValues({
        type: "document",
        contentRect,
      })
    )

    window.addEventListener("scroll", updateObserverValues, {
      passive: true,
    })
    window.addEventListener("resize", updateObserverValues, {
      passive: true,
    })
    documentObserver.observe(document.body)

    return () => {
      window.removeEventListener("scroll", updateObserverValues)
      window.removeEventListener("resize", updateObserverValues)
      documentObserver.unobserve(document.body)
    }
  }, [])

  useEffect(() => {
    defaultNavigationTraits.current = {
      navigationAccent,
      navigationTint,
      navigationTheme,
    }
  }, [navigationAccent, navigationTint, navigationTheme])

  return null
}

export const Observer = Dynamic(StaticObserver)

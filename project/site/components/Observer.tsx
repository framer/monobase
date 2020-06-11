import { useEffect, useRef } from "react"
import { motionValue, MotionValue } from "framer-motion"
import {
  screenNames,
  screenMediaQueries,
  dimensionTokens,
  useIsomorphicLayoutEffect,
} from "fraction"
import { Dynamic } from "monobase"
import sync from "framesync"
import kebabCase from "lodash.kebabcase"

export interface Props {
  navigationHeight?: number
}

export interface NavigationTraits {
  navigationAccent?: string | boolean
  navigationTint?: string | boolean
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
  screen: MotionValue<string>
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
  screen: motionValue<string>(null),
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
  if (previousNavigationTraits[property] !== navigationTraits[property]) {
    const variable = `--${kebabCase(property)}`

    if (
      typeof navigationTraits[property] === "boolean" ||
      navigationTraits[property] === "true" ||
      navigationTraits[property] === "false" ||
      navigationTraits[property] === undefined
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
      if (property === "navigationAccent" || property === "navigationTint") {
        document.documentElement.setAttribute(
          attribute,
          String(Boolean(navigationTraits[property]))
        )
      } else {
        document.documentElement.setAttribute(
          attribute,
          String(navigationTraits[property])
        )
      }
    }
  }
}

const updateNavigationTraits = (
  previousNavigationTraits: NavigationTraits,
  navigationTraits: NavigationTraits
) => {
  updateNavigationAttribute(
    "navigationAccent",
    navigationTraits,
    previousNavigationTraits
  )
  updateNavigationVariable(
    "navigationAccent",
    navigationTraits,
    previousNavigationTraits
  )
  updateNavigationAttribute(
    "navigationTint",
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
  navigationTraits: NavigationTraits,
  navigationHeight: number
): NavigationThreshold[] => {
  const elements = getNavigationElements(navigationTraits)
  const scroll = observerValues.scroll.get()

  return elements.map((element) => {
    const boundingClientRect = element.getBoundingClientRect()
    const top = boundingClientRect.y + scroll - navigationHeight

    return {
      element,
      top,
      bottom: top + boundingClientRect.height,
    } as NavigationThreshold
  })
}

const getCurrentMediaQuery = (mediaQueries: MediaQueryList[]) => {
  return [...mediaQueries].reverse().find((mediaQuery) => mediaQuery.matches)
}

const getScreenFromMediaQuery = (
  mediaQuery: MediaQueryList | MediaQueryListEvent
) => {
  if (!mediaQuery) return

  const mediaQueryIndex = screenNames.findIndex(
    (name) => screenMediaQueries[name] === mediaQuery.media
  )
  const mediaQueryRelativeIndex = mediaQuery.matches
    ? mediaQueryIndex
    : mediaQueryIndex - 1

  return screenNames[mediaQueryRelativeIndex]
}

const initiateObserverValues = (
  navigationTraits: NavigationTraits,
  mediaQueries: MediaQueryList[],
  navigationHeight: number
): [NavigationThreshold[], number, string, number, number, number, number] => {
  let thresholds: NavigationThreshold[] = []
  let scroll = 0
  let documentWidth: number
  let documentHeight: number
  let viewportWidth: number
  let viewportHeight: number

  const currentMediaQuery = getCurrentMediaQuery(mediaQueries)
  const screen = getScreenFromMediaQuery(currentMediaQuery)

  sync.read(() => {
    thresholds = calculateScrollThresholds(navigationTraits, navigationHeight)

    scroll = window.pageYOffset
    documentWidth = document.body.clientWidth
    documentHeight = document.body.clientHeight
    viewportWidth = window.innerWidth
    viewportHeight = window.innerHeight
  })

  sync.update(() => {
    observerValues.scroll.set(scroll)
    if (screen) observerValues.screen.set(screen)
    observerValues.documentWidth.set(documentWidth)
    observerValues.documentHeight.set(documentHeight)
    observerValues.viewportWidth.set(viewportWidth)
    observerValues.viewportHeight.set(viewportHeight)
  })

  return [
    thresholds,
    scroll,
    screen,
    documentWidth,
    documentHeight,
    viewportWidth,
    viewportHeight,
  ]
}

const initiateMediaQueries = () => {
  return screenNames.map((name) => window.matchMedia(screenMediaQueries[name]))
}

const addMediaQueryListener = (
  mediaQuery: MediaQueryList,
  callback: (event?: MediaQueryListEvent) => void
) =>
  mediaQuery.addEventListener instanceof Function
    ? mediaQuery.addEventListener("change", callback)
    : mediaQuery.addListener(callback)

const removeMediaQueryListener = (
  mediaQuery: MediaQueryList,
  callback: (event?: MediaQueryListEvent) => void
) =>
  mediaQuery.removeEventListener instanceof Function
    ? mediaQuery.removeEventListener("change", callback)
    : mediaQuery.removeListener(callback)

export const StaticObserver = ({
  navigationAccent = undefined,
  navigationTint = undefined,
  navigationTheme = "light",
  navigationTransparent = false,
  navigationVibrant = false,
  navigationHeight = dimensionTokens.navigationHeight,
}: NavigationTraits & Props) => {
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
    const mediaQueries = initiateMediaQueries()
    let [
      thresholds,
      scroll,
      screen,
      documentWidth,
      documentHeight,
      viewportWidth,
      viewportHeight,
    ] = initiateObserverValues(
      previousNavigationTraits,
      mediaQueries,
      navigationHeight
    )

    const updateScreenValue = (event: MediaQueryListEvent) => {
      screen = getScreenFromMediaQuery(event)

      sync.update(() => {
        if (screen) observerValues.screen.set(screen)
      })
    }

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
            defaultNavigationTraits.current,
            navigationHeight
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

        if (scroll > navigationHeight) {
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

    mediaQueries.forEach((mediaQuery) => {
      addMediaQueryListener(mediaQuery, updateScreenValue)
    })

    window.addEventListener("scroll", updateObserverValues, {
      passive: true,
    })
    window.addEventListener("resize", updateObserverValues, {
      passive: true,
    })
    documentObserver.observe(document.body)

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        removeMediaQueryListener(mediaQuery, updateScreenValue)
      })
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
      navigationTransparent,
      navigationVibrant,
    }
  }, [navigationAccent, navigationTint, navigationTheme])

  return null
}

export const Observer = Dynamic(StaticObserver)

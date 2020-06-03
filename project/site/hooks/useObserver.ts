import { useIsomorphicLayoutEffect } from "fraction"
import sync from "framesync"
import { observerValues } from "../components/Observer"

export interface ScrollObserverValues {
  scroll: number
}

export interface ResizeObserverValues {
  viewportWidth: number
  viewportHeight: number
}

export interface DocumentResizeObserverValues {
  documentWidth: number
  documentHeight: number
}

type observerCallback<V> = (values?: V) => void

export const useObserverValues = () => observerValues

export const useScrollObserver = (
  read: observerCallback<ScrollObserverValues> = () => {},
  update?: observerCallback<ScrollObserverValues>
) => {
  const { scroll: observerScroll } = observerValues

  useIsomorphicLayoutEffect(() => {
    const onScrollChange = (scroll: number) => {
      sync.read(() => read({ scroll }))

      if (update instanceof Function) {
        sync.update(() => update({ scroll }))
      }
    }

    const unsubscribeScroll = observerScroll.onChange(onScrollChange)

    return () => {
      unsubscribeScroll()
    }
  }, [observerScroll, read, update])
}

export const useResizeObserver = (
  read: observerCallback<ResizeObserverValues> = () => {},
  update?: observerCallback<ResizeObserverValues>
) => {
  const {
    viewportWidth: observerViewportWidth,
    viewportHeight: observerViewportHeight,
  } = observerValues

  useIsomorphicLayoutEffect(() => {
    const onViewportChange = () => {
      const viewportWidth = observerViewportWidth.get()
      const viewportHeight = observerViewportHeight.get()

      sync.read(() => read({ viewportWidth, viewportHeight }))

      if (update instanceof Function) {
        sync.update(() => update({ viewportWidth, viewportHeight }))
      }
    }

    const unsubscribeViewportWidth = observerViewportWidth.onChange(
      onViewportChange
    )
    const unsubscribeViewportHeight = observerViewportHeight.onChange(
      onViewportChange
    )

    return () => {
      unsubscribeViewportWidth()
      unsubscribeViewportHeight()
    }
  }, [observerViewportWidth, observerViewportHeight, read, update])
}

export const useDocumentResizeObserver = (
  read: observerCallback<DocumentResizeObserverValues> = () => {},
  update?: observerCallback<DocumentResizeObserverValues>
) => {
  const {
    viewportWidth: observerDocumentWidth,
    viewportHeight: observerDocumentHeight,
  } = observerValues

  useIsomorphicLayoutEffect(() => {
    const onViewportChange = () => {
      const documentWidth = observerDocumentWidth.get()
      const documentHeight = observerDocumentHeight.get()

      sync.read(() => read({ documentWidth, documentHeight }))

      if (update instanceof Function) {
        sync.update(() => update({ documentWidth, documentHeight }))
      }
    }

    const unsubscribeDocumentWidth = observerDocumentWidth.onChange(
      onViewportChange
    )
    const unsubscribeDocumentHeight = observerDocumentHeight.onChange(
      onViewportChange
    )

    return () => {
      unsubscribeDocumentWidth()
      unsubscribeDocumentHeight()
    }
  }, [observerDocumentWidth, observerDocumentHeight, read, update])
}

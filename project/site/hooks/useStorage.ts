import { useState, useEffect, Dispatch } from "react"

export interface StorageStateChangeEvent extends CustomEvent {
  detail: {
    storage: string
    key: string
    value: any
  }
}

const noop = () => [undefined, undefined]

const safelyStringifyValue = (value: any): string => {
  return typeof value === "object" ? JSON.stringify(value) : String(value)
}

const safelyParseValue = (value: string): any => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return undefined
  }
}

const createStorage = (storage: "localStorage" | "sessionStorage") => (
  key: string,
  value: any
) => {
  const string = safelyStringifyValue(value)

  window[storage].setItem(key, string)
  window.dispatchEvent(
    new CustomEvent("storagestatechange", {
      detail: { storage, key, value: string },
    })
  )
}

const createStorageState = (storage: "localStorage" | "sessionStorage") => <
  T extends Record<string, any>
>(
  key: string,
  initialState?: T,
  lazyInitialization: boolean = true
): [T, Dispatch<T>] => {
  const [state, setState] = useState(
    lazyInitialization
      ? () => {
          const storageState = window[storage].getItem(key)

          return storageState !== null
            ? safelyParseValue(storageState)
            : initialState
        }
      : initialState
  )

  useEffect(() => {
    if (state === undefined || state === null) {
      window[storage].removeItem(key)
    } else {
      window[storage].setItem(key, safelyStringifyValue(state))
    }
  }, [key, state])

  useEffect(() => {
    const handleStorageChange = ({ detail }: StorageStateChangeEvent) => {
      if (storage === detail.storage && key === detail.key) {
        setState(safelyParseValue(detail.value))
      }
    }

    window.addEventListener("storagestatechange", handleStorageChange)

    return () => {
      window.removeEventListener("storagestatechange", handleStorageChange)
    }
  }, [key])

  return [state, setState]
}

export const setLocalStorage = createStorage("localStorage")
export const setSessionStorage = createStorage("sessionStorage")

export const useLocalState =
  typeof window !== "undefined" ? createStorageState("localStorage") : noop
export const useSessionState =
  typeof window !== "undefined" ? createStorageState("sessionStorage") : noop

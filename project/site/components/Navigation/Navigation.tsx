import React, { useEffect, useState, FC } from "react"
import { Dynamic } from "monobase"
import {
  Navigation as FractionNavigation,
  NavigationProps,
  HTMLPropsWithMotion,
  ScreenName,
  smallerThanScreen,
} from "fraction"
import { useSessionState, useObserverValues } from "../../hooks"

const StaticNavigation: FC<HTMLPropsWithMotion<"nav"> & NavigationProps> = ({
  ...props
}) => {
  const { screen: screenMotionValue } = useObserverValues()
  const [withHamburger, setHamburger] = useState(false)
  const [account] = useSessionState("framerAccount", undefined, false)

  useEffect(() => {
    const updateScreen = (value: ScreenName) => {
      setHamburger(smallerThanScreen(value, "tabletSmall", true))
    }

    const unsubscribeScreen = screenMotionValue.onChange(updateScreen)

    return () => {
      unsubscribeScreen()
    }
  }, [])

  return (
    <FractionNavigation
      {...props}
      account={account}
      withHamburger={withHamburger}
    />
  )
}

export const Navigation = Dynamic(StaticNavigation)

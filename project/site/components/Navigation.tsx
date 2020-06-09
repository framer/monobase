import React, { useState } from "react"
import { Dynamic } from "monobase"
import {
  Navigation as FractionNavigation,
  NavigationProps,
  ComponentWithMotion,
  ScreenName,
  smallerThanScreen,
} from "fraction"
import { useSessionState, useScreenObserver } from "../hooks"

const StaticNavigation: ComponentWithMotion<"header", NavigationProps> = ({
  ...props
}) => {
  const [withHamburger, setHamburger] = useState(false)
  const [account] = useSessionState("framerAccount", undefined, false)

  useScreenObserver(({ screen }) => {
    setHamburger(smallerThanScreen(screen as ScreenName, "tabletSmall", true))
  })

  return (
    <FractionNavigation
      {...props}
      account={account}
      withHamburger={withHamburger}
    />
  )
}

export const Navigation = Dynamic(StaticNavigation)

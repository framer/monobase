import React from "react"
import clsx from "clsx"
import styles from "./Navigation.styles.css"
import { Component } from "../../types"

export const NavigationItem: Component<"a"> = ({
  children,
  className,
  ...props
}) => (
  <li className={clsx(className, styles.item)}>
    <a {...props}>{children}</a>
  </li>
)

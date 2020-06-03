import * as React from "react"
import { FC } from "react"
import clsx from "clsx"
import styles from "./Navigation.styles.css"
import { HTMLProps } from "../../types"

export const NavigationItem: FC<HTMLProps<"a">> = ({
  children,
  className,
  ...props
}) => (
  <li className={clsx(className, styles.item)}>
    <a {...props}>{children}</a>
  </li>
)

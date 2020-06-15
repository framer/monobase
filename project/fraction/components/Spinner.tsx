import React, { CSSProperties } from "react"
import clsx from "clsx"
import styles from "./Spinner.styles.css"
import { Element } from "./Element"
import { Component } from "../types"

export interface Props {
  size?: number
}

export const Spinner: Component<"svg", Props> = ({
  size = 30,
  className,
  ...props
}) => (
  <Element
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    fill="currentColor"
    width={size}
    role="presentation"
    {...props}
    className={clsx(className, styles.spinner)}
  >
    <path
      d="M15 0C6.716 0 0 6.716 0 15c0 8.285 6.716 15 15 15 8.284 0 15-6.715 15-15-.001-8.284-6.716-15-15-15zm0 26.676C8.552 26.676 3.324 21.449 3.324 15 3.324 8.552 8.552 3.324 15 3.324S26.675 8.552 26.675 15c0 6.449-5.227 11.676-11.675 11.676z"
      opacity="0.2"
    />
    <path d="M29.868 16.897C30.901 8.677 25.077 1.176 16.856.142 8.637-.891 1.135 4.934.101 13.154c.49 1.379 2.321 1.652 3.191.475l.05-.068C4.15 7.132 10.019 2.574 16.449 3.383c6.43.809 10.987 6.676 10.178 13.107-.145 1.824 2.381 2.441 3.094.755z" />
  </Element>
)

import * as React from "react"
import { ComponentProps, FC } from "react"
import styles from "./Content.styles.css"
import cx from "classnames"

export interface Props extends ComponentProps<"div"> {
  size?: "small" | "default" | "large" | "larger"
}

export const Content: FC<Props> = ({
  children,
  size = "default",
  style,
  className,
}) => {
  const classNames = cx(styles.content, className, {
    [styles.sizeSmall]: size === "small",
    [styles.sizeLarge]: size === "large",
    [styles.sizeLarger]: size === "larger",
  })

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  )
}

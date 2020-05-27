import * as React from "react"
import { forwardRef, ComponentPropsWithRef, FC } from "react"
import styles from "./Content.styles.css"
import cx from "classnames"

export interface Props extends ComponentPropsWithRef<"div"> {
  size?: "small" | "default" | "large" | "larger"
}

export const Content: FC<Props> = forwardRef(
  ({ children, size = "default", style, className, ...props }, ref) => {
    const classNames = cx(styles.content, className, {
      [styles.sizeSmall]: size === "small",
      [styles.sizeLarge]: size === "large",
      [styles.sizeLarger]: size === "larger",
    })

    return (
      <div ref={ref} className={classNames} style={style} {...props}>
        {children}
      </div>
    )
  }
)

import React, { forwardRef, FC } from "react"
import clsx from "clsx"
import styles from "./Content.styles.css"
import { HTMLPropsWithRef } from "../../types"

export interface Props {
  size?: "small" | "default" | "large" | "larger"
}

export const Content: FC<HTMLPropsWithRef<"div"> & Props> = forwardRef(
  ({ children, size = "default", style, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx(styles.content, "content", className, {
        [`size-${size}`]: !!size,
      })}
      style={style}
    >
      {children}
    </div>
  )
)

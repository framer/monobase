import * as React from "react"
import { forwardRef, FC, CSSProperties } from "react"
import clsx from "clsx"
import styles from "./Text.styles.css"
import { TypographyProps, HTMLPropsWithRef } from "../../types"

export interface Props extends TypographyProps {
  size?:
    | "smallest"
    | "smaller"
    | "small"
    | "default"
    | "large"
    | "larger"
    | "largest"
}

export const Text: FC<HTMLPropsWithRef<"p"> & Props> = forwardRef(
  (
    {
      children,
      align,
      color,
      italic,
      size = "default",
      style,
      className,
      ...props
    },
    ref
  ) => (
    <p
      {...props}
      ref={ref}
      className={clsx(styles.text, className, {
        [`size-${size}`]: !!size,
      })}
      style={
        {
          ...style,
          textAlign: align,
          fontStyle: italic ? "italic" : null,
          "--text-color": color,
        } as CSSProperties
      }
    >
      {children}
    </p>
  )
)

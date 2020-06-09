import React, { forwardRef, ElementType } from "react"
import clsx from "clsx"
import styles from "./Content.styles.css"
import { Element } from "./Element"
import { ComposedPrimitive, ComposedPrimitiveProps } from "../types"

const DEFAULT_ELEMENT = "div"

export interface Props {
  size?: "small" | "default" | "large" | "larger"
}

export const Content = forwardRef(
  <E extends ElementType = typeof DEFAULT_ELEMENT>(
    {
      children,
      ref,
      as = DEFAULT_ELEMENT as E,
      size = "default",
      className,
      ...props
    }: ComposedPrimitiveProps<E, Props>,
    innerRef: typeof ref
  ) => (
    <Element
      as={as as ElementType}
      {...props}
      ref={innerRef}
      className={clsx(styles.content, "content", className, {
        [`size-${size}`]: !!size,
      })}
    >
      {children}
    </Element>
  )
) as ComposedPrimitive<typeof DEFAULT_ELEMENT, Props>

import React, { forwardRef, ElementType, CSSProperties } from "react"
import clsx from "clsx"
import styles from "./Text.styles.css"
import { Element } from "./Element"
import {
  TypographyProps,
  ComposedPrimitive,
  ComposedPrimitiveProps,
} from "../types"

const DEFAULT_ELEMENT = "p"

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

export const Text = forwardRef(
  <E extends ElementType = typeof DEFAULT_ELEMENT>(
    {
      children,
      ref,
      as = DEFAULT_ELEMENT as E,
      size = "default",
      align,
      italic,
      color,
      style,
      className,
      ...props
    }: ComposedPrimitiveProps<E, Props>,
    innerRef: typeof ref
  ) => (
    <Element
      as={as as ElementType}
      {...props}
      ref={innerRef}
      className={clsx(styles.text, className, {
        [`size-${size}`]: !!size,
      })}
      style={
        {
          ...style,
          textAlign: align,
          fontStyle: italic ? "italic" : null,
          "--text-color": typeof color === "string" ? color : undefined,
        } as CSSProperties
      }
    >
      {children}
    </Element>
  )
) as ComposedPrimitive<typeof DEFAULT_ELEMENT, Props>

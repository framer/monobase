import React, { forwardRef, ElementType, CSSProperties } from "react"
import clsx from "clsx"
import styles from "./Heading.styles.css"
import { Element } from ".."
import { ComposedPrimitive, ComposedPrimitiveProps } from "../../types"
import { TypographyProps } from "../../types"

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface Props extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = forwardRef(
  <E extends ElementType = HeadingElement>(
    {
      children,
      ref,
      as,
      level = 2,
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
      as={(as === undefined ? `h${level}` : as) as HeadingElement}
      {...props}
      ref={innerRef}
      className={clsx(styles.heading, className, {
        [`level-${level}`]: !!level,
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
) as ComposedPrimitive<HeadingElement, Props>

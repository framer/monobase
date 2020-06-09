import React, { forwardRef, ElementType, CSSProperties } from "react"
import clsx from "clsx"
import styles from "./Stack.styles.css"
import { Element } from "./Element"
import { ComposedPrimitive, ComposedPrimitiveProps } from "../types"

const DEFAULT_ELEMENT = "div"

export interface Props {
  direction?: "horizontal" | "vertical"
  distribute?:
    | "start"
    | "center"
    | "end"
    | "spaceBetween"
    | "spaceEvenly"
    | "spaceAround"
  align?: "start" | "center" | "end" | "stretch"
  reverse?: boolean
  wrap?: boolean
  inline?: boolean
  fluid?: boolean
  gap?: number
  gapX?: number
  gapY?: number
}

export const Stack = forwardRef(
  <E extends ElementType = typeof DEFAULT_ELEMENT>(
    {
      children,
      ref,
      as = DEFAULT_ELEMENT as E,
      direction = "horizontal",
      distribute = "start",
      align = "start",
      reverse,
      wrap,
      inline,
      fluid,
      gap,
      gapX = gap,
      gapY = gap,
      className,
      style,
      ...props
    }: ComposedPrimitiveProps<E, Props>,
    innerRef: typeof ref
  ) => (
    <Element
      as={as as ElementType}
      {...props}
      ref={innerRef}
      className={clsx(styles.stack, "stack", className, {
        [`direction-${direction}`]: !!direction,
        [`distribute-${distribute}`]: !!distribute,
        [`align-${align}`]: !!align,
        reverse,
        wrap,
        inline,
        fluid,
      })}
      style={
        {
          ...style,
          "--stack-gap": typeof gap === "number" ? `${gap}px` : undefined,
          "--stack-gap-horizontal":
            typeof gapX === "number" ? `${gapX}px` : undefined,
          "--stack-gap-vertical":
            typeof gapY === "number" ? `${gapY}px` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </Element>
  )
) as ComposedPrimitive<typeof DEFAULT_ELEMENT, Props>

import React, { forwardRef, ElementType } from "react"
import clsx from "clsx"
import styles from "./Section.styles.css"
import { Element } from ".."
import { ComposedPrimitive, ComposedPrimitiveProps } from "../../types"

const DEFAULT_ELEMENT = "section"

export const Section = forwardRef(
  <E extends ElementType = typeof DEFAULT_ELEMENT>(
    {
      children,
      ref,
      as = DEFAULT_ELEMENT as E,
      className,
      ...props
    }: ComposedPrimitiveProps<E>,
    innerRef: typeof ref
  ) => (
    <Element
      as={as as ElementType}
      {...props}
      ref={innerRef}
      className={clsx(className, "section", styles.section)}
    >
      {children}
    </Element>
  )
) as ComposedPrimitive<typeof DEFAULT_ELEMENT>

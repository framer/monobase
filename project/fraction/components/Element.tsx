import React, { forwardRef, Ref, ElementType } from "react"
import { PrimitiveAsProp, ElementProps } from "../types"

const DEFAULT_ELEMENT = "div"

export const Element = forwardRef(
  (
    { as: ElementTag = DEFAULT_ELEMENT, ...props }: PrimitiveAsProp,
    ref: Ref<Element>
  ) => <ElementTag {...props} ref={ref} />
) as <E extends ElementType = typeof DEFAULT_ELEMENT>(
  props: ElementProps<E>
) => JSX.Element

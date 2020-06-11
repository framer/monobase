import {
  FC,
  ElementType,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
} from "react"
import { MotionProps } from "framer-motion"

/*
 * Primitives
 */

export type ElementProps<E extends ElementType> = PrimitiveAsProp<E> &
  Omit<
    JSX.LibraryManagedAttributes<E, ComponentPropsWithRef<E>>,
    keyof PrimitiveAsProp
  >

export interface PrimitiveAsProp<E extends ElementType = ElementType> {
  as?: E
}

export type ComposedPrimitiveProps<E extends ElementType, P = {}> = P &
  ElementProps<E>

export type ComposedPrimitive<D extends ElementType = "div", P = {}> = <
  E extends ElementType = D
>(
  props: ComposedPrimitiveProps<E, P>
) => JSX.Element

/*
 * Utilities
 */

export interface TypographyProps {
  align?: "left" | "right" | "center" | "justify"
  color?: string
  italic?: boolean
}

/*
 * Components
 */

export type Component<
  E extends ElementType = ElementType,
  P = {},
  O extends string = ""
> = FC<P & Omit<ComponentPropsWithoutRef<E>, O>>
export type ComponentWithRef<
  E extends ElementType = ElementType,
  P = {},
  O extends string = ""
> = FC<P & Omit<ComponentPropsWithRef<E>, O>>
export type ComponentWithMotion<
  E extends ElementType = ElementType,
  P = {},
  O extends string = ""
> = FC<P & Omit<ComponentPropsWithRef<E> & MotionProps, O>>

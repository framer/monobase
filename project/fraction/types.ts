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

export type ElementProps<E extends ElementType> = PrimitivePolymorphicProp<E> &
  Omit<
    JSX.LibraryManagedAttributes<E, ComponentPropsWithRef<E>>,
    keyof PrimitivePolymorphicProp
  >

export interface PrimitivePolymorphicProp<E extends ElementType = ElementType> {
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

export type Component<E extends ElementType = ElementType, P = {}> = FC<
  P & ComponentPropsWithoutRef<E>
>
export type ComponentWithRef<E extends ElementType = ElementType, P = {}> = FC<
  ComponentPropsWithRef<E> & P
>
export type ComponentWithMotion<
  E extends ElementType = ElementType,
  P = {}
> = FC<P & ComponentPropsWithRef<E> & MotionProps>

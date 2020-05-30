import {
  ReactHTML,
  ReactSVG,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
} from "react"

export type HTMLProps<T extends keyof ReactHTML> = ComponentPropsWithoutRef<T>
export type SVGProps<T extends keyof ReactSVG> = ComponentPropsWithoutRef<T>
export type HTMLPropsWithRef<T extends keyof ReactHTML> = ComponentPropsWithRef<
  T
>
export type SVGPropsWithRef<T extends keyof ReactSVG> = ComponentPropsWithRef<T>
export {
  HTMLMotionProps as HTMLPropsWithMotion,
  SVGMotionProps as SVGPropsWithMotion,
} from "framer-motion"

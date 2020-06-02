import * as React from "react"
import { forwardRef, FC, CSSProperties } from "react"
import clsx from "clsx"
import styles from "./Heading.styles.css"
import { TypographyProps, HTMLPropsWithRef } from "../../types"

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface Props extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  as?: HeadingElement
}

export const Heading: FC<HTMLPropsWithRef<"h1"> & Props> = forwardRef(
  (
    {
      children,
      as,
      level = 2,
      align,
      italic,
      color,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const HeadingElement: keyof JSX.IntrinsicElements =
      typeof as === "string" ? as : (`h${level}` as HeadingElement)

    return (
      <HeadingElement
        {...props}
        ref={ref}
        className={clsx(styles.heading, className, {
          [`level-${level}`]: !!level,
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
      </HeadingElement>
    )
  }
)

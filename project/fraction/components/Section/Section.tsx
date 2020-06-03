import * as React from "react"
import { forwardRef, FC } from "react"
import clsx from "clsx"
import styles from "./Section.styles.css"
import { HTMLPropsWithRef } from "../../types"

export const Section: FC<HTMLPropsWithRef<"section">> = forwardRef(
  ({ children, style, className, ...props }, ref) => (
    <section
      {...props}
      ref={ref}
      className={clsx(className, "section", styles.section)}
      style={style}
    >
      {children}
    </section>
  )
)

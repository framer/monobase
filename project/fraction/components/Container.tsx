import * as React from "react"
import styles from "./Container.styles.css"
import cx from "classnames"

export type Props = React.ComponentProps<"div"> & {
  size?: "L" | "XL"
}

export const Container: React.FC<Props> = ({
  children,
  size,
  style,
  className,
}) => {
  const containerClassNames = cx(styles.container, className, {
    [styles.containerL]: size === "L",
    [styles.containerXl]: size === "XL",
  })

  return (
    <div className={containerClassNames} style={style}>
      {children}
    </div>
  )
}

import React, { ReactNode } from "react"
import styles from "./Aside.styles.css"
import { Content } from "../../primitives/Content"
import { Component } from "../../types"

export interface Props {
  aside?: ReactNode
  sticky?: boolean
}

export const Aside: Component<"div", Props> = ({
  children,
  aside,
  ...props
}) => (
  <Content className={styles.container} {...props}>
    {aside && <div className={styles.aside}>{aside}</div>}
    <div className={styles.content}>{children}</div>
  </Content>
)

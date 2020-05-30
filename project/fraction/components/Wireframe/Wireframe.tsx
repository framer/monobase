import * as React from "react"
import { FC } from "react"
import styles from "./Wireframe.styles.css"
import { Content } from "../Content"
import { HTMLProps } from "../../types"

export const Wireframe: FC<HTMLProps<"div">> = () => (
  <div className={styles.wireframe}>
    <Content size="larger">
      <Content size="large">
        <Content>
          <Content size="small" />
        </Content>
      </Content>
    </Content>
  </div>
)

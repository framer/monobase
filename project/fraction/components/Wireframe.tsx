import React from "react"
import styles from "./Wireframe.styles.css"
import { Content } from "./Content"
import { Component } from "../types"

export const Wireframe: Component<"div"> = () => (
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

import React, { ReactType } from "react"
import styles from "./Banner.styles.css"
import { Content } from "./Content"

export type Banner = "loupe"

const Loupe = () => (
  <div className={styles.loupe}>
    <Content>Loupe</Content>
  </div>
)

export const banners: Record<Banner, ReactType> = {
  loupe: Loupe,
}

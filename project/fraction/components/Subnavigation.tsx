import React, { ReactType } from "react"
import styles from "./Subnavigation.styles.css"
import { Content } from "./Content"

export type Subnavigation = "blog" | "support"

export const MenuSubnavigation = () => {
  return (
    <div className={styles.menuSubnavigation}>
      <Content>Menu</Content>
    </div>
  )
}

export const SearchSubnavigation = () => {
  return (
    <div className={styles.searchSubnavigation}>
      <Content>Search</Content>
    </div>
  )
}

export const BlogSubnavigation = () => <MenuSubnavigation />

export const SupportSubnavigation = () => <MenuSubnavigation />

export const subnavigations: Record<Subnavigation, ReactType> = {
  blog: BlogSubnavigation,
  support: SupportSubnavigation,
}

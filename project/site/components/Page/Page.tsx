import React from "react"
import { FC } from "react"
import { Development, StyleSheet } from "monobase"
import { Variables, HTMLProps } from "fraction"
import { Navigation } from "../Navigation"
import { Authentication } from "../"

export interface Meta {
  title?: string
  description?: string
}

export interface Props {
  /** Change theme fore entire page */
  // theme?: keyof typeof ThemeVariants

  /** Set page title */
  title?: string

  /** Show "Framer" (or another custom secondary title) in title */
  secondaryTitle?: string | boolean

  /** Show "Framer" (or another custom secondary title) in title as prefix, otherwise suffix */
  secondaryTitleAsPrefix?: boolean

  /** Set page description */
  description?: string

  /** Optionally override meta tags */
  meta?: Meta
}

export const Page: FC<HTMLProps<"html"> & Props> = ({
  children,
  title = "The prototyping tool for teams",
  secondaryTitle: secondaryDefaultTitle = "Framer",
  secondaryTitleAsPrefix = false,
  description = "It’s prototyping made simple—no code required, browser-based, and free for everyone. High-fidelity in half the time.",
  meta = {},
  ...props
}) => {
  const withSecondaryTitle = (
    title: string,
    secondaryTitle = secondaryDefaultTitle,
    asPrefix = secondaryTitleAsPrefix
  ) => {
    if (title) {
      if (typeof secondaryTitle === "string" && secondaryTitle.trim() !== "") {
        return asPrefix
          ? `${secondaryTitle.trim()} | ${title.trim()}`
          : `${title.trim()} | ${secondaryTitle.trim()}`
      } else {
        return title
      }
    }
  }

  const pageTitle = withSecondaryTitle(title)
  const pageMetaTitle = meta.title ? withSecondaryTitle(meta.title) : pageTitle
  const pageDescription = description
  const pageMetaDescription = meta.description || pageDescription

  return (
    <html {...props}>
      <head>
        <meta charSet="utf-8" />
        <title>{pageMetaTitle}</title>
        <meta name="description" content={pageMetaDescription} />
        <meta name="title" content={pageMetaTitle} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="stylesheet" href="/static/style.css" />
        <Variables />
        <StyleSheet />
        <Authentication async />
        <script
          src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=IntersectionObserver%2CMutationObserver%2CResizeObserver"
          defer
        />
        <Development defer />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

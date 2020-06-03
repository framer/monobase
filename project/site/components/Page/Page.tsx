import React from "react"
import { FC } from "react"
import { Development, StyleSheet } from "monobase"
import { Variables, Theme, HTMLProps } from "fraction"
import clsx from "clsx"
import { Authentication } from "../Authentication"
import { Navigation } from "../Navigation"
import { Observer } from "../Observer"

export interface Meta {
  title?: string
  description?: string
}

export interface Props {
  /**
   * Change theme for the entire page
   * @default "light"
   */
  theme?: keyof typeof Theme

  /**
   * Set page title
   * @default "The prototyping tool for teams"
   */
  title?: string

  /**
   * Show "Framer" (or another
   * custom secondary title) in title
   * @default "Framer"
   */
  secondaryTitle?: string | boolean

  /**
   * Show "Framer" (or another
   * custom secondary title) in title
   * as prefix, otherwise suffix
   * @default false
   */
  secondaryTitleAsPrefix?: boolean

  /**
   * Set page description
   * @default "It’s prototyping made simple—no code required, browser-based, and free for everyone. High-fidelity in half the time."
   */
  description?: string

  /**
   * Optionally override meta tags
   */
  meta?: Meta

  /**
   * Remove default navigation height from top margin of the page
   * @default true
   */
  marginNavigation?: boolean

  /**
   * Remove default footer margin from bottom margin of the page
   * @default true
   */
  marginFooter?: boolean

  /**
   * Set navigation default accent
   */
  navigationAccent?: string

  /**
   * Set navigation default tint
   */
  navigationTint?: string

  /**
   * Set navigation default theme
   * @default "light"
   */
  navigationTheme?: keyof typeof Theme

  /**
   * Set navigation default transparency
   * @default false
   */
  navigationTransparent?: string

  /**
   * Set navigation default vibrancy
   * @default false
   */
  navigationVibrant?: string
}

export const Page: FC<HTMLProps<"html"> & Props> = ({
  children,
  theme = Theme.Light,
  title = "The prototyping tool for teams",
  secondaryTitle: secondaryDefaultTitle = "Framer",
  secondaryTitleAsPrefix = false,
  description = "It’s prototyping made simple—no code required, browser-based, and free for everyone. High-fidelity in half the time.",
  meta = {},
  marginNavigation = true,
  marginFooter = true,
  navigationAccent,
  navigationTint,
  navigationTheme = Theme.Light,
  navigationTransparent,
  navigationVibrant,
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
    <html
      {...props}
      className={clsx({
        "margin-navigation": marginNavigation,
        "margin-footer": marginFooter,
      })}
      data-theme={Theme[theme] || Theme.Light}
      data-navigation-accent={
        typeof navigationAccent === "string" ? navigationAccent : undefined
      }
      data-navigation-tint={
        typeof navigationTint === "string" ? navigationTint : undefined
      }
      data-navigation-theme={
        Theme[navigationTheme] || Theme[theme] || Theme.Light
      }
      data-navigaiton-transparent={
        typeof navigationTransparent === "boolean"
          ? navigationTransparent
          : undefined
      }
      data-navigaiton-vibrant={
        typeof navigationVibrant === "boolean" ? navigationVibrant : undefined
      }
      data-navigation-ceiling
    >
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
        <Observer />
        <Navigation />
        {children}
      </body>
    </html>
  )
}

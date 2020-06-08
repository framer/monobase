import React, { ReactNode } from "react"
import clsx from "clsx"
import styles from "./Footer.styles.css"
import { Content } from "../../primitives"
import { Component } from "../../types"

export interface Category {
  name: string
  items: Items
}

export type Categories = Category[]

export interface Item {
  name: string
  href: string
  badge?: string
  blank?: boolean
}

export interface SocialItem {
  name: string
  href: string
  icon: ReactNode
}

export type Items = Item[]

export type SocialItems = SocialItem[]

export interface Props {
  items?: Categories
  socialItems?: SocialItems
}

export const defaultItems: Categories = [
  {
    name: "Framer",
    items: [
      { name: "Updates", href: "/updates/" },
      { name: "Pricing", href: "/pricing/", badge: "New" },
      { name: "Tutorials", href: "/tutorials/", badge: "New" },
      { name: "Teams", href: "/teams/" },
      { name: "Enterprise", href: "/enterprise/" },
      { name: "Blog", href: "/blog/" },
      { name: "Motion", href: "/motion/" },
    ],
  },
  {
    name: "Platforms",
    items: [
      { name: "Web", href: "#", badge: "New" }, // TODO: CONFIG.APP
      { name: "macOS", href: "/desktop/" },
      {
        name: "iOS",
        href: "https://itunes.apple.com/app/id1124920547",
        blank: true,
      },
      {
        name: "Android",
        href:
          "https://play.google.com/store/apps/details?id=com.framerjs.android",
        blank: true,
      },
      { name: "Figma Importing", href: "/figma/" },
      { name: "Sketch Importing", href: "/sketch/" },
    ],
  },
  {
    name: "Resources",
    items: [
      { name: "Examples", href: "/examples/" },
      {
        name: "Packages",
        href: "#", // TODO: CONFIG.PACKAGES
      },
      { name: "API", href: "/api/" },
      { name: "Wallpapers", href: "/wallpapers/" },
    ],
  },
  {
    name: "About",
    items: [
      { name: "Loupe", href: "/loupe/" },
      { name: "Community", href: "/community/" },
      { name: "Company", href: "/company/" },
      { name: "Careers", href: "/careers/" },
    ],
  },
  {
    name: "Support",
    items: [
      { name: "Using Framer", href: "/support/using-framer/" },
      { name: "Accounts", href: "/support/accounts/" },
      { name: "Contact", href: "/support/contact/" },
    ],
  },
  {
    name: "Account",
    items: [
      { name: "Using Framer", href: "/support/using-framer/" },
      { name: "Accounts", href: "/support/accounts/" },
      { name: "Contact", href: "/support/contact/" },
    ],
  },
]

export const defaultSocialItems: SocialItems = [
  {
    name: "Twitter",
    href: "https://twitter.com/framer",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="100%" height="100%" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://framer.com/r/discord",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="100%" height="100%" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/framer",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="100%" height="100%" />
      </svg>
    ),
  },
]

export const Footer: Component<"footer", Props> = ({
  items = defaultItems,
  socialItems = defaultSocialItems,
  className,
  ...props
}) => (
  <footer {...props} className={clsx(styles.footer, className, "footer")}>
    <Content>
      <div className={styles.items}>
        {items.map((category, index) => (
          <div key={index}>
            <h5 className={styles.heading}>{category.name}</h5>
            <ul className={styles.list}>
              {category.items &&
                category.items.map((item, index) => {
                  return (
                    <li key={index} className={styles.item}>
                      <a
                        href={item.href}
                        target={`_${item.blank ? "blank" : "self"}`}
                      >
                        {item.name}
                        {item.badge && (
                          <span className={styles.badge}>{item.badge}</span>
                        )}
                      </a>
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
      <hr className={styles.separator} />
      <ul className={styles.social}>
        {socialItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.href} target="_blank">
                {item.icon}
              </a>
            </li>
          )
        })}
      </ul>
      <div className={styles.addendum}>
        <p>Copyright © 2020 Framer BV.</p>
        <ul>
          <li>
            <a href="#">Cookies</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Security</a>
          </li>
        </ul>
      </div>
    </Content>
  </footer>
)

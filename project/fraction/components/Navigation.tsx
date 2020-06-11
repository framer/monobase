import React, { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import { motion, AnimatePresence, Variants, Transition } from "framer-motion"
import styles from "./Navigation.styles.css"
import { dimension } from "../tokens"
import { Component, ComponentWithMotion } from "../types"
import { useEscapeKey } from "../hooks"
import { banners, Banner } from "./Banner"
import { subnavigations, Subnavigation } from "./Subnavigation"
import { Content } from "./Content"

export interface Item {
  name: string
  href: string
}

export type Items = Item[]

export interface FramerAccount {
  name?: string
  initials?: string
  avatar?: string
}

export interface Props {
  items?: Items
  account?: FramerAccount
  withHamburger: boolean
  banner?: Banner
  subnavigation?: Subnavigation
  height?: number
}

export const defaultItems: Items = [
  { name: "Examples", href: "/examples/" },
  { name: "Tutorials", href: "/tutorials/" },
  { name: "Teams", href: "/teams/" },
  {
    name: "Enterprise",
    href: "/enterprise/",
  },
  { name: "Pricing", href: "/pricing/" },
  { name: "Blog", href: "/blog/" },
  {
    name: "Support",
    href: "/support/",
  },
]

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const transitions: Record<string, Transition> = {
  ease: {
    ease: "easeInOut",
    duration: 0.16,
  },
  spring: {
    type: "spring",
    stiffness: 520,
    damping: 120,
  },
}

const NavigationItem: Component<"a"> = ({ children, className, ...props }) => (
  <li className={clsx(className, styles.item)}>
    <a {...props}>{children}</a>
  </li>
)

export const Navigation: ComponentWithMotion<"header", Props> = ({
  items = defaultItems,
  account,
  withHamburger = false,
  banner,
  subnavigation,
  height = dimension.navigationHeight,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)
  const [isVisiblyAuthenticated, setVisiblyAuthenticated] = useState(false)
  const isAuthenticated = !!account

  const Banner = banners[banner]
  const withBanner = !!Banner
  const Subnavigation = subnavigations[subnavigation]
  const withSubnavigation = !!Subnavigation

  const handleHamburgerClick = useCallback(() => {
    setOpen((isOpen) => !isOpen)
  }, [])

  const handleOverlayClick = useCallback(() => {
    setOpen(false)
  }, [])

  const handleAuthenticationAnimationComplete = useCallback(() => {
    setVisiblyAuthenticated(true)
  }, [])

  useEscapeKey(() => {
    setOpen(false)
  }, isOpen && withHamburger)

  useEffect(() => {
    if (isOpen) {
      document.documentElement.setAttribute("data-scroll", "false")
    } else {
      document.documentElement.removeAttribute("data-scroll")
    }
  }, [isOpen])

  useEffect(() => {
    setOpen(false)
  }, [withHamburger])

  return (
    <motion.header
      {...props}
      className={clsx(styles.navigation, "navigation", {
        open: isOpen,
        banner: withBanner,
        subnavigation: withSubnavigation,
      })}
      variants={{
        close: {
          height,
        },
        open: {
          height: "auto",
        },
      }}
      initial="close"
      animate={isOpen ? "open" : "close"}
      transition={transitions.spring}
    >
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <div className={styles.background} />
      <Content as="nav">
        <div className={styles.controls}>
          <button
            className={styles.hamburger}
            onClick={handleHamburgerClick}
            tabIndex={1}
          >
            <svg viewBox="0 0 20 20">
              <g>
                <path
                  d="M 0,0 h 12"
                  strokeWidth={2}
                  stroke="currentColor"
                  strokeLinecap="round"
                />
                <path
                  d="M 0,0 h 12"
                  strokeWidth={2}
                  stroke="currentColor"
                  strokeLinecap="round"
                />
                <path
                  d="M 0,0 h 12"
                  strokeWidth={2}
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </button>
          <a className={styles.logo} href="/" tabIndex={2}>
            <svg
              xmlns="http:www.w3.org/2000/svg"
              viewBox="0 0 14 21"
              role="presentation"
            >
              <path d="M 0 0 L 14 0 L 14 7 L 7 7 Z" fill="currentColor" />
              <path d="M 0 7 L 7 7 L 14 14 L 0 14 Z" fill="currentColor" />
              <path d="M 0 14 L 7 14 L 7 21 Z" fill="currentColor" />
            </svg>
            <span className={styles.wordmark}>Framer</span>
          </a>
        </div>
        <ul className={styles.list}>
          <AnimatePresence>
            {items.map((item, index) => (
              <NavigationItem
                key={index}
                href={item.href}
                tabIndex={withHamburger && !isOpen ? -1 : 4}
              >
                {item.name}
              </NavigationItem>
            ))}
          </AnimatePresence>
        </ul>
        <ul
          className={clsx(styles.authentication, {
            authenticated: isVisiblyAuthenticated,
          })}
        >
          <AnimatePresence initial={false}>
            {!isAuthenticated && (
              <motion.li
                key="signin"
                className={clsx("signin", styles.item)}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={transitions.ease}
              >
                <a href="#" tabIndex={withHamburger && !isOpen ? -1 : 4}>
                  Sign in
                </a>
              </motion.li>
            )}
          </AnimatePresence>
          <li className={clsx(styles.item, "signup")}>
            <a
              href="#"
              className={styles.signup}
              tabIndex={withHamburger ? 3 : 4}
            >
              <AnimatePresence
                initial={false}
                exitBeforeEnter
                onExitComplete={handleAuthenticationAnimationComplete}
              >
                {isAuthenticated ? (
                  <motion.div
                    className={clsx(styles.signupContent, "authenticated")}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={transitions.ease}
                    key="authenticated"
                  >
                    <div className={styles.avatar}>
                      <span className={styles.initials}>
                        {account.initials}
                      </span>
                      {account.avatar && (
                        <img src={account.avatar} alt="avatar" />
                      )}
                    </div>
                    <span className={styles.label}>
                      <span className={styles.sublabel}>Open&nbsp;</span>Framer
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    className={clsx(styles.signupContent, "unauthenticated")}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={transitions.ease}
                    key="unauthenticated"
                  >
                    <span className={styles.label}>
                      Sign up
                      <span className={styles.sublabel}>&nbsp;for free</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          </li>
        </ul>
      </Content>
      {withBanner && (
        <div className={clsx(styles.banner, "banner")}>
          <Banner />
        </div>
      )}
      {withSubnavigation && (
        <div className={clsx(styles.subnavigation, "subnavigation")}>
          <Subnavigation />
        </div>
      )}
    </motion.header>
  )
}

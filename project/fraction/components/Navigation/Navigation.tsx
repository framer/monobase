import React, { useCallback, useEffect, useState, isValidElement } from "react"
import clsx from "clsx"
import { motion, AnimatePresence, Transition } from "framer-motion"
import styles from "./Navigation.styles.css"
import { dimension } from "../../tokens"
import { ComponentWithMotion } from "../../types"
import { useEscapeKey } from "../../hooks"
import { Content } from "../../primitives/Content"
import { NavigationItem } from "./NavigationItem"
import { NavigationSignup } from "./NavigationSignup"
import { banners, Banner } from "./banners"

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

export const Navigation: ComponentWithMotion<"header", Props> = ({
  items = defaultItems,
  account,
  withHamburger = false,
  banner,
  height = dimension.navigationHeight,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)
  const [isVisiblyAuthenticated, setVisiblyAuthenticated] = useState(false)
  const isAuthenticated = !!account

  const Banner = banners[banner]
  const withBanner = !!Banner

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
      {withBanner && (
        <div className={styles.banner}>
          <Banner />
        </div>
      )}
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
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                  },
                }}
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
          <NavigationSignup
            href="#"
            tabIndex={withHamburger ? 3 : 4}
            account={account}
            onAuthenticationAnimationComplete={
              handleAuthenticationAnimationComplete
            }
          />
        </ul>
      </Content>
    </motion.header>
  )
}

import React, { useCallback, useEffect, useState, FC } from "react"
import clsx from "clsx"
import { motion, AnimatePresence, Transition } from "framer-motion"
import styles from "./Navigation.styles.css"
import { dimension } from "../../tokens"
import { HTMLPropsWithMotion } from "../../types"
import { useEscapeKey } from "../../hooks"
import { Content } from "../Content"
import { NavigationItem } from "./NavigationItem"
import { NavigationSignup } from "./NavigationSignup"

export interface Item {
  label: string
  href: string
}

export type Items = Record<string, Item>

export interface FramerAccount {
  name?: string
  initials?: string
  avatar?: string
}

export interface Props {
  items?: Items
  account?: FramerAccount
  withHamburger: boolean
}

export const defaultItems: Items = {
  examples: { label: "Examples", href: "/examples/" },
  tutorials: { label: "Tutorials", href: "/tutorials/" },
  teams: { label: "Teams", href: "/teams/" },
  enterprise: {
    label: "Enterprise",
    href: "/enterprise/",
  },
  pricing: { label: "Pricing", href: "/pricing/" },
  blog: { label: "Blog", href: "/blog/" },
  support: {
    label: "Support",
    href: "/support/",
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

export const Navigation: FC<HTMLPropsWithMotion<"nav"> & Props> = ({
  items = defaultItems,
  account,
  withHamburger = false,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false)
  const [isVisiblyAuthenticated, setVisiblyAuthenticated] = useState(false)
  const isAuthenticated = !!account

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
    <motion.nav
      {...props}
      className={clsx(styles.navigation, "navigation", { open: isOpen })}
      variants={{
        close: {
          height: dimension.navigationHeight,
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
      <Content>
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
            {Object.keys(items).map((item, index) => (
              <NavigationItem
                key={index}
                href={items[item].href}
                tabIndex={withHamburger && !isOpen ? -1 : 4}
              >
                {items[item].label}
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
    </motion.nav>
  )
}

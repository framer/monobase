import * as React from "react"
import { useCallback, useState, FC } from "react"
import clsx from "clsx"
import { motion, AnimatePresence, MotionProps, Transition } from "framer-motion"
import styles from "./Navigation.styles.css"
import { Content } from "../Content"
import { dimension } from "../../tokens"
import { useEscapeKey, useIsomorphicLayoutEffect } from "../../hooks"

export interface Item {
  label: string
  href: string
}

export type Items = Record<string, Item>

export interface Props extends MotionProps {
  items?: Items
}

export const defaultItems: Items = {
  examples: { label: "Examples", href: "/examples/" },
  tutorials: { label: "Tutorials", href: "/tutorials/" },
  learn: { label: "Learn", href: "/learn/" },
  teams: { label: "Teams", href: "/teams/" },
  enterprise: {
    label: "Enterprise",
    href: "/enterprise/",
  },
  blog: { label: "Blog", href: "/blog/" },
  support: {
    label: "Support",
    href: "/support/",
  },
  pricing: { label: "Pricing", href: "/pricing/" },
}

const transitions: Record<string, Transition> = {
  ease: {
    ease: [0.5, 0.1, 0.1, 1.1],
    duration: 0.32,
  },
  spring: {
    type: "spring",
    stiffness: 520,
    damping: 120,
  },
}

export const Navigation: FC<Props> = ({ items = defaultItems, ...props }) => {
  const [isOpen, setOpen] = useState(false)
  const [isMobile, setMobile] = useState(false)

  const handleHamburgerClick = useCallback(() => {
    setOpen((isOpen) => !isOpen)
  }, [])

  const handleOverlayClick = useCallback(() => {
    setOpen(false)
  }, [])

  useEscapeKey(() => {
    setOpen(false)
  }, isOpen && isMobile)

  useIsomorphicLayoutEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 740px)")
    const addMediaQueryListener = (
      callback: (event?: MediaQueryListEvent) => void
    ) =>
      desktopMediaQuery.addEventListener instanceof Function
        ? desktopMediaQuery.addEventListener("change", callback)
        : desktopMediaQuery.addListener(callback)

    addMediaQueryListener(({ matches }) => {
      setMobile(!matches)

      if (matches) {
        setOpen(false)
      }
    })

    setMobile(!desktopMediaQuery.matches)
  }, [])

  return (
    <motion.nav
      {...props}
      className={clsx(styles.navigation, { open: isOpen })}
      variants={{
        close: {
          height: dimension.navigationBarHeight,
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
      <Content className="content">
        <div className={styles.main}>
          <button
            className={styles.hamburger}
            onClick={handleHamburgerClick}
            tabIndex={1}
          />
          <a className={styles.logo} href="/" tabIndex={2}>
            <svg
              xmlns="http:
              www.w3.org/2000/svg"
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
        <motion.ul
          className={styles.items}
          animate
          transition={transitions.ease}
        >
          <AnimatePresence>
            {Object.keys(items).map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                initial="visible"
                exit="hidden"
                animate
                transition={transitions.ease}
              >
                <a
                  href={items[item].href}
                  tabIndex={isMobile && !isOpen ? -1 : 3}
                >
                  {items[item].label}
                </a>
              </motion.li>
            ))}
            <motion.li
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="visible"
              exit="hidden"
              animate
              transition={transitions.ease}
              className="secondaryCta"
            >
              <a href="#" tabIndex={isMobile && !isOpen ? -1 : 3}>
                Sign in
              </a>
            </motion.li>
          </AnimatePresence>
        </motion.ul>
      </Content>
    </motion.nav>
  )
}

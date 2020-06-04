import React, { FC } from "react"
import clsx from "clsx"
import { motion, AnimatePresence, Variants } from "framer-motion"
import styles from "./Navigation.styles.css"
import { FramerAccount, transitions } from "./Navigation"
import { HTMLProps } from "../../types"

interface Props {
  account?: FramerAccount
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const NavigationSignup: FC<HTMLProps<"a"> & Props> = ({
  account,
  className,
  ...props
}) => {
  const isAuthenticated = !!account

  return (
    <li className={clsx(styles.item, "signup")}>
      <a {...props} className={clsx(className, styles.signup)}>
        <AnimatePresence initial={false} exitBeforeEnter>
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
                <span className={styles.initials}>{account.initials}</span>
                {account.avatar && <img src={account.avatar} alt="avatar" />}
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
  )
}

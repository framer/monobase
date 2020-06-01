import * as React from "react"
import { FC } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import styles from "./Navigation.styles.css"
import { FramerAccount, transitions } from "./Navigation"
import { HTMLPropsWithMotion } from "../../types"

interface Props {
  account?: FramerAccount
}

export const NavigationSignup: FC<HTMLPropsWithMotion<"a"> & Props> = ({
  account,
  className,
  ...props
}) => (
  <motion.li
    className={clsx(styles.item, "signup")}
    animate
    transition={transitions.ease}
  >
    <motion.a
      {...props}
      className={clsx(className, styles.signup)}
      animate
      transition={transitions.ease}
    >
      <div className={styles.avatar} />
      <span className={styles.label}>
        <span className={styles.sublabel}>Open&nbsp;</span>Framer
      </span>
    </motion.a>
  </motion.li>
)

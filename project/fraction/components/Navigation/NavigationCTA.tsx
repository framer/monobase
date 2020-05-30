import * as React from "react"
import { FC } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import styles from "./NavigationCTA.styles.css"
import { transitions } from "./Navigation"

interface Props extends HTMLMotionProps<"a"> {}

export const NavigationCTA: FC<Props> = ({ ...props }) => (
  <motion.a
    {...props}
    href="#"
    className={styles.cta}
    animate
    transition={transitions.ease}
  >
    <div className={styles.avatar} />
    <span className={styles.label}>
      <span className={styles.secondaryLabel}>Open&nbsp;</span>Framer
    </span>
  </motion.a>
)

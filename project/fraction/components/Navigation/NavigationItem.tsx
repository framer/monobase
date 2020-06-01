import * as React from "react"
import { FC } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import styles from "./Navigation.styles.css"
import { transitions } from "./Navigation"
import { HTMLProps } from "../../types"

export const NavigationItem: FC<HTMLProps<"a">> = ({
  children,
  className,
  ...props
}) => (
  <motion.li
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }}
    initial="visible"
    exit="hidden"
    animate
    transition={transitions.ease}
    className={clsx(className, styles.item)}
  >
    <a {...props}>{children}</a>
  </motion.li>
)

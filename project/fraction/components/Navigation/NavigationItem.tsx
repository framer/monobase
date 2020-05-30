import * as React from "react"
import { FC, ComponentPropsWithoutRef } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"
import styles from "./Navigation.styles.css"
import { transitions } from "./Navigation"

interface Props extends ComponentPropsWithoutRef<"a"> {
  cta?: boolean
}

export const NavigationItem: FC<Props> = ({
  children,
  cta = false,
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
    className={clsx(styles.item, { cta })}
  >
    <a {...props}>{children}</a>
  </motion.li>
)

import React from "react"
import clsx from "clsx"
import styles from "./Video.styles.css"
import { Element } from "./Element"
import { Component } from "../types"

export const Video: Component<"video"> = ({
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className,
  ...props
}) => (
  <Element
    as="video"
    autoPlay={autoPlay}
    loop={loop}
    muted={muted}
    playsInline={playsInline}
    className={clsx(styles.video, className)}
    {...props}
  />
)

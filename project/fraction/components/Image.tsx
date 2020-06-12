import React from "react"
import clsx from "clsx"
import styles from "./Image.styles.css"
import { Element } from "./Element"
import { Component } from "../types"
import { parsePath } from "../utils"

export interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  webp?: boolean
  cover?: boolean
  loading?: "lazy" | "eager"
}

export const Image: Component<"picture", Props> = ({
  src,
  alt,
  width,
  height,
  webp,
  cover,
  loading = "lazy",
  className,
  ...props
}) => {
  const { location, file, extension } = parsePath(src)
  const isRetina = file.endsWith("@2x")

  const webpSrc = `${location}${file}.webp`
  const imgSrcSet = isRetina
    ? `${location}${file.replace("@2x", "")}${extension}, ${src} 2x`
    : src
  const webpSrcSet = isRetina
    ? `${location}${file.replace("@2x", "")}.webp, ${webpSrc} 2x`
    : webpSrc

  return (
    <Element
      as="picture"
      className={clsx(styles.picture, className)}
      {...props}
    >
      {webp && <source type="image/webp" src={webpSrc} srcSet={webpSrcSet} />}
      <img
        src={src}
        srcSet={imgSrcSet}
        className={clsx(styles.image, { cover })}
        loading={loading}
        alt={alt}
        width={width}
        height={height}
      />
    </Element>
  )
}

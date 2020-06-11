import React from "react"
import * as icons from "../icons"
import { Component } from "../types"
import { capitalize } from "../utils"

export type Icons =
  | "socialDiscord"
  | "socialDribbble"
  | "socialFacebook"
  | "socialGoogle"
  | "socialLinkedIn"
  | "socialSlack"
  | "socialSpectrum"
  | "socialTwitter"

export interface Props {
  icon?: Icons
}

export const Icon: Component<"svg", Props, "icon"> = ({ icon, ...props }) => {
  const IconTag =
    typeof icon === "string" ? icons[`Icon${capitalize(icon)}`] : undefined

  return IconTag === undefined ? null : <IconTag {...props} />
}

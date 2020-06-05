import React from "react"
import { createInnerHTML } from "../../utils"
import { Component } from "../../types"

interface Props {
  children?: string
}

export const Script: Component<"script", Props> = ({ children, ...props }) => (
  <script {...props} dangerouslySetInnerHTML={createInnerHTML(children)} />
)

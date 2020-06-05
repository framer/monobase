import React from "react"
import { createInnerHTML } from "../../utils"
import { Component } from "../../types"

interface Props {
  children?: string
}

export const Style: Component<"style", Props> = ({ children, ...props }) => (
  <style {...props} dangerouslySetInnerHTML={createInnerHTML(children)} />
)

import React, { FC } from "react"
import { createInnerHTML } from "../../utils"
import { HTMLProps } from "../../types"

interface Props {
  children?: string
}

export const Script: FC<HTMLProps<"script"> & Props> = ({
  children,
  ...props
}) => <script {...props} dangerouslySetInnerHTML={createInnerHTML(children)} />

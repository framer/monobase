import React, { FC } from "react"
import { createInnerHTML } from "../../utils"
import { HTMLProps } from "../../types"

interface Props {
  children?: string
}

export const Style: FC<HTMLProps<"style"> & Props> = ({
  children,
  ...props
}) => <style {...props} dangerouslySetInnerHTML={createInnerHTML(children)} />

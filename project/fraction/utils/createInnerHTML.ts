import { DOMAttributes } from "react"

export const createInnerHTML = (
  html: string
): DOMAttributes<Element>["dangerouslySetInnerHTML"] => ({
  __html: html,
})

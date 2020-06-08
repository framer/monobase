import { DOMAttributes } from "react"

export const createInnerHTML = (
  html: string
): DOMAttributes<Element>["dangerouslySetInnerHTML"] => ({
  __html: html.replace(/\n/g, "").replace(/\s\s+/g, " "),
})

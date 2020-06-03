import React, { FC } from "react"
import { Script, HTMLProps } from "fraction"

export const Authentication: FC<HTMLProps<"script">> = () => (
  <Script>{`
  const key = "framerAccount"

  setTimeout(() => {
    const isAuthenticated = !!Math.round(Math.random())
    const account = isAuthenticated ? JSON.stringify({
      name: "Marc Bouchenoire",
      initials: "MB"
    }) : undefined

    window.sessionStorage.setItem(key, account)
    window.dispatchEvent(new CustomEvent("storagestatechange", {
      detail: { storage: "sessionStorage", key, value: account }
    }))
  }, 300)
  `}</Script>
)

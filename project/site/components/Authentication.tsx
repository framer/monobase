import React from "react"
import { Script, Component } from "fraction"

export const Authentication: Component<"script"> = () => (
  <Script>{`
    const key = "framerAccount";

    setTimeout(() => {
      const account = JSON.stringify({
        name: "Marc Bouchenoire",
        initials: "MB",
        avatar: "https://picsum.photos/id/326/64"
      });

      window.sessionStorage.setItem(key, account);
      window.dispatchEvent(new CustomEvent("storagestatechange", {
        detail: { storage: "sessionStorage", key, value: account }
      }));
    }, 300);
  `}</Script>
)

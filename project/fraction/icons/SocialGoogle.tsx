import React from "react"
import { Component } from "../types"

export const SocialGoogle: Component<"svg"> = ({ width = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M5.89 8.86a7 7 0 0110.94-2.04l-2.01 2.01a3.78 3.78 0 00-2.68-1.05 4.17 4.17 0 00-3.91 2.89 4.2 4.2 0 000 2.66 4.2 4.2 0 006.29 2.22 3.23 3.23 0 001.39-2.12h-3.77v-2.7h6.6c.08.45.12.93.12 1.43 0 2.13-.76 3.92-2.09 5.14a6.68 6.68 0 01-4.63 1.7A7 7 0 015.88 8.86h.01z"
      fill="currentColor"
    />
  </svg>
)

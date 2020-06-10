import React from "react"
import { Component } from "../types"

export const SocialLinkedIn: Component<"svg"> = ({ width = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={width}
    role="presentation"
    {...props}
  >
    <desc>LinkedIn</desc>
    <path
      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2zm4.25 9.725V8.402H5.125v6.323zM6.199 7.538c.724 0 1.191-.49 1.191-1.096-.023-.619-.467-1.097-1.191-1.097s-1.191.467-1.191 1.097c0 .606.467 1.096 1.168 1.096zm4.332 7.187V11.19c0-.187.024-.373.07-.513a1.168 1.168 0 011.086-.77c.771 0 1.074.583 1.074 1.435v3.383h2.114v-3.628c0-1.949-1.051-2.847-2.429-2.847-1.121 0-1.634.618-1.915 1.05v-.898H8.418c.023.583 0 6.276 0 6.323z"
      fill="currentColor"
    />
  </svg>
)

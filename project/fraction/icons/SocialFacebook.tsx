import React from "react"
import { Component } from "../types"

export const SocialFacebook: Component<"svg"> = ({ width = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M6 12.04A6.02 6.02 0 0112 6c3.31 0 6 2.7 6 6.04 0 3.01-2.2 5.5-5.06 5.96v-4.22h1.4l.26-1.74h-1.66V10.9c0-.47.23-.94.97-.94h.76V8.47s-.69-.11-1.34-.11c-1.37 0-2.27.83-2.27 2.35v1.33H9.54v1.74h1.52V18A6.03 6.03 0 016 12.04z"
      fill="currentColor"
    />
  </svg>
)

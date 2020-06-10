import React from "react"
import { Component } from "../types"

export const SocialFacebook: Component<"svg"> = ({ width = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={width}
    role="presentation"
    {...props}
  >
    <desc>Facebook</desc>
    <path
      d="M2 10.053A8.028 8.028 0 0110 2c4.413 0 8 3.6 8 8.053A8.049 8.049 0 0111.253 18v-5.627h1.867l.347-2.32h-2.214v-1.52c0-.626.307-1.253 1.294-1.253h1.013V5.293s-.92-.146-1.787-.146c-1.826 0-3.026 1.106-3.026 3.133v1.773H6.72v2.32h2.027V18A8.04 8.04 0 012 10.053z"
      fill="currentColor"
    />
  </svg>
)

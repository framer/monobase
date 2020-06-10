import React from "react"
import { Component } from "../types"

export const SocialSpectrum: Component<"svg"> = ({ width = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M 6 11 C 6 11.476 6.524 12 7 12 L 7.5 12 C 9.723 12 11.953 13.755 11.953 15.978 L 12 17.5 C 12 17.976 12.524 18 13 18 L 17 18 C 17.476 18 18 17.976 18 17.5 L 18 16.5 C 18 11.101 12.899 6 7.5 6 L 7 6 C 6.524 6 6 6.524 6 7 Z"
      fill="currentColor"
    />
  </svg>
)

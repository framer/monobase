import React from "react"
import { Component } from "../types"

export const SocialSpectrum: Component<"svg"> = ({ width = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={width}
    role="presentation"
    {...props}
  >
    <desc>Spectrum</desc>
    <path
      d="M3 3.933C3 3.418 3.418 3 3.933 3h.817C11.515 3 17 8.485 17 15.25v.817a.933.933 0 01-.933.933h-5.134a.933.933 0 01-.933-.933v-.817A5.25 5.25 0 004.75 10h-.817A.933.933 0 013 9.067z"
      fill="currentColor"
    />
  </svg>
)

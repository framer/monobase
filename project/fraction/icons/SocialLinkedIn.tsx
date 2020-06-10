import React from "react"
import { Component } from "../types"

export const SocialLinkedIn: Component<"svg"> = ({ width = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M6 6.86c0-.48.4-.86.89-.86H17.1c.5 0 .89.38.89.86v10.28c0 .47-.4.86-.89.86H6.9a.87.87 0 01-.89-.86zm3.64 9.19v-5.42H7.82v5.42zm-.9-6.16c.62 0 1.02-.42 1.02-.94-.02-.53-.4-.94-1.02-.94s-1.02.4-1.02.94c0 .52.4.94 1 .94zm1.9 6.16zm1.81 0v-3.03c0-.16.02-.32.06-.44a1 1 0 01.93-.66c.66 0 .92.5.92 1.23v2.9h1.81v-3.11c0-1.67-.9-2.44-2.08-2.44-.96 0-1.4.53-1.64.9v-.77h-1.81c.02.5 0 5.38 0 5.42z"
      fill="currentColor"
    />
  </svg>
)

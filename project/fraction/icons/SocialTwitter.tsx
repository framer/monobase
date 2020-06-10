import React from "react"
import { Component } from "../types"

export const SocialTwitter: Component<"svg"> = ({ width = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={width}
    role="presentation"
    {...props}
  >
    <desc>Twitter</desc>
    <path
      d="M18 3.506a7.957 7.957 0 01-2.283 1.109 3.27 3.27 0 00-3.621-.902A3.249 3.249 0 0010 6.789v.726a7.771 7.771 0 01-6.546-3.283S.546 10.753 7.09 13.651A8.467 8.467 0 012 15.099c6.546 3.623 14.546 0 14.546-8.332a3.274 3.274 0 00-.059-.601A5.594 5.594 0 0018 3.506z"
      fill="currentColor"
    />
  </svg>
)

import React from "react"
import { Component } from "../types"

export const SocialTwitter: Component<"svg"> = ({ width = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M 18.5 7.005 C 17.935 7.381 17.308 7.669 16.645 7.858 C 15.92 7.069 14.742 6.791 13.703 7.164 C 12.662 7.543 11.983 8.486 12 9.53 L 12 10.088 C 9.885 10.136 7.886 9.187 6.681 7.563 C 6.681 7.563 4.319 12.579 9.636 14.808 C 8.422 15.587 6.971 15.978 5.5 15.922 C 10.819 18.709 17.319 15.922 17.319 9.513 C 17.318 9.358 17.302 9.203 17.271 9.051 C 17.875 8.488 18.3 7.78 18.5 7.005 Z"
      fill="currentColor"
    />
  </svg>
)

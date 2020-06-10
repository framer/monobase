import React from "react"
import { Component } from "../types"

export const SocialMedium: Component<"svg"> = ({ width = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M17.898 16.639c-.009-.066-.012-9.066.003-9.146C17.916 7.414 19 6 19 6h-3.671l-2.96 7.5L9.22 6H5.444l1.247 1.946c.065.084.086.135.092.2.006.064 0 7.119-.019 7.192C6.746 15.412 5 18 5 18h4.001s-1.746-2.588-1.765-2.663c-.017-.072-.013-6.671-.013-6.671.08.236 4.04 9.334 4.04 9.334l3.515-9.23s-.003 7.807-.011 7.875c-.008.069-1.1 1.355-1.1 1.355H19s-1.095-1.295-1.102-1.361z"
      fill="currentColor"
    />
  </svg>
)

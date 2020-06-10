import React from "react"
import { Component } from "../types"

export const SocialGoogle: Component<"svg"> = ({ width = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={width}
    role="presentation"
    {...props}
  >
    <desc>Google</desc>
    <path
      d="M3.013 6.422C4.16 4.193 6.301 2.617 8.802 2.16a8.27 8.27 0 016.966 1.928l-2.344 2.3A4.45 4.45 0 0010.3 5.187c-2.085.028-3.919 1.358-4.559 3.306a4.716 4.716 0 000 3.042 4.848 4.848 0 003.028 3.047 4.979 4.979 0 004.306-.507 3.693 3.693 0 001.62-2.425H10.3V8.561h7.694c.094.515.14 1.064.14 1.636 0 2.436-.886 4.484-2.436 5.88a7.879 7.879 0 01-5.398 1.944c-2.832.002-5.462-1.437-6.949-3.801a7.877 7.877 0 01-.35-7.798z"
      fill="currentColor"
    />
  </svg>
)

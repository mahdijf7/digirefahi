import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.778 15.111a2 2 0 100-3.999 2 2 0 000 4zm0-9.333a2 2 0 100-4 2 2 0 000 4zm-8 4.667a2 2 0 100-4 2 2 0 000 4z"
        stroke="#0877BD"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.111 4.778L5.444 7.445m0 2l4.667 2.666"
        stroke="#0877BD"
        strokeWidth={1.2}
      />
    </svg>
  )
}

export default SvgComponent

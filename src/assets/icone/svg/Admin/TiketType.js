import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={13}
      height={14}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.792 7L6.5 8.896 9.21 7"
        stroke="#7F7F7F"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.083 11.333V5.447a1.083 1.083 0 01.526-.93l4.333-2.6a1.083 1.083 0 011.115 0l4.333 2.6a1.083 1.083 0 01.526.93v5.886a1.083 1.083 0 01-1.083 1.084H2.166a1.083 1.083 0 01-1.083-1.084z"
        stroke="#7F7F7F"
        strokeWidth={1.1}
      />
    </svg>
  )
}

export default SvgComponent

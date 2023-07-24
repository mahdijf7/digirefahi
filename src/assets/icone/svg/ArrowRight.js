import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 6.5h10.417m0 0l-5-5m5 5l-5 5"
        stroke="#fff"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.666 9.667h6.667m-5-3.334h5M14 3h3.333M9 13h8.333M3.166 14.667V1.333m0 13.334l-2.5-2.5m2.5 2.5l2.5-2.5m-2.5-10.834l-2.5 2.5m2.5-2.5l2.5 2.5"
        stroke="#000"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

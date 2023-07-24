import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={16}
      height={9}
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.625 7l-1.856-2.547M8 8.125V5.5M2.375 7l1.852-2.541M1.25 1c2.7 6 10.8 6 13.5 0"
        stroke="#0877BD"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent








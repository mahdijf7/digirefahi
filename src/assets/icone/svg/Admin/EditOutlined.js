import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.25}
        width={25.5}
        height={25.5}
        rx={4.75}
        fill="#EDFBFF"
      />
      <path
        d="M7.006 19h11.989M13.148 8.885L15.032 7l3.297 3.3-1.884 1.885m-3.297-3.3l-3.734 3.738a.667.667 0 00-.196.472v3.024h3.022c.176 0 .346-.07.47-.196l3.735-3.738m-3.297-3.3l3.297 3.3"
        stroke="#0877BD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={0.25}
        y={0.25}
        width={25.5}
        height={25.5}
        rx={4.75}
        stroke="#0877BD"
        strokeWidth={0.5}
      />
    </svg>
  )
}

export default SvgComponent

import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.96 14h11.99M9.103 3.885L10.987 2l3.297 3.3L12.4 7.185m-3.297-3.3L5.37 7.623a.667.667 0 00-.195.472v3.024h3.02c.177 0 .347-.07.472-.196L12.4 7.185m-3.297-3.3l3.297 3.3"
        stroke="#0877BD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

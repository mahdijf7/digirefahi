import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={7}
      height={2}
      viewBox="0 0 7 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 1h5" stroke="#0877BD" strokeLinecap="round" />
    </svg>
  )
}

export default SvgComponent

import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.63 11.667h8.74a.35.35 0 00.346-.293l1.05-6.3a.35.35 0 00-.346-.407H1.58a.35.35 0 00-.346.407l1.05 6.3a.35.35 0 00.346.293z"
        stroke="#7F7F7F"
        strokeWidth={1.1}
      />
      <path
        d="M4.083 4.667V3.5A1.167 1.167 0 015.25 2.333h3.5A1.167 1.167 0 019.916 3.5v1.167"
        stroke="#7F7F7F"
        strokeWidth={1.1}
      />
    </svg>
  )
}

export default SvgComponent

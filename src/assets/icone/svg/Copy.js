import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.167 16.667H8a.5.5 0 01-.5-.5V8a.5.5 0 01.5-.5h8.167a.5.5 0 01.5.5v8.167a.5.5 0 01-.5.5z"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 7.5V3.833a.5.5 0 00-.5-.5H3.833a.5.5 0 00-.5.5V12a.5.5 0 00.5.5H7.5"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

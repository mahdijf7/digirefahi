import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.643 15.5H17a.5.5 0 00.5-.5V9.667a3.333 3.333 0 00-3.333-3.334H5.833A3.333 3.333 0 002.5 9.667V15a.5.5 0 00.5.5h2.357m1.31-9.167V3.5a.5.5 0 01.5-.5h5.666a.5.5 0 01.5.5v2.833"
        stroke="#fff"
        strokeWidth={1.2}
      />
      <path
        d="M5.082 17.43l.275-1.93.415-2.904a.5.5 0 01.495-.43h7.466a.5.5 0 01.495.43l.414 2.904.276 1.93a.5.5 0 01-.495.57H5.576a.5.5 0 01-.495-.57z"
        stroke="#fff"
        strokeWidth={1.2}
      />
      <path
        d="M14.167 8.842l.008-.01"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="#fff"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 9c-1.417 2.243-3.961 4.5-6.75 4.5-2.788 0-5.333-2.257-6.75-4.5C3.974 6.869 5.994 4.5 9 4.5s5.026 2.369 6.75 4.5z"
        stroke="#fff"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

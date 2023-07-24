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
        d="M9 0a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm0 7.875c3.004 0 9 1.496 9 4.5V18H0v-3.375c0-3.004 5.996-4.5 9-4.5zm0 2.137c-3.341 0-6.862 1.643-6.862 2.363v1.238h13.725v-1.238c0-.72-3.522-2.363-6.863-2.363z"
        fill="#0877BD"
      />
    </svg>
  )
}

export default SvgComponent

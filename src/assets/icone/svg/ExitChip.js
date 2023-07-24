import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={8}
      height={8}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.675.33a.581.581 0 00-.823 0L4 3.179 1.147.325a.582.582 0 10-.822.823L3.177 4 .325 6.853a.582.582 0 10.822.822L4 4.823l2.852 2.852a.582.582 0 00.823-.822L4.822 4l2.853-2.852a.585.585 0 000-.817z"
        fill="#0877BD"
      />
    </svg>
  )
}

export default SvgComponent

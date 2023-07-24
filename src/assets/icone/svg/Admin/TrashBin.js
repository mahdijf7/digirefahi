import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={12}
      height={13}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.833 1.7l2.283.913a.3.3 0 01.186.318L9.464 9.22a2 2 0 01-.99 1.472l-.16.091a5 5 0 01-4.962 0l-.16-.091a2 2 0 01-.99-1.472l-.849-6.372a.3.3 0 01.085-.252l.895-.895 2.409.75m3.091-.75h-2.75l-.341.75m3.091-.75l-1 2.5M4.742 2.45l-.409 1.5m-3-.75c1.286 1.333 7.715 1.333 9 0"
        stroke="#0877BD"
      />
    </svg>
  )
}

export default SvgComponent

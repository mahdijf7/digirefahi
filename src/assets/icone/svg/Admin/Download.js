import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={11}
      height={10}
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.192.833H2.807a1.4 1.4 0 00-.952.366 1.206 1.206 0 00-.394.884v.834c0 .331.142.65.394.883a1.4 1.4 0 00.952.367h5.385c.357 0 .7-.132.952-.367.252-.234.394-.552.394-.883v-.834c0-.331-.142-.65-.394-.884a1.4 1.4 0 00-.952-.366z"
        stroke="#0877BD"
        strokeWidth={0.8}
      />
      <path
        d="M1.46 6.667V7.5c0 .442.19.866.527 1.179.336.312.793.488 1.269.488h4.487c.476 0 .933-.176 1.27-.488.336-.313.525-.737.525-1.179v-.833m-4.039-2.5V7.5m0 0L4.153 6.25M5.5 7.5l1.347-1.25"
        stroke="#0877BD"
        strokeWidth={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent

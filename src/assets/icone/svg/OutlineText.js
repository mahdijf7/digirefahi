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
        d="M12.411 2.222l5.367 5.367v10.189H2.222V2.222h10.19zm0-2.222H2.222C1 0 0 1 0 2.222v15.556C0 19 1 20 2.222 20h15.556C19 20 20 19 20 17.778V7.588c0-.588-.233-1.155-.656-1.566L13.978.656A2.185 2.185 0 0012.41 0zM4.444 13.333h11.112v2.223H4.444v-2.223zm0-4.444h11.112v2.222H4.444V8.89zm0-4.445h7.778v2.223H4.444V4.444z"
        fill="#0877BD"
      />
    </svg>
  )
}

export default SvgComponent

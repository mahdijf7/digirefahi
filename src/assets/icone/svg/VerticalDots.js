import * as React from "react";
const SvgVerticalDots = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={21} height={21} rx={4.5} stroke="#0877BD" />
    <path
      d="M10.75 7.5c.963 0 1.75-.787 1.75-1.75S11.713 4 10.75 4 9 4.787 9 5.75s.787 1.75 1.75 1.75Zm0 1.75C9.787 9.25 9 10.037 9 11s.787 1.75 1.75 1.75 1.75-.787 1.75-1.75-.787-1.75-1.75-1.75Zm0 5.25c-.963 0-1.75.787-1.75 1.75 0 .962.787 1.75 1.75 1.75s1.75-.788 1.75-1.75c0-.963-.787-1.75-1.75-1.75Z"
      fill="#0877BD"
    />
  </svg>
);
export default SvgVerticalDots;

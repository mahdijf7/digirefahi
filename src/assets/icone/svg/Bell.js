import * as React from "react";
const SvgBell = (props) => (
  <svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.267 10.346V8.629H13.94v1.992c0 .176.07.345.194.469l1.797 1.797v1.053H1.328v-1.053l1.796-1.797a.664.664 0 0 0 .195-.47V7.967a5.3 5.3 0 0 1 7.965-4.593V1.89a6.569 6.569 0 0 0-1.99-.529V0H7.965v1.36A6.647 6.647 0 0 0 1.99 7.967v2.38L.194 12.143a.664.664 0 0 0-.194.47v1.99a.664.664 0 0 0 .664.664H5.31v.664a3.319 3.319 0 1 0 6.638 0v-.664h4.647a.664.664 0 0 0 .664-.664v-1.99a.663.663 0 0 0-.195-.47l-1.797-1.797Zm-4.646 5.585a1.991 1.991 0 1 1-3.983 0v-.664h3.983v.664Z"
      fill="#0877BD"
    />
  </svg>
);
export default SvgBell;

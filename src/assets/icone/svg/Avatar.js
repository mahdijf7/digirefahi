import * as React from "react";
const SvgAvatar = (props) => (
  <svg
    width={52}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M26 44.72c-6.5 0-12.246-3.328-15.6-8.32.078-5.2 10.4-8.06 15.6-8.06 5.2 0 15.522 2.86 15.6 8.06A18.804 18.804 0 0 1 26 44.72ZM26 7.8a7.8 7.8 0 1 1 0 15.6 7.8 7.8 0 0 1 0-15.6ZM26 0a26 26 0 1 0 26 26C52 11.622 40.3 0 26 0Z"
      fill="#0877BD"
    />
  </svg>
);
export default SvgAvatar;

import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.231 2.444a1.73 1.73 0 00-3.46 0m-.872 8.651h2.595m2.595 0H8.494m0 0V8.5m0 2.595v2.596m6.288-7.184l1.198 7.786a1.73 1.73 0 01-1.709 1.993H2.731a1.73 1.73 0 01-1.71-1.993l1.197-7.786A1.73 1.73 0 013.93 5.04h9.142a1.73 1.73 0 011.71 1.467h0z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

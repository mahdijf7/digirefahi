import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.542 5.542V2.85a.475.475 0 01.475-.475h6.966a.475.475 0 01.475.475v2.692M7.917 2.375v3.167M9.5 2.375v3.167m5.542 10.291H3.958a1.583 1.583 0 01-1.583-1.583V7.125a1.583 1.583 0 011.583-1.583h11.084a1.584 1.584 0 011.583 1.583v7.125a1.583 1.583 0 01-1.583 1.583z"
        stroke={stroke}
      />
      <path
        d="M13.063 11.083a.396.396 0 110-.791.396.396 0 010 .791z"
        fill={fill}
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

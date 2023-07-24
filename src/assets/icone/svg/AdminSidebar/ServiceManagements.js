import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
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
        d="M4 4.5h7.5M4 9.75h7.5M4 15h7.5m2.25 1.682l1.59-1.591m0 0l1.592-1.591m-1.591 1.59L13.75 13.5m1.59 1.59l1.592 1.592M15.25 11.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-5.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

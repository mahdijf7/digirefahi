import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.438 3.167V1.708m0 1.459v1.458m0-1.458H8.155M2.687 7.542v6.562a1.458 1.458 0 001.459 1.458h10.208a1.458 1.458 0 001.459-1.458V7.542m-13.126 0h13.126m-13.126 0V4.625a1.458 1.458 0 011.459-1.458h1.458m10.209 4.375V4.625a1.458 1.458 0 00-1.459-1.458h-.364M5.604 1.708v2.917"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

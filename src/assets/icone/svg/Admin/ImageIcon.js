import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.667 14H2.4a.4.4 0 01-.4-.4V2.4a.4.4 0 01.4-.4h11.2a.4.4 0 01.4.4v6.267"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 10.667l4.667-2 3.666 1.666m.334 2.334h2m0 0h2m-2 0v-2m0 2v2m-2-8a1.333 1.333 0 110-2.667 1.333 1.333 0 010 2.667z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

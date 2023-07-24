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
        d="M8.667 14H2.4a.4.4 0 01-.4-.4V2.4a.4.4 0 01.4-.4h11.2a.4.4 0 01.4.4v6.267m-3.333 4h2m0 0h2m-2 0v-2m0 2v2"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.599 5.675A.4.4 0 006 6.022v3.955a.4.4 0 00.599.348l3.46-1.978a.4.4 0 000-.694l-3.46-1.978z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

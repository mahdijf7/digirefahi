import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.667 5.66H6a1.333 1.333 0 00-1.333 1.335v9.345A1.336 1.336 0 006 17.675h4M12.333 5.66H14a1.333 1.333 0 011.333 1.335v6.007"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M7.333 7.262V5.994a.334.334 0 01.334-.334c.184 0 .336-.15.368-.331.098-.569.48-1.672 1.965-1.672 1.484 0 1.867 1.103 1.965 1.672.032.181.184.33.368.33a.333.333 0 01.334.335v1.268a.4.4 0 01-.4.4H7.733a.4.4 0 01-.4-.4z"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M12.333 16.674l1.334 1.335L17 14.67"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

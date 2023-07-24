import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={19}
      height={20}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.625 6.517V16.65a.475.475 0 01-.475.475H6.017a.475.475 0 01-.475-.475V6.517a.475.475 0 01.475-.475H16.15a.475.475 0 01.475.475z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 3.667H3.642a.475.475 0 00-.475.475V14.75m2.375-.95l4.31-1.425 6.773 2.375m-3.563-3.958a1.187 1.187 0 110-2.375 1.187 1.187 0 010 2.375z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

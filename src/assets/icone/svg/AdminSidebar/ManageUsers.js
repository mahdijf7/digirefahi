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
        d="M3.5 15.881v-.678c0-1.258.5-2.465 1.388-3.355a4.736 4.736 0 013.352-1.39"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.846 10.67a1.096 1.096 0 011.62 0c.22.242.535.373.861.357a1.093 1.093 0 011.146 1.147c-.016.326.115.642.356.863a1.097 1.097 0 010 1.621c-.241.22-.372.536-.356.863a1.098 1.098 0 01-1.146 1.147 1.094 1.094 0 00-.861.356 1.096 1.096 0 01-1.62 0 1.095 1.095 0 00-.86-.356 1.094 1.094 0 01-1.147-1.147 1.098 1.098 0 00-.356-.863 1.097 1.097 0 010-1.621c.241-.22.372-.536.356-.863a1.098 1.098 0 011.146-1.147c.326.016.641-.115.861-.357z"
        stroke={stroke}
      />
      <path
        d="M12.549 13.847l.738.74 1.477-1.479m-6.524-2.65a2.707 2.707 0 002.708-2.712A2.714 2.714 0 008.24 5.034 2.707 2.707 0 005.53 7.746a2.714 2.714 0 002.709 2.712z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

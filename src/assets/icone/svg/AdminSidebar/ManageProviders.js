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
        d="M15.657 4.992h-2.662l.334 3.338s.666.667 1.666.667c.525.001 1.032-.19 1.426-.538a.336.336 0 00.1-.31l-.47-2.823a.4.4 0 00-.394-.334zM12.995 4.992l.334 3.338s-.667.667-1.667.667-1.667-.667-1.667-.667V4.992h3zM9.995 4.992V8.33s-.666.667-1.666.667c-1 0-1.667-.667-1.667-.667l.333-3.338h3z"
        stroke={stroke}
      />
      <path
        d="M6.995 4.992h-2.66a.4.4 0 00-.395.335L3.47 8.15a.337.337 0 00.1.31c.219.194.707.538 1.425.538 1 0 1.667-.667 1.667-.667l.333-3.339z"
        stroke={stroke}
      />
      <path
        d="M4 8.997v6.676a1.336 1.336 0 001.333 1.335h9.334A1.333 1.333 0 0016 15.673V8.997"
        stroke={stroke}
      />
      <path
        d="M11.889 17.008v-4.005a1.336 1.336 0 00-1.334-1.335H9.222a1.332 1.332 0 00-1.333 1.335v4.005"
        stroke={stroke}
        strokeMiterlimit={16}
      />
    </svg>
  );
}

export default SvgComponent;

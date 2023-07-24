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
        d="M8.05 18.51H3.7a.45.45 0 01-.45-.451v-2.854a.45.45 0 01.45-.45h4.35a.45.45 0 01.45.45v2.854a.45.45 0 01-.45.45zM12.175 7.245h-4.35a.45.45 0 01-.45-.45V3.94a.45.45 0 01.45-.45h4.35a.45.45 0 01.45.45v2.854a.45.45 0 01-.45.45zM16.3 18.51h-4.35a.45.45 0 01-.45-.451v-2.854a.45.45 0 01.45-.45h4.35a.45.45 0 01.45.45v2.854a.45.45 0 01-.45.45zM5.875 14.755v-2.629a1.503 1.503 0 011.5-1.502h5.25a1.5 1.5 0 011.5 1.502v2.629M10 10.625v-3.38"
        stroke={stroke}
      />
    </svg>
  );
}

export default SvgComponent;

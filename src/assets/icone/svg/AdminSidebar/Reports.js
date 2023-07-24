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
        d="M7.333 17.008h4.334m-4.334 0v-3.616m0 3.616h-3.9A.433.433 0 013 16.574v-2.748a.434.434 0 01.433-.434h3.9m4.334 3.616V8.33m0 8.678h3.9a.433.433 0 00.433-.434V4.425a.434.434 0 00-.433-.434H12.1a.433.433 0 00-.433.434V8.33m-4.334 5.062V8.764a.434.434 0 01.434-.434h3.9"
        stroke={stroke}
      />
    </svg>
  );
}

export default SvgComponent;

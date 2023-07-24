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
        d="M5.889 8.337l.007-.008m2.882.008l.007-.008m-2.896 2.9l.007-.007m2.882.008l.007-.008m-2.896 2.9l.007-.008m2.882.008l.007-.008m2.882 2.894H3.433A.433.433 0 013 16.574V5.87a.434.434 0 01.433-.434h3.9V4.425a.434.434 0 01.434-.434h3.466a.433.433 0 01.434.434V8.33m0 8.678h3.9a.433.433 0 00.433-.434v-7.81a.434.434 0 00-.433-.434h-3.9m0 8.678v-2.893m0-5.785v2.892m0 2.893v-2.893m0 2.893h1.444m-1.444-2.893h1.444"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

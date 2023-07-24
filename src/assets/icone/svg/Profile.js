import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 25.8c-3.75 0-7.065-1.92-9-4.8.045-3 6-4.65 9-4.65S23.955 18 24 21a10.849 10.849 0 01-9 4.8zm0-21.3a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM15 0a15 15 0 1015 15c0-8.295-6.75-15-15-15z"
        fill="#0877BD"
      />
    </svg>
  );
}

export default SvgComponent;

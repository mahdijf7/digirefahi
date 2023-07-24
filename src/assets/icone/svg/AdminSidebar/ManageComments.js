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
        d="M12.75 9.999h-5m5 2.503h-2.5m0 5.006A6.254 6.254 0 014 11.25a6.254 6.254 0 016.25-6.258 6.254 6.254 0 016.25 6.258c0 1.14-.304 2.21-.836 3.13l.524 2.815-2.813-.524c-.95.55-2.028.839-3.125.837z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;

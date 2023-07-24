import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      width={19}
      height={17}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.643 1.643a2.857 2.857 0 110 5.714 2.857 2.857 0 010-5.714zm0-1.143a4 4 0 100 8 4 4 0 000-8zm5.714 16h-1.143v-2.857a2.857 2.857 0 00-2.857-2.857H4.928a2.857 2.857 0 00-2.857 2.857V16.5H.928v-2.857a4 4 0 014-4h3.429a4 4 0 014 4V16.5zm0-14.857h5.714v1.143h-5.714V1.643zm0 2.857h5.714v1.143h-5.714V4.5zm0 2.857h4V8.5h-4V7.357z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgComponent;

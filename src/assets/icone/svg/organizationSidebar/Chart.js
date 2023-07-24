import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.313.938A.938.938 0 0111.25 0h1.875a.938.938 0 01.938.938v11.25h.468a.469.469 0 110 .937H.47a.469.469 0 010-.938h.469V9.376a.937.937 0 01.937-.938H3.75a.937.937 0 01.938.938v2.813h.937V5.625a.937.937 0 01.938-.938h1.875a.937.937 0 01.937.938v6.563h.938V.938zm.937 11.25h1.875V.938H11.25v11.25zm-2.813 0V5.625H6.563v6.563h1.875zm-4.687 0V9.374H1.875v2.813H3.75z"
        fill={fill}
      />
    </svg>
  );
}

export default SvgComponent;

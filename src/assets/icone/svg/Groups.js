import * as React from 'react';
const SvgGroups = (props) => (
    <svg width={16} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M1.25 11.313v-.626a4.375 4.375 0 0 1 8.75 0v.626" stroke="#7F7F7F" strokeWidth={1.1} strokeLinecap="round" />
        <path d="M8.75 7.563a3.125 3.125 0 0 1 6.25 0v.312" stroke="#7F7F7F" strokeWidth={1.1} strokeLinecap="round" />
        <path
            d="M5.625 6.313a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm6.25-1.875a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"
            stroke="#7F7F7F"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SvgGroups;

import * as React from 'react';
const SvgGender = (props) => (
    <svg width={13} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M.75 9.5v-5a3.125 3.125 0 0 1 3.125-3.125h5A3.125 3.125 0 0 1 12 4.5v5a3.125 3.125 0 0 1-3.125 3.125h-5A3.125 3.125 0 0 1 .75 9.5Z"
            stroke="#848484"
            strokeWidth={1.1}
        />
        <path
            d="M9.188 8.563s-.938 1.25-2.813 1.25c-1.875 0-2.813-1.25-2.813-1.25"
            stroke="#848484"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4.188 5.75a.312.312 0 1 1 0-.625.312.312 0 0 1 0 .625Zm4.375 0a.312.312 0 1 1 0-.625.312.312 0 0 1 0 .625Z"
            fill="#848484"
            stroke="#848484"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SvgGender;

import * as React from 'react';
const SvgGroup = (props) => (
    <svg width={32} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1" stroke="#0877BD" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M13 14v0a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v.5" stroke="#0877BD" strokeWidth={1.5} strokeLinecap="round" />
        <path
            d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM24 9h3m3 0h-3m0 0V6m0 3v3"
            stroke="#0877BD"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SvgGroup;

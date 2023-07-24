import * as React from 'react';
const SvgSiteInvoice = (props) => (
    <svg width={20} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M10.833 18h-7.5a1.667 1.667 0 0 1-1.667-1.667V4.667A1.667 1.667 0 0 1 3.333 3h13.334a1.667 1.667 0 0 1 1.666 1.667V13"
            stroke="#0877BD"
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <path
            d="M1.667 6.333h16.666M4.167 4.675l.008-.01m2.492.01.008-.01m2.491.01.009-.01m4.158 12.502L15 18.833l3.333-3.333"
            stroke="#0877BD"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SvgSiteInvoice;

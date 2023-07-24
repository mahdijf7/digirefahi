import * as React from 'react';

function SvgComponent(props) {
    return (
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.083 5.256l.006-.007m2.328.007l.006-.007m-2.34 2.34l.006-.006m2.328.006l.006-.006m-2.34 2.34l.006-.007m2.328.006l.006-.006M8.75 12.25H2.1a.35.35 0 01-.35-.35V3.267a.35.35 0 01.35-.35h3.15V2.1a.35.35 0 01.35-.35h2.8a.35.35 0 01.35.35v3.15m0 7h3.15a.35.35 0 00.35-.35V5.6a.35.35 0 00-.35-.35H8.75m0 7V9.917m0-4.667v2.333m0 2.334V7.583m0 2.334h1.167M8.75 7.583h1.167"
                stroke="#7F7F7F"
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgComponent;

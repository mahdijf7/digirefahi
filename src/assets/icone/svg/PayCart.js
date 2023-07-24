import * as React from 'react';

function SvgComponent(props) {
    return (
        <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.667 8h9.166M2.167 9.667l2.339-2.631a3.333 3.333 0 012.492-1.12h.169m-5 10.834H6.75l3.333-2.5s.675-.456 1.667-1.25c2.083-1.667 0-4.305-2.083-2.917-1.697 1.131-3.334 2.084-3.334 2.084"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.167 11.75V6.333a1.667 1.667 0 011.666-1.666h8.334a1.667 1.667 0 011.666 1.666v5A1.667 1.667 0 0117.167 13H11.75"
                stroke="#000"
            />
        </svg>
    );
}

export default SvgComponent;

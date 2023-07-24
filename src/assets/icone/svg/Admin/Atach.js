import * as React from 'react';

function SvgComponent(props) {
    return (
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.584 5.688L6.25 10.147A2.792 2.792 0 014.248 11c-.75 0-1.47-.307-2.002-.853a2.956 2.956 0 01-.829-2.06c0-.772.298-1.513.83-2.06L6.58 1.57A1.86 1.86 0 017.915 1c.5 0 .98.205 1.334.569.354.364.553.858.553 1.373a1.97 1.97 0 01-.553 1.373L4.911 8.774a.942.942 0 01-.668.284.92.92 0 01-.667-.284.973.973 0 01-.276-.687.995.995 0 01.276-.686L7.58 3.286"
                stroke="#fff"
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgComponent;

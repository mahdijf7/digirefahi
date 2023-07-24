import * as React from 'react';

function SidebarComments({ stroke, fill, ...props }) {
    return (
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.75 5.99883H4.75M9.75 8.50202H7.25M7.25 13.5084C3.79813 13.5084 1 10.7067 1 7.25042C1 3.79413 3.79813 0.992432 7.25 0.992432C10.7019 0.992432 13.5 3.79413 13.5 7.25042C13.5 8.39 13.1956 9.4595 12.6637 10.3794L13.1875 13.1955L10.375 12.6711C9.42529 13.2212 8.34718 13.5101 7.25 13.5084Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SidebarComments;

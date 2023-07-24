import * as React from 'react';
const SvgChat = (props) => (
  <svg
    width={34}
    height={34}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34 34"
    {...props}
  >
    <path
      d="M9 14.795A4.792 4.792 0 0 1 13.8 10h6.4c2.65 0 4.8 2.156 4.8 4.795V24.4H13.8c-2.65 0-4.8-2.156-4.8-4.795v-4.81ZM23.4 22.8v-8.005a3.203 3.203 0 0 0-3.2-3.195h-6.4a3.192 3.192 0 0 0-3.2 3.195v4.81a3.203 3.203 0 0 0 3.2 3.195h9.6Zm-4.8-6.4h1.6V18h-1.6v-1.6Zm-4.8 0h1.6V18h-1.6v-1.6Z"
      fill="#0877BD"
    />
    <circle cx={17} cy={17} r={16.5} stroke="#EEE" />
  </svg>
);
export default SvgChat;

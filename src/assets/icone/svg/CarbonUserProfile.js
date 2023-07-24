import * as React from 'react';
const SvgCarbonUserProfile = ({ stroke, fill, ...props }) => (
  <svg width={15} height={14} stroke="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4.688.938a2.344 2.344 0 1 1 0 4.687 2.344 2.344 0 0 1 0-4.688Zm0-.938a3.281 3.281 0 1 0 0 6.562 3.281 3.281 0 0 0 0-6.562Zm4.687 13.125h-.938v-2.344a2.344 2.344 0 0 0-2.343-2.344H3.28a2.344 2.344 0 0 0-2.344 2.344v2.344H0v-2.344A3.281 3.281 0 0 1 3.281 7.5h2.813a3.281 3.281 0 0 1 3.281 3.281v2.344Zm0-12.188h4.688v.938H9.375V.937Zm0 2.344h4.688v.938H9.375V3.28Zm0 2.344h3.281v.938H9.375v-.938Z"
      fill={fill}
    />
  </svg>
);
export default SvgCarbonUserProfile;

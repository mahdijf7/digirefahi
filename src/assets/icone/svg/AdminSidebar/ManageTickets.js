import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
      <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path d="M7.125 7.625C7.125 4.85417 11.4792 4.85417 11.4792 7.625C11.4792 9.60417 9.5 9.20833 9.5 11.5833M9.5 14.7579L9.50792 14.7492" stroke={stroke} strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.50065 17.9166C13.873 17.9166 17.4173 14.3723 17.4173 9.99992C17.4173 5.62754 13.873 2.08325 9.50065 2.08325C5.12828 2.08325 1.58398 5.62754 1.58398 9.99992C1.58398 11.4415 1.96953 12.7945 2.64323 13.9583L1.97982 17.5208L5.54232 16.8573C6.74529 17.5533 8.11089 17.9187 9.50065 17.9166Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>


  );
}

export default SvgComponent;

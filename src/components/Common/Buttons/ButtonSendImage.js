import React, { useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

function ButtonSendImage(props) {
  const fileInputRef = useRef('');
  const { img, fileHandler, loading, icon } = props;

  return (
    <>
      <input
        onChange={fileHandler}
        style={{ display: 'none' }}
        type="file"
        ref={fileInputRef}
        accept="image/*"
      />
      <div
        onClick={(event) => {
          event.preventDefault();
          fileInputRef.current.click(); 
        }}
      >
        <div>
          {img && <img src={img} alt="" />}
          {icon && { icon }}
        </div>
      </div>
    </>
  );
}

export default ButtonSendImage;

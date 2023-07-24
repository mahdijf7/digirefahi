import React from 'react';
import { Box } from '@mui/material';

function Card({ children, ...otherProps }) {
  return (
    <Box borderRadius="1.4rem" boxShadow="1" bgcolor="common.white" {...otherProps}>
      {children}
    </Box>
  );
}

export default Card;

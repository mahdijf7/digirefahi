import React from 'react';
import { Button } from '@mui/material';
import { theme } from 'assets/theme/default';

function ButtonBack({ children, sx, ...otherProps }) {
  const configButton = {
    ...otherProps,
  };

  return (
    <Button
      sx={{
        width: '100%',
        height: '3.9rem',
        fontSize: '1.6rem',
        border: ` .1rem solid ${theme.palette.primary.main}`,
        '&:hover': {
          bgcolor: theme.palette.common.white,
        },
        ...sx,
      }}
      {...configButton}
    >
      {children}
    </Button>
  );
}

export default ButtonBack;

import React from 'react';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomLink = styled(Link)(({ theme }) => ({
  listStyle: 'none',
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: '.5rem',
  fontSize: '1.4rem',
  ':active': {
    transform: 'scale(.99)',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
  },
}));

function Index({ children, ...otherProps }) {
  return <CustomLink {...otherProps}>{children}</CustomLink>;
}

export default Index;

import React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from 'components/Common/Breadcrumb/Breadcrumb';
import MetaData from '../MetaData/MetaData';

function Container({ children, breadcrumb, meta, ...otherProps }) {
  return (
    <>
      {breadcrumb.map((item, i) => (
        <MetaData key={i} meta={{ title: item.title, ...meta }} />
      ))}
      <Box
        position="relative"
        width="100%"
        height="100%"
        bgcolor="primary.light"
        p=" 1rem 2rem"
        {...otherProps}
      >
        <Breadcrumb data={breadcrumb} />
        {children}
      </Box>
    </>
  );
}

export default Container;

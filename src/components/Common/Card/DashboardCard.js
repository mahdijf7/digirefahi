import React from 'react';
import { Box } from '@mui/material';

function DashboardCard({ children, ...otherProps }) {
    return (
        <Box
            m="0 auto "
            px="2rem"
            bgcolor="primary.light"
            width="100%"
            flex="1"
            display="flex"
            flexDirection="column"
            paddingBottom="4rem"
            {...otherProps}>
            {children}
        </Box>
    );
}

export default DashboardCard;

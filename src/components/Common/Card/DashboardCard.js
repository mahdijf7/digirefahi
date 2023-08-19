import React from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

function DashboardCard({ children, meta, ...otherProps }) {
    return (
        <>
            <Helmet>
                <title>دیجی رفاهی{meta.title ? ` - ${meta.title}` : ''}</title>
            </Helmet>
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
        </>
    );
}
DashboardCard.defaultProps = {
    meta: {}
}
export default DashboardCard;

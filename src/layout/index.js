import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Layout() {
    const matches = useMediaQuery('(max-width:959px)');
    const styleContainer = {
        width: '263px',
        height: '100%',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bgcolor: 'common.white',
        top: 0,
        right: 0,
        overflow: 'auto',
        zIndex: 1001,
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    };
    const pageWrapperStyles = {
        paddingRight: {
            md: '263px',
        },
        minHeight: '100vh',
        display: 'flex',
    };
    return (
        <Box m="0 auto" sx={pageWrapperStyles}>
            <Grid container sx={{ position: 'relative' }}>
                {!matches && <Sidebar sx={styleContainer} />}
                <Grid item xs={12} className="flex" flexDirection="column">
                    <Header />
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Layout;

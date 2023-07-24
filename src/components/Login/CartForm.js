import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import '../../assets/style/login.scss';
import logo from '../../assets/image/Logo-FA-3.png';
import { useTranslation } from 'react-i18next';

function CartForm(props) {
    const { title } = props;
    const { t } = useTranslation();

    return (
        <Grid height="90vh" className="boxFormLogin" bgcolor="common.white" item md={4} sm={6} xs={10}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}></Box>
            <Box sx={{ textAlign: 'center', marginTop: '5%' }}>
                <img className="imgLogo" src={logo} alt="" />
                <Typography color="primary.dark" variant="h2">
                    {t(title)}
                </Typography>
                {props.children}
            </Box>
        </Grid>
    );
}

export default CartForm;

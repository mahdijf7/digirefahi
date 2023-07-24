import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BasicChartCart from '../../../components/Common/Chart/BasicChartCart';
import { useTranslation } from 'react-i18next';
// const fakeData = [
//     {
//         id: 43,
//         name: 'دسته بندی ها',
//         color: '#49A8A2',
//         amount: 0,
//         remain: 0,
//         percent: 0,
//     },
// ];
function WalletDetail({ wallet, loading }) {
    const { t } = useTranslation();
    const walletFix = wallet?.wallets?.length > 0 ? wallet?.wallets : [];

    return (
        <Box position="relative">
            <Typography className="wallet-head-typo" variant="h2">
                {t('wallet.walletDetail')}
            </Typography>
            <Box p="6rem 3rem 2rem" borderRadius="1.4rem" boxShadow="1" bgcolor="common.white" minHeight="57.3rem">
                <Grid container spacing={1.3}>
                    {walletFix.map((item, index) => (
                        <Grid item xs={10} sm={3} key={index}>
                            <BasicChartCart {...item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default WalletDetail;

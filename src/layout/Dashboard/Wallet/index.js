import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ChartWallet from '../../../components/Common/Chart/ChartWallet';
import WalletDetail from './WalletDetail';
import userService from 'service/api/userService';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import TransactionTable from './TransactionTable';
import Card from 'components/Common/Card/Card';
import InvoiceTable from './InvoiceTable';

function Wallet(props) {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(false);
    const getWalletData = async () => {
        setLoading(true);
        await userService
            .getWallet()
            .then((res) => {
                setLoading(false);
                setWallet(res.data.data);
                console.log(res.data.data, 'getting data of wallet');
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        getWalletData();
    }, []);

    const child = wallet?.wallets.map((d) => ({
        name: d.name,
        value: d.amount + 1000,
    }));

    const walletData = {
        wallet,
        child,
        loading,
    };

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DLoadingWrapper loading={loading}>
                <Grid spacing="2rem" container mt="4px">
                    <Grid item xs={10} sm={3.8}>
                        <ChartWallet {...walletData} />
                    </Grid>
                    <Grid item xs={10} sm={8.2}>
                        <Grid container spacing="2rem">
                            <Grid item xs={10} sm={12}>
                                <WalletDetail {...walletData} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} sm={12}>
                        <Card minHeight="15rem" p="2rem">
                            <Typography variant="h2">{'سوابق تراکنش '}</Typography>
                            <TransactionTable />
                        </Card>
                    </Grid>
                    <Grid item xs={10} sm={12}>
                        <Card minHeight="15rem" p="2rem">
                            <Typography variant="h2">{'فاکتور ها'}</Typography>
                            <InvoiceTable />
                        </Card>
                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </DashboardCard>
    );
}
const breadCrumbLinks = [{ path: '/app/dashboard/', title: 'پیشخوان' }, { title: 'کیف پول من' }];
export default Wallet;

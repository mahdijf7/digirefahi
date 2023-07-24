import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography, Divider, Button } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';

// Assets
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const DEmployeeCreditChart = () => {
    const [loading, setLoading] = useState({ initial: true });
    const [wallets, setWallets] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`wallets`, { signal })
                .then((res) => {
                    setWallets([
                        ...res.data.data.wallets.filter((wallet) => wallet.remain > 0),
                        { remain: res.data.data.final_use, name: 'مصرف شده کل', color: '#DDE1E6', totalUsed: true },
                    ]);
                })
                .catch((err) => {
                    console.log('error occured!');
                });

            setLoading({ initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DBox sx={wrapperStyles}>
            <DLoadingWrapper loading={loading.initial}>
                <Typography sx={{ fontSize: '20px', ml: 'auto' }}>کیف پول</Typography>

                <Box
                    sx={{
                        position: 'relative',
                        width: '200px',
                        display: 'flex',
                        mt: '30px',
                    }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0877BD',
                        }}>
                        <Typography sx={{ fontSize: '14px' }}>موجودی</Typography>
                        <Typography sx={{ mt: '8px', fontSize: '22px' }}>
                            {wallets
                                .reduce((f, c) => {
                                    if (!c.totalUsed) f += c.remain;
                                    return f;
                                }, 0)
                                .toLocaleString()}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }}>تومان</Typography>
                    </Box>
                    <Doughnut
                        style={{ zIndex: 1, position: 'relative' }}
                        data={{
                            labels: wallets.reduce((f, c) => {
                                f.push(c.name);
                                return f;
                            }, []),
                            datasets: [
                                {
                                    data: wallets.reduce((f, c) => {
                                        f.push(c.remain);
                                        return f;
                                    }, []),
                                    backgroundColor: wallets.reduce((f, c) => {
                                        f.push(c.color);
                                        return f;
                                    }, []),
                                    borderWidth: '0',
                                    borderColor: ['transparent', 'transparent'],
                                },
                            ],
                        }}
                        options={{
                            cutout: '75%',

                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {},
                                datalabels: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: 'grid', gap: '14px', width: '100%', mt: '30px' }}>
                    {wallets.map((wallet, index) => (
                        <Box
                            key={wallet.id}
                            height="38px"
                            padding="0 20px"
                            overflow="hidden"
                            borderRadius="10px"
                            border="1px solid #EEEEEE "
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            position="relative"
                            width="100%">
                            <Box
                                sx={{
                                    backgroundColor: wallet.color,
                                    height: '100% !important',
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    width: '10px',
                                    borderLeft: '1px solid #eeeeee',
                                }}></Box>

                            <Typography component="p" fontSize="12px">
                                {wallet.name}
                            </Typography>
                            <Typography component="p" className="flex" gap=".5rem" fontSize="12px">
                                {wallet.remain.toLocaleString()}
                                <Typography component="span" fontSize="10px">
                                    {t('dashboard.toman')}
                                </Typography>
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Button component={Link} to="/app/dashboard/wallet/" variant="contained" sx={{ fontSize: '14px', mt: '22px' }}>
                    جزییات کیف پول
                </Button>
            </DLoadingWrapper>
        </DBox>
    );
};
const wrapperStyles = {
    p: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};

export { DEmployeeCreditChart };

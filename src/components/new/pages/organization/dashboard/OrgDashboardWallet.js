import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Components
import DBox from 'components/new/shared/DBox';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const OrgDashboardWallet = ({ wallet }) => {
    const { total, amount, remain } = wallet;
    // const countAll = Object.values(chart).reduce((f, c) => {
    //     f += c.count;
    //     return f;
    // }, 0);
    const data = {
        // labels: Object.values(chart).reduce((f, c) => {
        //     f.push(c.category.name || 'ندارد');
        //     return f;
        // }, []),
        datasets: [
            {
                data: [remain, amount],
                backgroundColor: ['#0877BD', 'transparent'],
                borderWidth: '0',
                borderColor: ['transparent', 'transparent'],
            },
        ],
    };

    return (
        <Grid item xs={12} lg={3}>
            <DBox sx={{ p: '16px 26px 45px 26px', minHeight: '100%', width: '100%' }}>
                <Typography sx={{ fontSize: '20px', color: '#000' }}>کیف پول</Typography>

                <Box
                    sx={{
                        width: '200px',
                        mx: 'auto',
                        mt: '12px',
                        border: '3px solid #A6EBFF',
                        borderRadius: '100%',
                        padding: '2px',
                        position: 'relative',
                        '&::before': {
                            content: `''`,
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: 'calc(100% - 4px)',
                            height: 'calc(100% - 4px)',
                            border: '21px solid #DDE1E6',
                            borderRadius: '100%',
                        },
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
                        <Typography sx={{ mt: '8px', fontSize: '22px' }}>{remain.toLocaleString()}</Typography>
                        <Typography sx={{ fontSize: '12px' }}>تومان</Typography>
                    </Box>
                    <Doughnut
                        style={{ zIndex: 1, position: 'relative' }}
                        data={data}
                        options={{
                            cutout: '75%',

                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    display: false,
                                },
                                datalabels: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        background: 'rgba(221, 225, 230, 0.4)',
                        borderRadius: '10px',
                        mt: '25px',
                        p: '0 10px',
                        height: '42px',
                        color: '#0877BD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Typography sx={{ fontSize: '12px' }}>
                        تاکنون { ((100 * amount) / total).toFixed(0)}% از کیف پول خود را مصرف کرده اید.
                    </Typography>
                </Box>
                <Button
                    startIcon={<AddCardIcon sx={{ m: '0 0 0 10px' }} />}
                    sx={{ fontSize: '14px', mt: '48px' }}
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/app/organization/wallet/creditRequests">
                    افزایش اعتبار
                </Button>
                {/* <Box sx={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px', mt: '10px' }}>
                    {Object.values(chart).map((item) => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Box
                                sx={{
                                    backgroundColor: item.category.color,
                                    borderRadius: '100%',
                                    width: '14px',
                                    height: '14px',
                                }}></Box>
                            <Typography sx={{ fontSize: '13px', color: '#000' }}>{item.category.name}</Typography>
                        </Box>
                    ))}
                </Box> */}
            </DBox>
        </Grid>
    );
};
export default OrgDashboardWallet;

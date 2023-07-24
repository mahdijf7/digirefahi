import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Components
import DBox from 'components/new/shared/DBox';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const OrgDashboardUsage = ({ usage }) => {
    const walletUsageWithValue = usage.filter(item=>item.count > 0)
    const countAll = walletUsageWithValue.reduce((f, c) => {
        f += c.count;
        return f;
    }, 0);
    const data = {
        labels: walletUsageWithValue.reduce((f, c) => {
            f.push(c.category.name || 'ندارد');
            return f;
        }, []),
        datasets: [
            {
                data: walletUsageWithValue.reduce((f, c) => {
                    f.push(c.count);
                    return f;
                }, []),
                backgroundColor: walletUsageWithValue.reduce((f, c) => {
                    f.push(c.category.color || '#0877BD');
                    return f;
                }, []),
                borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
                borderWidth: 2,
            },
        ],
    };

    return (
        <Grid item xs={12} md={6}>
            <DBox sx={{ p: '16px 26px 34px 26px' }}>
                <Typography sx={{ fontSize: '20px', color: '#000' }}>میزان مصرف خدمات</Typography>

                <Box sx={{ width: '200px', mx: 'auto', mt: '12px' }}>
                    <Pie
                        data={data}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                datalabels: {
                                    align : 'right',
                                    clamp :true,
                                    color: '#fff',
                                    offset :6,
                                    font: {
                                        size: '13px',
                                        weight: 500,
                                    },
                                    formatter: function (value, context) {
                                        // return countAll
                                        return `${((value * 100) / countAll).toFixed(0)}%`;
                                    },
                                    labels: {
                                        title: {
                                            color: '#fff',
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px', mt: '10px' }}>
                    {walletUsageWithValue.map((item) => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }} key={`category-used-${item.category.id}`}>
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
                </Box>
            </DBox>
        </Grid>
    );
};
export default OrgDashboardUsage;

import { Box, Typography } from '@mui/material';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { useTranslation } from 'react-i18next';

function BasicChartCart({ name, amount, color, remain, percent, total }) {
    const { t } = useTranslation();

    const data = [{ value: amount + 0.1 }, { value: remain }];

    const formatted = (remain * 100) / total;
    const formattedPercent = formatted >= 100 ? formatted.toFixed(0) : Math.floor(formatted);

    const COLOR = ['#D9D9D9', color];

    const commenStyle = {
        p: '0 1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    };
    return (
        <Box borderRadius="1.4rem" boxShadow="1" bgcolor="common.white" height="24rem">
            <Box position="relative" display="flex" alignItems="center" flexDirection="column">
                <ResponsiveContainer width="100%" height={140}>
                    <PieChart width={100} height={100}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            fill="#DDE1E6"
                            dataKey="value"
                            innerRadius="60%"
                            outerRadius="85%"
                            stroke="none"
                            radius={100}>
                            {data.map((item, index) => (
                                <Cell key={`cell-${index}`} fill={COLOR[index % COLOR.length]} />
                            ))}

                            <Label
                                value={`%${formattedPercent}`}
                                position="center"
                                fill="black"
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: '300',
                                    fontFamily: 'Roboto',
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <Typography mb="1.5rem" variant="h3">
                    {name}
                </Typography>
                <Box sx={commenStyle}>
                    <Typography variant="body21">{t('wallet.usedCredit')}</Typography>
                    <Typography variant="body21">{amount.toLocaleString()}</Typography>
                </Box>
                <Box sx={commenStyle}>
                    <Typography variant="body21">{t('wallet.creditLeft')}</Typography>
                    <Typography variant="body21" color="primary.main">
                        {remain.toLocaleString()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default BasicChartCart;

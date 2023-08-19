import React from 'react';
import { Box, Typography, Grid, Link, Alert, AlertTitle } from '@mui/material';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
import { useTranslation } from 'react-i18next';
import CustomLink from '../Buttons/CustomLink';
import { theme } from 'assets/theme/default';
import { useTheme } from '@mui/material/styles';

const primaryColor = theme.palette.primary.main;

const COLOR = ['#D9D9D9', '#0877BD'];

function ChartWallet({ simple, wallet, loading, child }) {
    const themeDefault = useTheme();
    const { t } = useTranslation();

 

    const data = [{ value: wallet?.final_use }, { value: wallet?.final_remain }];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Box p="1rem 2rem" bgcolor="white" borderRadius=".3rem" boxShadow="1">
                    <p className="label">{`${'موجودی'} : ${wallet?.final_remain.toLocaleString()}`}</p>
                </Box>
            );
        }

        return null;
    };

    const TitleBox = ({ name, amount, color, boxColor }) => {
        return (
            <Box mb="2rem">
                <Box
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
                            backgroundColor: boxColor ? boxColor : color,
                            height: '100% !important',
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            width: '10px',
                            borderLeft: '1px solid #eeeeee',
                        }}
                    />

                    <Typography sx={{ fontWeight: 'bold' }} component="p" fontSize="12px">
                        {name}
                    </Typography>
                    <Typography
                        sx={{ fontWeight: '600' }}
                        component="p"
                        color={color}
                        className="flex"
                        gap=".5rem"
                        fontSize="12px">
                        {amount}
                        <Typography component="span" fontSize="10px">
                            {t('dashboard.toman')}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        );
    };

    const percentageSpent = (wallet?.final_use / wallet?.final_amount) * 100;

    return (
        <Box borderRadius="1.4rem" boxShadow="1" bgcolor="common.white" minHeight="57.3rem">
            <Box m="0 auto" width="90%" position="relative" className="column">
                <Typography sx={{ position: 'absolute', right: '1rem', top: '1rem' }} variant="h2">
                    {'کیف پول'}
                </Typography>
                <>
                    <ResponsiveContainer width="95%" height={300}>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={child?.length > 0 ? data : [{ value: 0.1 }]}
                                cx="50%"
                                cy="50%"
                                fill="#0877BD"
                                dataKey="value"
                                innerRadius="60%"
                                outerRadius="82%"
                                labelLine={false}
                                stroke="none"
                                label={renderCustomizedLabel}>
                                {wallet?.wallets.map((item, index) => (
                                    <Cell key={`cell-${index}`} fill={COLOR[index % COLOR.length]} />
                                ))}
                                <Label
                                    value={wallet?.final_remain}
                                    position="center"
                                    fill="black"
                                    style={{
                                        fontSize: '2rem',
                                        fontWeight: '300',
                                        fill: primaryColor,
                                    }}
                                />
                                <Label
                                    content={<CustomLabel title1={t('dashboard.toman')} title2={t('wallet.inventory')} />}
                                    position="center"
                                />
                            </Pie>
                            {/* <Tooltip /> */}
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    <Box sx={{ mt: '-2rem', '@media (min-width: 1300px)': { mt: '2rem' } }} width="95% !important">
                        <Box
                            p="0 2rem 0 1rem"
                            borderRadius="1rem"
                            height="4.2rem"
                            border=".1rem solid #EEEEEE "
                            className="flex"
                            color="primary.main"
                            bgcolor="text.light">
                            <Typography textAlign="center" variant="body2">
                                {`${t('dashboard.youHaveUsed')}% ${percentageSpent ? percentageSpent : 0} ${t(
                                    'dashboard.ofYourWallet'
                                )}  `}
                            </Typography>
                        </Box>
                        <Box mt="3rem">
                            <TitleBox
                                name={'اعتبار کل تخصیص یافته'}
                                color={wallet?.color}
                                amount={wallet?.final_amount}
                                boxColor="#A6EBFF"
                            />
                            <TitleBox
                                name={'اعتبار مصرف شده'}
                                color={'#8C8C8C'}
                                amount={wallet?.final_use}
                                boxColor={'#DDE1E6'}
                            />
                            <TitleBox
                                name={'موجودی'}
                                color={primaryColor}
                                boxColor={primaryColor}
                                amount={wallet?.final_remain}
                            />
                        </Box>
                    </Box>
                </>
            </Box>
        </Box>
    );
}

export default ChartWallet;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius }) => {
    return (
        <g>
            <circle cx={cx} cy={cy} r={outerRadius + 5} fill="none" stroke="#A6EBFF" strokeWidth={2} />
        </g>
    );
};

const CustomLabel = ({ viewBox, title1, title2 }) => {
    const { cx, cy } = viewBox;
    return (
        <>
            <text x={cx + 15} y={cy + 30}>
                <tspan style={styleLabel}>{title1}</tspan>
            </text>
            <text x={cx + 22} y={cy - 25}>
                <tspan style={styleLabel}>{title2}</tspan>
            </text>
        </>
    );
};

const styleLabel = {
    fontSize: '1.4rem',
    fill: primaryColor,
};

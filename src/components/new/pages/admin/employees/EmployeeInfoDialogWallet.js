import { useState, useEffect } from 'react';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Label, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { theme } from 'assets/theme/default';

// Component
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

//api call
import adminService from 'service/api/adminService';

const EmployeeInfoDialogWallet = ({ employeeId }) => {
    const [wallet, setWallet] = useState([]);

    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const child = wallet.map((d) => ({
        name: d.name,
        value: d.remain,
    }));

    const totalAmount = wallet?.reduce((acc, curr) => acc + curr.total, 0);
    const totalUsed = wallet.reduce((acc, item) => acc + item.amount, 0);
    const totalPercent = Math.round((totalUsed * 100) / totalAmount, 0);
    const totalLeft = wallet.reduce((acc, item) => acc + item.remain, 0);
 

    const getData = async (tab) => {
        setLoading(true);
        await adminService
            .getEmployeeData(employeeId, tab)
            .then((res) => {
                setWallet(res.data.data.filter((walletCategory) => walletCategory.remain > 0)); 
                setLoading(false);
            })
            .catch((err) => {
       
                setLoading(false);
            });
    };

    useEffect(() => {
        getData('wallets');
    }, []);

    return (
        <Box sx={boxStyle}>
            <DLoadingWrapper loading={loading}>
                {!loading && wallet.length === 0 && (
                    <Alert
                        severity="warning"
                        className="column"
                        sx={{
                            m: '4rem auto',
                            width: '80%',
                            height: '8rem',
                        }}>
                        <AlertTitle sx={{ marginBottom: '-1rem', fontSize: '4rem' }} />
                        <strong>دیتایی از کیف پول موجود نیست.</strong>
                    </Alert>
                )}
                {!loading && wallet.length > 0 && (
                    <>
                        <Box
                            sx={{
                                border: '1px solid #F2F2F7',
                                borderRadius: '14px',
                                padding: '22px 38px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <PieChart width={220} height={220}>
                                <Pie
                                    data={child}
                                    cx="50%"
                                    cy="50%"
                                    fill="#21AAD6"
                                    dataKey="value"
                                    innerRadius="65%"
                                    outerRadius="82%"
                                    labelLine={false}
                                    stroke="none">
                                    {wallet.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                    <Label
                                        value={totalLeft}
                                        position="center"
                                        fill={theme.palette.primary.main}
                                        style={{
                                            transform: 'translateY(4px)',
                                        }}
                                        className="chart-label-22 "
                                    />
                                    <Label
                                        value={'موجودی'}
                                        position="top"
                                        fill={theme.palette.primary.main}
                                        style={{
                                            transform: 'translate(34%, -15%)',
                                        }}
                                        className="chart-label-bold"
                                    />
                                    <Label
                                        value={'تومان'}
                                        position="insideBottom"
                                        fill={theme.palette.primary.main}
                                        style={{
                                            transform: 'translate(34%,  15%)',
                                        }}
                                        className="chart-label-14"
                                    />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            <Typography fontSize="12px">{totalPercent}% از اعتبار کیف پول مصرف شده است. </Typography>
                            <Box display="flex" flexDirection="column" gap="12px" mt="20px">
                                <Box
                                    height="38px"
                                    padding="0 20px"
                                    gap="32px"
                                    overflow="hidden"
                                    borderRadius="10px"
                                    border="1px solid #EEEEEE "
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    position="relative">
                                    <Typography component="p" fontSize="12px">
                                        اعتبار کل تخصیص یافته
                                    </Typography>
                                    <Typography component="p" fontSize="12px">
                                        {totalAmount}
                                    </Typography>
                                </Box>
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
                                    backgroundColor="#F2F2F7">
                                    <Typography component="p" fontSize="12px">
                                        اعتبار مصرف شده
                                    </Typography>
                                    <Typography component="p" fontSize="12px">
                                        {totalUsed}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {wallet.map((data, index) => (
                                <Box
                                    key={data.id}
                                    height="38px"
                                    padding="0 20px"
                                    overflow="hidden"
                                    borderRadius="10px"
                                    border="1px solid #EEEEEE "
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    position="relative"
                                    minWidth="260px">
                                    <Box
                                        sx={{
                                            backgroundColor: data.color,
                                            height: '100% !important',
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            width: '10px',
                                            borderLeft: '1px solid #eeeeee',
                                        }}></Box>

                                    <Typography component="p" fontSize="12px">
                                        {data.name}
                                    </Typography>
                                    <Typography component="p" color={data?.color} className="flex" gap=".5rem" fontSize="12px">
                                        {(+data.remain).toLocaleString()}
                                        <Typography component="span" fontSize="10px">
                                            {t('dashboard.toman')}
                                        </Typography>
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </DLoadingWrapper>
        </Box>
    );
};

const boxStyle = {
    display: 'flex',
    gap: '50px',
    m: '2rem 4.5rem  0',
};

export default EmployeeInfoDialogWallet;

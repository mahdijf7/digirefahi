import { useState, useEffect } from 'react';
import { Box, Typography, Alert, AlertTitle, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { PieChart, Pie, Label, Cell, Tooltip } from 'recharts';

// Component
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

//api call
import adminService from 'service/api/adminService';

// Assets
import { theme } from 'assets/theme/default';

const primaryColor = theme.palette.primary.main;

const WalletService = () => {
    const { companyId } = useParams();
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

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
                    minWidth="260px">
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

                    <Typography component="p" fontSize="12px">
                        {name}
                    </Typography>
                    <Typography component="p" color={color} className="flex" gap=".5rem" fontSize="12px">
                        {amount}
                        <Typography component="span" fontSize="10px">
                            {t('dashboard.toman')}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        );
    };

    const data = [
        { name: 'اعتبار کل', value: wallet?.total },
        { name: 'موجودی', value: wallet?.remain },
    ];

    const getData = async (tab) => {
        setLoading(true);
        await adminService
            .getCompany(companyId, tab)
            .then((res) => {
                setWallet(res.data.data);
                console.log(res.data, 'GETTING  ', 1111111111);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        companyId && getData('wallet');
    }, []);

    return (
        <Box sx={boxStyle}>
            <DLoadingWrapper loading={loading}>
                {wallet && (
                    <>
                        {!wallet?.name && (
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
                        {wallet?.name && (
                            <>
                                <Box
                                    sx={{
                                        borderRadius: '14px',
                                        padding: '22px 38px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        margin: '0 auto ',
                                        height: 'auto',
                                        boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 0.05)',
                                        position: 'relative',
                                    }}>
                                    <PieChart width={220} height={220}>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            fill={primaryColor}
                                            dataKey="value"
                                            innerRadius="60%"
                                            outerRadius="82%"
                                            labelLine={false}
                                            stroke="none"
                                            label={renderCustomizedLabel}>
                                            <Cell key={`cell-${'11'}`} fill={wallet?.color} />

                                            {/* {wallet?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))} */}
                                            <Label
                                                value={wallet?.remain}
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

                                    <TitleBox
                                        name={'اعتبار کل'}
                                        color={wallet.color}
                                        amount={wallet?.total.toLocaleString()}
                                        boxColor="#A6EBFF"
                                    />
                                    <TitleBox
                                        name={'اعتبار مصرف شده'}
                                        color={wallet?.color}
                                        amount={wallet?.amount.toLocaleString()}
                                        boxColor={wallet?.color}
                                    />
                                    <TitleBox
                                        name={'موجودی'}
                                        color={primaryColor}
                                        boxColor={primaryColor}
                                        amount={wallet?.remain.toLocaleString()}
                                    />
                                </Box>
                            </>
                        )}
                        <Box
                            sx={{ position: 'absolute', bottom: '-2rem', left: '-2rem', zIndex: '100 !important' }}
                            className="flex"
                            justifyContent="flex-end">
                            <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies/">
                                بازگشت به لیست سازمان‌ها
                            </Button>
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
    m: '2rem 4.5rem',
    position: 'relative',
    zIndex: '100 !important',
};

export default WalletService;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius }) => {
    return (
        <g>
            <circle cx={cx} cy={cy} r={outerRadius + 5} fill="none" stroke="#A6EBFF" strokeWidth={2} />
        </g>
    );
};

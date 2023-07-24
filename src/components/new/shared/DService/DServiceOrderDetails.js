import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import { Box, Grid, Typography } from '@mui/material';
import DBox from 'components/new/shared/DBox';
import DLoadingWrapper from '../DLoadingWrapper';

const DServiceOrderDetails = ({ isDiscountCode, onCodeCopied }) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [order, setOrder] = useState(false);
    const [loading, setLoading] = useState({ initial: true });

    const copyHandler = (code) => {
        navigator.clipboard.writeText(code);
        onCodeCopied('کد رهگیری با موفقیت کپی شد.');
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`orders/${searchParams.get('order_id')}`, { signal })
                .then((res) => {
                    setOrder(res.data.data);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                initial: false,
            });
        })();

        return () => controller.abort();
    }, []);

    return (
        <Grid item xs={12}>
            <DBox sx={{ p: '0 28px' }}>
                <DLoadingWrapper sx={{ py: '20px' }} loading={loading.initial}>
                    {order && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ p: '20px', borderBottom: '1px solid #EEEEEE', display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ width: '150px' }} fontSize="18px">
                                        {' '}
                                        جزییات خرید
                                    </Typography>
                                    <Box
                                        sx={{
                                            borderRadius: '6px',
                                            border: '1px solid #0877BD',
                                            background: '#F2F2F7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '32px',
                                            p: '0 15px',
                                            width: '210px',
                                        }}>
                                        <Typography fontSize="12px">تاریخ صدور</Typography>
                                        <Typography fontSize="12px" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {new Date(order.created_at).toLocaleDateString('fa-IR')}
                                            <CalendarTodayIcon
                                                sx={{ color: '#0877BD', fontSize: '14px', position: 'relative', top: '-1px' }}
                                            />
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ p: '20px', borderBottom: '1px solid #EEEEEE', display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ width: '150px' }} fontSize="14px">
                                        {isDiscountCode ? 'کد تخفیف' : 'کد رهگیری خرید'}
                                    </Typography>
                                    {order.codes.map((code, index) => (
                                        <Box
                                            sx={{
                                                borderRadius: '6px',
                                                border: '1px solid #0877BD',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                height: '32px',
                                                p: '0 15px',
                                                width: '210px',
                                                ml: '30px',
                                            }}>
                                            <Typography fontSize="12px">شماره {index + 1}</Typography>
                                            <Typography
                                                fontSize="12px"
                                                sx={{ display: 'flex', alignItems: 'center', gap: '5px', direction: 'ltr' }}
                                                onClick={() => copyHandler(code.value)}>
                                                <ContentCopyOutlinedIcon
                                                    sx={{
                                                        color: '#0877BD',
                                                        fontSize: '14px',
                                                        position: 'relative',
                                                        top: '-1px',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                                {code.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </DLoadingWrapper>
            </DBox>
        </Grid>
    );
};

export { DServiceOrderDetails };

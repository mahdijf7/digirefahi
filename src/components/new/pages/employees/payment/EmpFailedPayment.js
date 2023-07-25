import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';
import DSnackbar from 'components/new/shared/DSnackbar';

const EmpFailedPayment = ({ order }) => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState({ pay: false });
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const pay = async () => {
        if (loading.pay) return;
        setLoading({ pay: true });

        const params = new URLSearchParams();
        params.append('service', order.service.id);
        params.append('count', order.count);
        await dashboardService
            .create(`orders?${params.toString()}`)
            .then((res) => {
                if (res.data.data.url) window.location.href = res.data.data.url;
                else if (res.data.data.id) navigate(`/app/dashboard/services/payment/result?order_id=${res.data.data.id}`);
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: err?.response?.data?.massage || 'ارسال با خطا مواجه شد',
                        type: 'error',
                    },
                });
            });
    };

    return (
        <>
            <DBox sx={{ overflow: 'hidden', alignItems: 'center', mt: '32px' }}>
                <Box
                    bgcolor="brandWarning.main"
                    p="0 40px"
                    sx={{
                        width: '100%',
                        height: '68px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Typography color="common.black" fontSize="22px">
                        پرداخت ناموفق
                    </Typography>
                </Box>
                <Box px="200px" sx={{ mt: '50px', display: 'grid', width: '100%' }}>
                    <Box bgcolor="info.input" sx={{ borderRadius: '5px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Typography component="span">شناسه پرداخت</Typography>
                        <Typography color="#E52929">{searchParams.get("transaction_id")}</Typography>
                    </Box>
                </Box>
                <Box sx={{ py: '50px' }}>
                    <Stack gap="20px" direction="row" useFlexGap={true}>
                        <LoadingButton
                            loading={loading.pay}
                            color="brandWarning"
                            variant="contained"
                            sx={{ fontSize: '14px' }}
                            onClick={pay}>
                            پرداخت مجدد
                        </LoadingButton>

                        <Button
                            component={Link}
                            to={`/app/dashboard/services/${order.service.id}/`}
                            variant="contained"
                            sx={{ fontSize: '14px' }}>
                            بازگشت
                        </Button>
                    </Stack>
                </Box>
            </DBox>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
};

export { EmpFailedPayment };

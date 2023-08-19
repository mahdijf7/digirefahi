import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';

// Assets
import theme from 'assets/theme';
import { LoadingButton } from '@mui/lab';

const EmployeeServiceDetail = () => {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
 
    const { serviceId } = useParams();
    const [loading, setLoading] = useState({ initial: true, pay: false });
    const [factor, setFactor] = useState(false);
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([
        { path: '/dashboard', title: 'پیشخوان' },
        { path: '/dashboard/services/', title: 'خدمات رفاهی' },
    ]);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const pay = async () => {
        if (loading.pay) return;
        setLoading({ pay: true });

        const params = new URLSearchParams();
        params.append('service', serviceId);
        params.append('count', searchParams.get('count'));
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
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('service', serviceId);
            params.append('count', searchParams.get('count'));
            await dashboardService
                .get(`orders/create?${params.toString()}`, { signal })
                .then((res) => {
                    setFactor(res.data.data);
                    setBreadCrumbLinks([...breadCrumbLinks, { title: `خدمت ${res.data.data.service.name}` }]);
                })
                .catch((err) => { 
                });

            setLoading({
                ...loading,
                initial: false,
                filter: false,
                page: false,
            });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="32px">
            <DLoadingWrapper loading={loading.initial}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link
                        to="/app/dashboard/services/"
                        color="primary"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                            color: theme.main.palette.primary.main,
                        }}>
                        <EastIcon />
                        بازگشت
                    </Link>
                    <Breadcrumb links={breadCrumbLinks} />
                </Box>
                {factor && (
                    <Grid container mt="12px" spacing="20px">
                        <Grid item xs={6}>
                            <DBox sx={{ overflow: 'hidden' }}>
                                <Box
                                    bgcolor="primary.main"
                                    p="0 40px"
                                    sx={{ height: '68px', display: 'flex', alignItems: 'center' }}>
                                    <Typography color="common.white" fontSize="22px">
                                        {factor.service.name}
                                    </Typography>
                                </Box>
                                <Box p="22px 38px" sx={{ display: 'flex', gap: '40px' }}>
                                    <Box sx={{ display: 'grid', flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pb: '10px', gap: '5px' }}>
                                            <Typography color="primary" fontSize="18px">
                                                {(+factor.service.price).toLocaleString()}
                                            </Typography>
                                            <Typography color="primary" fontSize="14px">
                                                تومان
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: '10px', p: '12px 0', borderTop: '1px solid #EEEEEE' }}>
                                            <Typography fontSize="14px">تعداد: </Typography>
                                            <Typography fontSize="14px" color="rgba(0, 0, 0, 0.7)">
                                                {' '}
                                                {factor.count} عدد
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: '10px', p: '12px 0', borderTop: '1px solid #EEEEEE' }}>
                                            <Typography fontSize="14px">تامین‌کننده: </Typography>
                                            <Typography fontSize="14px" color="rgba(0, 0, 0, 0.7)">
                                                {' '}
                                                {factor.service.supplier}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: '10px', p: '12px 0', borderTop: '1px solid #EEEEEE' }}>
                                            <Typography fontSize="14px"> استان خدمت: </Typography>{' '}
                                            {factor.service?.province &&
                                                factor.service.province.map((item, index) => (
                                                    <Typography
                                                        key={item.id}
                                                        color="rgba(0, 0, 0, 0.7)"
                                                        component="span"
                                                        fontSize="14px">
                                                        {item}
                                                        {index + 1 !== factor.service.province.length && ' / '}
                                                    </Typography>
                                                ))}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', borderRadius: '10px', overflow: 'hidden' }}>
                                        <img
                                            style={{ width: '242px' }}
                                            src={`${process.env.REACT_APP_STORAGE_URL}/${factor.service.image}`}
                                        />
                                    </Box>
                                </Box>
                            </DBox>
                        </Grid>
                        <Grid item xs={6}>
                            <DBox sx={{ overflow: 'hidden' }}>
                                <Box
                                    bgcolor="primary.main"
                                    p="0 40px"
                                    sx={{ height: '68px', display: 'flex', alignItems: 'center' }}>
                                    <Typography color="common.white" fontSize="22px">
                                        مبلغ کل
                                    </Typography>
                                    <Typography
                                        mr="auto"
                                        color="common.white"
                                        fontSize="18px"
                                        sx={{ display: 'flex', gap: '5px' }}>
                                        {(+factor.final_price).toLocaleString()}
                                        <Typography component="span" fontSize="14px">
                                            تومان
                                        </Typography>
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'grid', p: '20px 36px 36px 36px' }}>
                                    <Box sx={{ p: '0 20px 26px 20px', mb: '26px', borderBottom: '1px solid #EEEEEE' }}>
                                        <Typography mb="24px" pr="20px" fontWeight={600} fontSize="18px">
                                            اعتبار کیف پول
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gap: '16px',
                                            }}>
                                            {factor.wallets &&
                                                factor.wallets.map((wallet) => (
                                                    <Box
                                                        key={wallet.id}
                                                        sx={{
                                                            display: 'flex',
                                                            p: '0 32px',
                                                        }}>
                                                        <Typography fontSize="14px">{wallet.name}</Typography>
                                                        <Typography
                                                            fontWeight={600}
                                                            mr="auto"
                                                            fontSize="18px"
                                                            sx={{ display: 'flex', gap: '5px' }}>
                                                            {(+wallet.remain).toLocaleString()}
                                                            <Typography component="span" fontSize="14px">
                                                                تومان
                                                            </Typography>
                                                        </Typography>
                                                    </Box>
                                                ))}
                                        </Box>
                                    </Box>
                                    <Box
                                        bgcolor="info.input"
                                        sx={{
                                            display: 'flex',
                                            p: '20px 36px 36px 36px',
                                            borderRadius: '10px',
                                            p: '18px 22px',
                                            mb: '30px',
                                        }}>
                                        <Typography color="primary" fontSize="18px" fontWeight={600}>
                                            مبلغ قابل پرداخت
                                        </Typography>
                                        <Typography
                                            mr="auto"
                                            color="primary"
                                            fontSize="20px"
                                            sx={{ display: 'flex', gap: '5px' }}>
                                            {(+factor.payment_price).toLocaleString()}
                                            <Typography component="span" fontSize="14px">
                                                تومان
                                            </Typography>
                                        </Typography>
                                    </Box>
                                    <LoadingButton
                                        variant="contained"
                                        size="large"
                                        color="brandWarning"
                                        loading={loading.pay}
                                        sx={{ height: '48px', fontSize: '16px' }}
                                        fullWidth
                                        onClick={pay}>
                                        پرداخت
                                    </LoadingButton>
                                </Box>
                            </DBox>
                        </Grid>
                    </Grid>
                )}
            </DLoadingWrapper>
        </DashboardCard>
    );
};

export default EmployeeServiceDetail;

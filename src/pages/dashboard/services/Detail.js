import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Form, Formik, FieldArray } from 'formik';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';
import DSnackbar from 'components/new/shared/DSnackbar';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DServiceDetailTabs from 'components/new/shared/DService/DServiceDetailTabs';
import DServiceDetailSlider from 'components/new/shared/DService/DServiceDetailSlider';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import { DEmployeeServiceWallet } from 'components/new/shared/DEmployeeServiceWallet';
import { DServiceDetailShare } from 'components/new/shared/DService/DServiceDetailShare';
import { DServiceOrderDetails } from 'components/new/shared/DService/DServiceOrderDetails';
import { LoadingButton } from '@mui/lab';

const EmployeeServiceDetail = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const { serviceId } = useParams();
    const [loading, setLoading] = useState({ initial: true, pay: false });
    const [service, setService] = useState({});
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([{ path: '/app/dashboard/', title: 'پیشخوان' }]);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    let buyButtonLabel = '';
    if (service?.type === 'COMPANY') {
        buyButtonLabel = 'تخصیص خدمت';
    } else {
        buyButtonLabel = service?.ticket_type?.slug === 'discount' ? 'خرید کد تخفیف' : 'خرید خدمت';
    } 

    const sendRequest = async (values) => {
        if (service?.type === 'COMPANY') {
            if (loading.pay) return;
            setLoading({ ...loading, pay: true });

            const params = new URLSearchParams();
            params.append('service', serviceId);
            params.append('count', 1);

            await dashboardService
                .create(`orders?${params.toString()}`)
                .then((res) => {
                    window.location.href = window.location.href + `?order_id=${res.data.data.id}`;
                })
                .catch((err) => {
                    err?.response?.status === 422 &&
                        err.response?.data?.meta?.msg &&
                        setSnackBarData({
                            show: true,
                            data: {
                                text: err.response.data.meta.msg,
                                type: 'error',
                            },
                        });
                });

            setLoading({ ...loading, pay: false });
        } else {
            let message = '';
            if (!values.count) {
                message = 'تعداد سرویس نمیتواند خالی باشد.';
            } else if (values.count > service.order_limit) {
                message = `تعداد بیشتر از سقف قابل سفارش است.`;
            } else if (values.count > service.value) {
                message = `تعداد سفارش بیشتر از موجمودی خدمت است.`;
            }

            if (!!message) {
                setSnackBarData({
                    show: true,
                    data: {
                        text: message,
                        type: 'error',
                    },
                });
                return;
            }

            navigate(`/app/dashboard/services/${serviceId}/payment?count=${values.count}`);
        }
    };
    const urlCopiedHandler = () => {
        setSnackBarData({
            show: true,
            data: {
                text: 'آدرس با موفقیت کپی شد.',
                type: 'success',
            },
        });
    };
    const showMessage = (message) => {
        setSnackBarData({
            show: true,
            data: {
                text: message,
                type: 'success',
            },
        });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`services/${serviceId}`, { signal })
                .then((res) => {
                    setService(res.data.data);

                    setBreadCrumbLinks([
                        ...breadCrumbLinks,
                        {
                            path:
                                res.data.data.type === 'BASIC'
                                    ? '/app/dashboard/services/basic/'
                                    : '/app/dashboard/services/company/',
                            title: res.data.data.type === 'BASIC' ? 'خدمات عمومی' : 'خدمات سازمانی',
                        },
                        { title: res.data.data.name },
                    ]);
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
        <DashboardCard pt="2rem">
            <DLoadingWrapper loading={loading.initial}>
                {!orderId && <DEmployeeServiceWallet wallets={service.wallets} />}
                <Grid container>
                    <Grid item xs={12}>
                        <Breadcrumb links={breadCrumbLinks} />
                    </Grid>
                </Grid>

                <Grid container mt="4px" spacing="20px">
                    {orderId && (
                        <DServiceOrderDetails
                            isDiscountCode={service?.ticket_type?.slug === 'discount'}
                            onCodeCopied={showMessage}
                        />
                    )}
                    <Grid item xs={7.5}>
                        <DBox sx={{ p: '20px 28px' }}>
                            <Grid container>
                                <Grid item xs={12} sx={{ pb: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <Box>
                                        <Typography sx={{ fontSize: '22px' }}>{service.name}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {service?.ticket_type?.slug === 'discount' && (
                                            <Typography color="primary" fontSize="16px" fontWeight="600">
                                                ارزش کد تخفیف
                                            </Typography>
                                        )}

                                        <Typography
                                            color="primary.main"
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}>
                                            {(+service.price).toLocaleString()}{' '}
                                            <Typography component="span" sx={{ fontSize: '14px' }}>
                                                تومان
                                            </Typography>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ borderTop: '1px solid #EEEEEE', p: '16px 0', borderBottom: '1px solid #EEEEEE' }}>
                                    <Typography sx={{ fontSize: '14px' }} color="text.main">
                                        {service.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box
                                        sx={{
                                            p: '16px 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}>
                                        <StorefrontIcon />
                                        <Typography sx={{ fontSize: '14px' }}>
                                            تامین کننده:{' '}
                                            <Typography color="text.main" component="span" sx={{ fontSize: '14px' }}>
                                                {service?.supplier}
                                            </Typography>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sx={{ p: '16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FmdGoodIcon />
                                    <Typography sx={{ fontSize: '14px' }}>
                                        استان خدمت:{' '}
                                        {service?.province &&
                                            service?.province.map((item, index) => (
                                                <Typography
                                                    key={item.id}
                                                    color="text.main"
                                                    component="span"
                                                    sx={{ fontSize: '14px' }}>
                                                    {item}
                                                    {index + 1 !== service.province.length && ' / '}
                                                </Typography>
                                            ))}
                                    </Typography>
                                </Grid>

                                {/* Share */}
                                <DServiceDetailShare onUrlCopied={urlCopiedHandler} />

                                {!orderId && (
                                    <Grid item xs={12}>
                                        <Formik initialValues={{ count: 1 }} onSubmit={sendRequest}>
                                            {({ values, setFieldValue }) => (
                                                <Form>
                                                    <Box
                                                        sx={{
                                                            pt: '14px',
                                                            borderTop: '1px solid #EEEEEE',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}>
                                                        {service?.type !== 'COMPANY' && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                                <Typography>تعداد:</Typography>
                                                                <CustomInputBase
                                                                    type="number"
                                                                    name="count"
                                                                    variant="outlined"
                                                                    inputProvidedProps={{
                                                                        inputProps: {
                                                                            min: 1,
                                                                        
                                                                        },
                                                                    }}
                                                                    sx={{
                                                                        width: '80px !important',
                                                                        '& .MuiInputBase-root': { height: '32px !important' },
                                                                        '& input': { p: '0 8px 0 0' },
                                                                    }}
                                                                />
                                                            </Box>
                                                        )}
                                                        <LoadingButton
                                                            variant="contained"
                                                            color="brandWarning"
                                                            type="submit"
                                                            loading={loading.pay}
                                                            // startIcon={<ShoppingCartOutlinedIcon sx={{ m: '0 0 0 10px' }} />}
                                                            sx={{ fontSize: '17px', width: '300px', mr: 'auto' }}>
                                                            {buyButtonLabel}
                                                        </LoadingButton>
                                                    </Box>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Grid>
                                )}
                            </Grid>
                        </DBox>
                    </Grid>
                    <Grid item xs={4.5}>
                        <DServiceDetailSlider medias={service.images} />
                    </Grid>
                    <Grid item xs={12}>
                        <DServiceDetailTabs service={service} />
                    </Grid>
                </Grid>
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};

export default EmployeeServiceDetail;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DServiceDetailTabs from 'components/new/shared/DService/DServiceDetailTabs';
import DServiceDetailSlider from 'components/new/shared/DService/DServiceDetailSlider';
import LoadingButton from '@mui/lab/LoadingButton';
import { ColorWhite } from '../../../assets/theme/color';
import { Form, Formik } from 'formik';
import CustomInputNumber from '../../../components/Common/Form/CustomInputNumber';
import * as Yup from 'yup';
import ConfiramtionRequest from './ConfiramtionRequest';
import { Link } from 'react-router-dom';
const OrganizationServiceDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId } = useParams();
    const [loading, setLoading] = useState({ initial: true });
    const [service, setService] = useState({});
    const [values, setValues] = useState({});
    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([
        { path: '/app/organization/dashboard/', title: 'پیشخوان' },
        { path: '/app/organization/services/service-requests', title: 'خدمات سازمانی' },
    ]);

    const Validation_Schema = Yup.object({
        count: Yup.string('').required('required'),
    });

    const Initial_Values = {
        count: 100,
    };
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await OrganizationService.get(`services/${serviceId}`, { signal })
                .then((res) => {
                    setService(res.data.data);
                    setBreadCrumbLinks([...breadCrumbLinks, { title: res.data.data.name }]);
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
    const closeAcceptDialog = () => {
        setShowAcceptDialog(false);
    };
    return (
        <DashboardCard pt="2rem">
            {showAcceptDialog && (
                <ConfiramtionRequest
                    loading={loading}
                    title="درخواست"
                    onClose={closeAcceptDialog}
                    service={service}
                    count={values.count}
                    // onAccept={() => changeStatusRequest("ACCEPT")}
                />
            )}
            <DLoadingWrapper loading={loading.initial}>
                <Breadcrumb links={breadCrumbLinks} />

                <Grid container mt="30px" spacing="20px">
                    <Grid item xs={7.5}>
                        <DBox sx={{ p: '20px 28px' }}>
                            <Box sx={{ pb: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Box>
                                    <Typography sx={{ fontSize: '22px', fontWeight: 500 }}>{service.name}</Typography>
                                </Box>
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
                            <Box sx={{ borderTop: '1px solid #EEEEEE', p: '16px 0' }}>
                                <Typography sx={{ fontSize: '14px' }} color="text.main">
                                    {service.description}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    borderTop: '1px solid #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                <StorefrontIcon />
                                <Typography sx={{ fontSize: '14px' }}>
                                    تامین کننده:{' '}
                                    <Typography color="text.main" component="span" sx={{ fontSize: '14px' }}>
                                        {service?.supplier?.name}
                                    </Typography>
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    borderTop: '1px solid #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
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
                                                {item.name}
                                                {index < service.province.length - 1 ? ' / ' : ''}
                                            </Typography>
                                        ))}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    borderTop: '1px solid #EEEEEE',
                                    p: '16px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                <CalendarTodayOutlinedIcon />
                                <Typography sx={{ fontSize: '14px' }}>
                                    تاریخ اعتبار:{' '}
                                    {service.expired_at ? new Date(service.expired_at).toLocaleDateString('fa-IR') : 'تاریخ انقضا ندارد.'}
                                </Typography>
                            </Box>
                        </DBox>
                    </Grid>
                    <Grid item xs={4.5}>
                        <DServiceDetailSlider service={service} medias={service.images} />
                    </Grid>
                    <Grid item xs={12}>
                        <DServiceDetailTabs service={service} />
                    </Grid>
                    <Grid item xs={12}>
                        <DBox sx={{ p: '20px 28px', disply: 'flex', alinItems: 'center', flexDirection: 'row' }}>
                            <Formik
                                initialValues={Initial_Values}
                                validationSchema={Validation_Schema}
                                // onSubmit={handleSubmit}
                            >
                                {({ values }) => (
                                    <Form style={{ width: '100%' }}>
                                        <Grid container mt="1.3rem" className="flex">
                                            <Grid item xs={6} sm={6} className="flex" justifyContent="flex-start" gap="1rem">
                                                <label htmlFor="number" className="label-number-dashboard">
                                                    تعداد
                                                </label>
                                                <CustomInputNumber name="count" sx={{ width: '6.5rem !important' }} />
                                            </Grid>

                                            <Grid
                                                item
                                                xs={6}
                                                sm={6}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    gap: '10px',
                                                    marginTop: '20px',
                                                }}>
                                                <LoadingButton
                                                    loading={loading.save}
                                                    onClick={() => {
                                                        setShowAcceptDialog(true);
                                                    
                                                        setValues(values);
                                                    }}
                                                    variant="contained"
                                                    sx={yellowButtonStyle}>
                                                    درخواست خدمت
                                                </LoadingButton>
                                                <Link
                                                    style={{ textDecoration: 'none', display: 'grid' }}
                                                    to={`/app/organization/services/service-requests`}>
                                                    <LoadingButton
                                                        loading={loading.save}
                                                        onClick={() => {
                                                            // setShowAcceptDialog()
                                                            // setValues(values)
                                                        }}
                                                        variant="contained"
                                                        sx={uploadBtnStyle}>
                                                        بازگشت
                                                    </LoadingButton>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </DBox>
                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const uploadBtnStyle = {
    padding: '4px 35px',
    backgroundColor: 'rgba(8, 119, 189, 1)',
    border: '1px solid rgba(8, 119, 189, 1)',
    borderRadius: '5px',
    fontSize: 12,
    color: '#fff',
    textDecoration: 'none',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: '0 5px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
};
const yellowButtonStyle = {
    width: '25% !important ',
    height: '3.3rem',
    borderRaduis: '10px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(247, 201, 6, 1)',
        color: '#000',
    },
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};
export default OrganizationServiceDetail;

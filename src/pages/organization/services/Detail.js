import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Box, Button, Icon, Grid, Typography } from '@mui/material';
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

const OrganizationServiceDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId } = useParams();
    const [loading, setLoading] = useState({ initial: true });
    const [service, setService] = useState({});
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([{ path: '/app/organization/dashboard/', title: 'پیشخوان' }]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await OrganizationService.get(`services/${serviceId}`, { signal })
                .then((res) => {
                    setService(res.data.data);
                    let serviceTypeLink = {
                        path: '/app/organization/services/basic/',
                        title: 'خدمات عمومی',
                    };
                    setBreadCrumbLinks([...breadCrumbLinks, serviceTypeLink, { title: res.data.data.name }]);
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
                                    sx={{ fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                                            <>
                                                <Typography
                                                    key={item.id}
                                                    color="text.main"
                                                    component="span"
                                                    sx={{ fontSize: '14px' }}>
                                                    {item.name}
                                                    {index < service.province.length - 1 ? ' / ' : ''}
                                                </Typography>
                                            </>
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
                                    {service.expired_at
                                        ? new Date(service.expired_at).toLocaleDateString('fa-IR')
                                        : 'تاریخ انقضا ندارد.'}
                                </Typography>
                            </Box>
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
        </DashboardCard>
    );
};

export default OrganizationServiceDetail;

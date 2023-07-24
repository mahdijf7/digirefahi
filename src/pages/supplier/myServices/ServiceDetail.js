import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom';
import { Box, Button, Icon, Grid, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DServiceDetailTabs from 'components/new/shared/DService/DServiceDetailTabs';
import DServiceDetailSlider from 'components/new/shared/DService/DServiceDetailSlider';
import SupplierService from "../../../service/api/supplier.service";
import {LoadingButton} from "@mui/lab";

const ServiceDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { serviceId } = useParams();
    const [loading, setLoading] = useState({ initial: true });
    const [service, setService] = useState({});
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([{ path: '/app/supplier/dashboard/', title: 'پیشخوان' }]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await SupplierService.get(`services/${serviceId}`, { signal })
                .then((res) => {
                    setService(res.data.data);
                    let serviceTypeLink = {
                        path: '/app/supplier/my-services/',
                        title: 'خدمات رفاهی من',
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
                                        service?.province.map((item) => (
                                            <Typography
                                                key={item.id}
                                                color="text.main"
                                                component="span"
                                                sx={{ fontSize: '14px' }}>
                                                {item.name}
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
                                <FmdGoodIcon />
                                <Typography sx={{ fontSize: '14px' }}>
                                    استان خدمت:{' '}
                                    {service?.province &&
                                        service?.province.map((item) => (
                                            <Typography
                                                key={item.id}
                                                color="text.main"
                                                component="span"
                                                sx={{ fontSize: '14px' }}>
                                                {item.name}
                                            </Typography>
                                        ))}
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
                    <Grid
                        item
                        xs={12} sm={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            marginTop: '20px',
                        }}>

                        <Link style={{ textDecoration: 'none',display: 'grid' }} to={`/app/supplier/my-services/`}>
                            <LoadingButton
                                loading={loading.save}
                                onClick={() => {
                                }}
                                variant="contained"
                                sx={blueLightBtnStyle}
                            >
                                بازگشت
                            </LoadingButton>
                        </Link>
                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const blueLightBtnStyle = {
    padding: "4px 40px",
    backgroundColor: "rgba(237, 251, 255, 1)",
    border: "1px solid rgba(8, 119, 189, 1)",
    borderRadius: "5px",
    fontSize: 12,
    color: "rgba(8, 119, 189, 1)",
    textDecoration: "none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: "0",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(237, 251, 255, 1)",
        color: "rgba(8, 119, 189, 1)",
        textDecoration: "none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(237, 251, 255, 1)",
        color: "rgba(8, 119, 189, 1)",
        textDecoration: "none",
    },
}
export default ServiceDetail;

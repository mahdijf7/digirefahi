import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import OrgDashboardLastServices from 'components/new/pages/organization/dashboard/OrgDashboardLastServices';
import OrgDashboardPublicServices from 'components/new/pages/organization/dashboard/OrgDashboardPublicServices';
import OrgDashboardCompanyServices from 'components/new/pages/organization/dashboard/OrgDashboardCompanyServices';
import OrgDashboardEvents from 'components/new/pages/organization/dashboard/OrgDashboardEvents';
import OrgDashboardUsage from 'components/new/pages/organization/dashboard/OrgDashboardUsage';
import OrgDashboardWallet from 'components/new/pages/organization/dashboard/OrgDashboardWallet';
import OrgDashboardOccasion from 'components/new/pages/organization/dashboard/OrgDashboardOccasion';

// Assets
import OrgDashboardGroupsImg from 'assets/image/organization/org-dashboard-groups.svg';
import OrgDashboardGroupsChart from 'assets/image/organization/org-dashboard-chart.svg';

const breadCrumbLinks = [{ title: 'پیشخوان' }];

const Dashboard = () => {
    const [loading, setLoading] = useState({
        initial: true,
    });
    const [dashboard, setDashboard] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await OrganizationService.get(`dashboard`, { signal })
                .then((res) => {
                    setDashboard(res.data.data);
                    setLoading({
                        initial: false,
                    });
                })
                .catch((err) => {
                    console.log('error occured!');
                });
        })();
        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DLoadingWrapper loading={loading.initial}>
                {dashboard && (
                    <>
                        <Grid container spacing="24px" mt="4px">
                            {dashboard?.wallet && <OrgDashboardWallet wallet={dashboard.wallet} />}

                            <Grid item lg={9}>
                                <Grid container spacing="24px">
                                    <Grid item xs={6}>
                                        <Link
                                            to="/app/organization/allocation/"
                                            style={{
                                                background: '#99D6FD',
                                                color: '#063775',
                                                ...linksSharedStyles,
                                            }}>
                                            <Typography>تخصیص رفاهی</Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link
                                            to="/app/organization/manage/employees/"
                                            style={{
                                                background: '#BD59CD',
                                                color: '#fff',
                                                ...linksSharedStyles,
                                            }}>
                                            <PersonAddAltIcon fontSize="large" />
                                            <Typography>افزودن کارمند</Typography>
                                        </Link>
                                    </Grid>
                                    <OrgDashboardUsage usage={dashboard.service_used} />

                                    <Grid item xs={12} md={6}>
                                        <Grid container spacing="24px" sx={{ minHeight: '100%' }}>
                                            <Grid item xs={12}>
                                                <DBox
                                                    sx={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        height: '186px',
                                                    }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <GroupIcon sx={{ color: '#0877BD', fontSize: '28px' }} />
                                                        <Typography sx={{ color: '#0877BD', fontSize: '30px', fontWeight: 600 }}>
                                                            {dashboard.employee_count} نفر
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ color: '#000' }}>
                                                        تعداد کارکنان استفاده کننده از خدمات شما
                                                    </Typography>
                                                </DBox>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DBox
                                                    sx={{
                                                        p: '40px 36px',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <ListIcon sx={{ color: '#0877BD', fontSize: '33px' }} />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                mt: '18px',
                                                            }}>
                                                            <Typography>{dashboard.service_count}</Typography>
                                                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>
                                                                تعداد خدمات
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            m: '0 30px',
                                                            height: '60px',
                                                            borderLeft: '1px solid #D9D9D9',
                                                        }}></Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <img src={OrgDashboardGroupsImg} style={{ width: '32px' }} />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                mt: '18px',
                                                            }}>
                                                            <Typography>{dashboard.group_count}</Typography>
                                                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>
                                                                تعداد گروه‌ها{' '}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            m: '0 30px',
                                                            height: '60px',
                                                            borderLeft: '1px solid #D9D9D9',
                                                        }}></Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <img src={OrgDashboardGroupsChart} style={{ width: '25px' }} />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                mt: '18px',
                                                            }}>
                                                            <Typography>{dashboard.share_rate ? +dashboard.share_rate.toFixed(0) : 0}</Typography>
                                                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}>
                                                                نرخ مشارکت{' '}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </DBox>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} lg={3}>
                                <Box sx={{ display: 'grid', gap: '18px' }}>
                                    {dashboard?.events && <OrgDashboardEvents events={dashboard.events} />}

                                    {dashboard?.occasion && <OrgDashboardOccasion occasions={dashboard.occasion} />}
                                </Box>
                            </Grid>

                            <OrgDashboardLastServices orders={dashboard.order} />

                            {dashboard?.company_service && <OrgDashboardCompanyServices services={dashboard.company_service} />}
                            {dashboard?.general_service && <OrgDashboardPublicServices services={dashboard.general_service} />}
                        </Grid>
                    </>
                )}
            </DLoadingWrapper>
        </DashboardCard>
    );
};

const linksSharedStyles = {
    borderRadius: '10px',
    display: 'flex',
    height: '72px',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    fontSize: '20px',
    textDecoration: 'none',
};
export default Dashboard;

import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import { EmpDashboardSumOfCompanyCredits } from 'components/new/pages/employees/dashboard/EmpDashboardSumOfCompanyCredits';
import { EmpDashboardGuidline } from 'components/new/pages/employees/dashboard/EmpDashboardGuidline';
import { EmpDashboardCompanyBanners } from 'components/new/pages/employees/dashboard/EmpDashboardCompanyBanners';
import { EmpDashboardAdminBanners } from 'components/new/pages/employees/dashboard/EmpDashboardAdminBanners';
import { EmpDashboardSuppliers } from 'components/new/pages/employees/dashboard/EmpDashboardSuppliers';
import { EmpDashboardCategories } from 'components/new/pages/employees/dashboard/EmpDashboardCategories';
import { EmpDashboardServices } from 'components/new/pages/employees/dashboard/EmpDashboardServices';
import { DEmployeeCreditChart } from 'components/new/shared/DEmployeeCreditChart';

// Assets
import 'assets/style/dashboard.scss';

const breadCrumbLinks = [{ title: 'پیشخوان' }];

const Dashboard = () => {
    const [loading, setLoading] = useState({ initial: true });
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`dashboard`, { signal })
                .then((res) => {
                    console.log(res);

                    setDashboard(res.data.data);
                })
                .catch((err) => {});
            setLoading({ initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="2rem">
            <DLoadingWrapper loading={loading.initial}>
                {dashboard && (
                    <>
                        {/* Header */}
                        <Grid container>
                            <Grid item xs={12} mb="24px">
                                <Breadcrumb links={breadCrumbLinks} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing="20px">
                                    <Grid item xs={3}>
                                        <Grid container spacing="20px">
                                            <Grid item xs={12}>
                                                <DEmployeeCreditChart />
                                            </Grid>
                                            <EmpDashboardSumOfCompanyCredits amount={dashboard.count_service_assign} />
                                            <EmpDashboardGuidline />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={9}>
                                        <Grid container spacing="20px">
                                            <EmpDashboardCompanyBanners />
                                            <EmpDashboardAdminBanners />
                                            <EmpDashboardCategories categories={dashboard.category} />
                                            <EmpDashboardSuppliers suppliers={dashboard.supplier} />
                                            <EmpDashboardServices services={dashboard.service_company} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </DLoadingWrapper>
        </DashboardCard>
    );
};

export default Dashboard;

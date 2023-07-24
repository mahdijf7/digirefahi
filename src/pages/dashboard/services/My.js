import { Grid, Typography } from '@mui/material';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import { DEmployeeCreditChart } from 'components/new/shared/DEmployeeCreditChart';
import { EmployeeBoughtBasicServices } from 'components/new/pages/employees/my/EmployeeBoughtBasicServices';
import { EmployeeBoughtCompanyServices } from 'components/new/pages/employees/my/EmployeeBoughtCompanyServices';

const My = () => {
    return (
        <DashboardCard pt="30px">
            <Grid container>
                <Grid item xs={12} mb="24px">
                    <Breadcrumb links={breadCrumbLinks} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing="20px">
                        <Grid item xs={3}>
                            <DEmployeeCreditChart />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing="20px">
                                <EmployeeBoughtCompanyServices />
                                <EmployeeBoughtBasicServices />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};
const breadCrumbLinks = [{ path: '/app/dashboard/', title: 'پیشخوان' }, { title: 'خدمات رفاهی من' }];

export default My;

import { Grid, Box, Typography, Divider } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';

// Assets
import DashboardShop from 'assets/image/employee/dashboard-shop.svg';

const EmpDashboardSumOfCompanyCredits = ({ amount }) => {
    return (
        <Grid item xs={12}>
            <DBox sx={wrapperStyles}>
                <img src={DashboardShop} alt="" />
                <Typography sx={{ fontSize: '14px', mt: '10px' }}>جمع خدمات سازمانی تخصیص داده شده</Typography>
                <Typography color="primary.main" sx={{ fontSize: '30px', mt: '14px' }}>
                    {amount.toLocaleString()}<Typography component="span" sx={{ fontSize: '12px' }}>تومان</Typography>
                </Typography>
            </DBox>
        </Grid>
    );
};
const wrapperStyles = {
    p: '14px 10px 20px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};

export { EmpDashboardSumOfCompanyCredits };

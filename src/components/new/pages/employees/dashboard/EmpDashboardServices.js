import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Components
import DBox from 'components/new/shared/DBox';
import DServiceBox from 'components/new/shared/DServiceBox';

const EmpDashboardServices = ({ services }) => {
    return (
        <Grid item xs={12}>
            <DBox sx={wrapperStyles}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '20px' }}>خدمات سازمانی من</Typography>
                        <Button
                            component={Link}
                            to="/app/dashboard/services/company/"
                            variant="contained"
                            color="primary"
                            sx={{ minWidth: '110px', fontSize: '12px' }}>
                            مشاهده همه
                        </Button>
                    </Grid>
                    <Grid item xs={12} mt="32px">
                        <Grid container spacing="65px">
                            {services.map((service) => (
                                <Grid key={service.id} item xs={4}>
                                    <DServiceBox service={service} to={`/app/dashboard/services/${service.id}`} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </DBox>
        </Grid>
    );
};
const wrapperStyles = {
    p: '24px 30px 30px 40px',
};

export { EmpDashboardServices };

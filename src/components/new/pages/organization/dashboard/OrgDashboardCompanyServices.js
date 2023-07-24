import { Grid, Typography, Box } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';
import DServiceBox from 'components/new/shared/DServiceBox';
import { Link } from 'react-router-dom';

const OrgDashboardCompanyServices = ({ services }) => {
    return (
        <Grid item xs={12} lg={6}>
            <DBox sx={{ p: '26px ' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',  flexWrap: 'wrap'
                            }}>
                            <Typography sx={{fontSize: '20px'}}>تازه ترین خدمات سازمانی</Typography>

                            <Link style={style} to="/app/organization/services/service-requests/">
                                مشاهده همه خدمات
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} mt="20px">
                        <Grid container spacing="28px">
                            {services.map((service) => (
                                <Grid item xs={12} sm={4} key={service.id}>
                                    <DServiceBox to={`/app/organization/services/${service.id}`} small service={service} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </DBox>
        </Grid>
    );
};
const style = {
    background: '#EDFBFF',
    border: '1px solid #0877BD',
    borderRadius: '5px',
    padding: '0 10px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#0877BD',
    textDecoration: 'none'
};

export default OrgDashboardCompanyServices;

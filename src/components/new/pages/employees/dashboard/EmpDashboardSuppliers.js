import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Components
import DBox from 'components/new/shared/DBox';
import { DItem } from 'components/new/shared/DItem';

const EmpDashboardSuppliers = ({ suppliers }) => {
    return (
        <Grid item xs={12}>
            <DBox sx={wrapperStyles}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '20px' }}> خدمات بر اساس تامین کننده </Typography>
                        <Button
                            component={Link}
                            to="/app/dashboard/services/suppliers/"
                            variant="contained"
                            color="primary"
                            sx={{ minWidth: '110px', fontSize: '12px' }}>
                            مشاهده همه
                        </Button>
                    </Grid>
                    <Grid item xs={12} mt="32px">
                        <Grid container spacing="65px">
                            {suppliers.map((supplier) => (
                                <Grid key={supplier.id} item xs={4}>
                                    <DItem
                                        name={supplier.name}
                                        image={supplier.logo}
                                        to={`/app/dashboard/services?suppliers=${supplier.id},${supplier.name}`}
                                    />
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

export { EmpDashboardSuppliers };

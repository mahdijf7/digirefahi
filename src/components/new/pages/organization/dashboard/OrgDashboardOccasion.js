import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Components
import DBox from 'components/new/shared/DBox';

const OrgDashboardOccasion = ({ occasions }) => {
    return (
        <DBox sx={{ p: '24px 26px 21px 26px' }}>
            <Typography sx={{ fontSize: '20px' }}>مناسبت های این ماه </Typography>
            <Box sx={{ display: 'grid', mb: '30px', mt: '14px' }}>
                {occasions.map((occasion, index) => (
                    <Box
                        sx={{
                            borderBottom: '1px solid #EEEEEE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            gap: '10px',
                        }}
                        key={`occasion-${index}`}>
                        <Typography sx={{ fontSize: '12px' }} noWrap={true}>
                            {occasion.name}
                        </Typography>
                        <Typography sx={dateStyle}>
                            {new Date(occasion.date).toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </DBox>
    );
};
const dateStyle = {
    border: '1px solid #0877BD',
    borderRadius: '5px',
    padding: '0 6px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: '#0877BD',
};

export default OrgDashboardOccasion;

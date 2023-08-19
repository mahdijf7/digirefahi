import { Typography, Box, darken } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';
let moment = require('moment-jalaali');
moment.loadPersian({dialect: 'persian-modern'});

const OrgDashboardOccasion = ({ occasions }) => {
    return (
        <DBox sx={{ pb: '20px' }}>
            <Typography sx={{ fontSize: '20px', mt: '24px', pr: '26px' }}>مناسبت های این ماه </Typography>
            <Box sx={{ display: 'grid', mt: '14px', maxHeight: '150px', overflow: 'auto', p: '0 26px' }}>
                {occasions.length === 0 && (
                    <Typography
                        color="primary"
                        sx={{
                            fontSize: '11px',
                        }}>
                        مناسبتی برای نمایش وجود ندارد.
                    </Typography>
                )}
                {occasions.map((occasion, index) => (
                    <Box
                        sx={{
                            borderBottom: '1px solid #EEEEEE',
                            '&:last-child': {
                                border: 'none',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            gap: '10px',
                        }}
                        key={`occasion-${index}`}>
                        <Typography sx={{ fontSize: '12px' }} noWrap={true}>
                            {occasion.type === 'birthday' ? 'تولد' : 'سالگرد ازدواج'} {occasion.firstname} {occasion.lastname}
                        </Typography>
                        <Typography sx={dateStyle}>
                            {new Intl.DateTimeFormat('fa-IR', {month: 'long', day: 'numeric'}).format(new Date(occasion.date))}
                             
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

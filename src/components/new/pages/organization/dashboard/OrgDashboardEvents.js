import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Components
import DBox from 'components/new/shared/DBox';

let moment = require('moment-jalaali');

const OrgDashboardEvents = ({ events }) => {
    return (
        <DBox sx={{ p: '24px 26px 21px 26px', alignItems: 'flex-start' }}>
            <Typography sx={{ fontSize: '20px' }}>رویداد های این ماه</Typography>
            <Box sx={{ display: 'grid', mb: '30px', mt: '14px', width: '100%' }}>
                {events.length === 0 && (
                    <Typography
                        color="primary"
                        sx={{
                            fontSize: '11px',
                        }}>
                        رویدادی برای نمایش وجود ندارد.
                    </Typography>
                )}
                {events.map((event) => (
                    <Box
                        sx={{
                            borderBottom: '1px solid #EEEEEE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            gap: '10px',
                        }}
                        key={event.id}>
                        <Typography sx={{ fontSize: '12px' }} noWrap={true}>
                            {event.name}
                        </Typography>
                        <Typography
                            color="primary"
                            sx={{
                                fontSize: '11px',
                                borderRadius: '5px',
                                p: '0 6px',
                                border: '1px solid #0877BD',
                                lineHeight: '22px',
                            }}>
                            {moment.duration(moment(event.date).diff(new Date())).humanize()} دیگر
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Link style={style} to="/app/organization/management-events/">
                مشاهده همه رویدادها
            </Link>
        </DBox>
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
    textDecoration: 'none',
    ml: 'auto',
};

export default OrgDashboardEvents;

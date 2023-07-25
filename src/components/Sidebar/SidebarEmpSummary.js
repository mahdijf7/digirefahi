import { useContext } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Utils
import AuthContext from 'store/Auth-context';
import { Link } from 'react-router-dom';

const SidebarEmpSummary = () => {
    const { account } = useContext(AuthContext);
    const { name, avatar, chart, groups } = account;
    const groupArray = Object.values(groups);
    const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                fontSize: '12px',
                direction: 'rtl',
                textAlign: 'right',
            },
        })
    );
    let groupArrayText = groupArray.map((group, index) => `گروه ${group}${index < groupArray.length - 1 ? ' / ' : ''}`);

    return (
        <Box sx={{ display: 'grid' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '10px' }}>
                <Avatar src={`${process.env.REACT_APP_STORAGE_URL}/${avatar}`} />
                <Box sx={{ display: 'grid' }}>
                    <Typography noWrap>{name}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                 
                <Box sx={{ display: 'grid', flex: 1 }}>
                    {chart && <Typography sx={{ fontSize: '12px' }}>{chart.name}</Typography>}

                    {groups && groupArray.length > 0 && (
                        <StyledTooltip placement="left" title={groupArrayText}>
                            <Typography noWrap sx={{ fontSize: '12px' }}>
                                {groupArrayText}
                            </Typography>
                        </StyledTooltip>
                    )}
                </Box>
                <Box sx={{ flex: '0 0 30px', display: 'flex' }}>
                    <Link to="/app/dashboard/profile/" style={{ display: 'flex', color: '#0877BD', marginRight: 'auto' }}>
                        <BorderColorIcon />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export { SidebarEmpSummary };

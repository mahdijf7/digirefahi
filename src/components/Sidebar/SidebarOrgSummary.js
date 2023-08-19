import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Utils
import AuthContext from 'store/Auth-context';

const SidebarOrgSummary = () => {
    const { account } = useContext(AuthContext);
    const { name, logo } = account;
    const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                fontSize: '12px',
                direction: 'rtl',
                textAlign: 'right',
            },
        })
    );
    return (
        <Box sx={{ display: 'grid' }}>
            {logo && <Box sx={{ alignItems: 'center' }} height="70px" className="flex">
                <img src={`${process.env.REACT_APP_STORAGE_URL}/${logo}`} style={{ maxWidth: '100%', maxHeight: '70px' }} />
            </Box>}
             
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: '24px' }}>
                <Box sx={{ display: 'grid' }}>
                    <StyledTooltip placement="left" title={name}>
                        <Typography noWrap fontSize="12px">
                            {name}
                        </Typography>
                    </StyledTooltip>
                </Box>
                <Link to="/app/organization/profile-edit/" style={{ display: 'flex', color: '#0877BD', marginRight: 'auto' }}>
                    <BorderColorIcon />
                </Link>
            </Box>
        </Box>
    );
};

export { SidebarOrgSummary };

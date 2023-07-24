import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Utils
import AuthContext from 'store/Auth-context';

// Assets
import DigirefahiLogo from 'assets/icone/svg/LogoText';

const SidebarAdminSummary = () => {
    const { account } = useContext(AuthContext);
    const { name } = account;

    return (
        <Box sx={{ display: 'grid' }}>
            <Box sx={{ alignItems: 'center' }} height="70px" className="flex">
                <DigirefahiLogo />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box sx={{ display: 'grid' }}>
                    <Typography noWrap fontSize="12px">
                        ادمین _ {name}
                    </Typography>
                </Box>
                {/* <Link to="/app/dashboard/profile/" style={{ display: 'flex', color: '#0877BD', marginRight: 'auto' }}>
                    <BorderColorIcon />
                </Link> */}
            </Box>
        </Box>
    );
};

export { SidebarAdminSummary };

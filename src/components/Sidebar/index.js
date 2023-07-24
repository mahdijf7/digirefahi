import { Box, Divider } from '@mui/material';
import { useState, useContext } from 'react';
import SidebarProfile from './SidebarProfile';
import LogoText from '../../assets/icone/svg/LogoText';
import AuthContext from 'store/Auth-context';
import allLinks from './links';
import SidebarLink from './SidebarLink';
import { List } from '@mui/material';

const Sidebar = ({ sx }) => {
    const [progress, setProgress] = useState(75);
    const { login, token, role, logout, account } = useContext(AuthContext);

    const visibleLinkesBasedOnRole = allLinks[role];

    return (
        <Box sx={sx}>
            <SidebarProfile progress={progress} />
            <Divider sx={{ m: '5px' }} />
            <List sx={{ p: '26px', m: '0' }}>
                {visibleLinkesBasedOnRole.map((link) => {
                    return <SidebarLink key={link.key} link={link} />;
                })}
            </List>
            <Box marginTop="auto" width="100%" height="5rem">
                <Divider sx={{ m: '5px' }} />
                <Box height="3rem" className="flex">
                    <LogoText />
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;

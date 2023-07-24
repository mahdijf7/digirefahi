import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import LogOut from '../../assets/icone/svg/LogOut';
import ProfileCircled from '../../assets/icone/svg/ProfileCircled';
import AuthContext from 'store/Auth-context';

const MenuProfile = ({ profileMenu, setProfileMenu, t }) => {
    const navigate = useNavigate();
    const { account, logout } = useContext(AuthContext);
    const location = useLocation();
    const isWelcomeRoute = location.pathname === '/app/welcome';

    const redirectionUrls = {
        ADMIN: '/app/admin/account/',
        COMPANY: '/app/organization/user-account/',
        SUPPLIER: '/app/supplier/account/',
        EMPLOYEE: '/app/dashboard/user-account/',
    };

    return (
        <Menu
            sx={menuStyle}
            id="profile-menu"
            open={!!profileMenu}
            anchorEl={profileMenu}
            onClose={() => setProfileMenu(false)}
            disableAutoFocusItem>
            <Box color="common.black" className="headerDropDown">
                <MenuItem disabled={isWelcomeRoute} onClick={() => navigate(redirectionUrls[account.role])}>
                    {t('header.profile')}
                    <ProfileCircled />
                </MenuItem>

                <MenuItem className="menuItem" onClick={() => logout()}>
                    {t('header.logout')}
                    <LogOut />
                </MenuItem>
            </Box>
        </Menu>
    );
};
const menuStyle = {
    margin: ' 10px !important',
    '& div': {
        borderRadius: '14px',
        boxShadow: ' 0px 0px 12px 3px rgba(0, 0, 0, 0.05)',
    },
    '& .MuiDivider-root': {
        margin: '0 auto',
    },
    '& ul': {
        backgroundColor: 'common.white',
        paddingTop: '0px',
        paddingBottom: '0px',
    },
    '& li': {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        margin: '.4rem 0',
    },
};

export default MenuProfile;

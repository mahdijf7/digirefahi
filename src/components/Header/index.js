import { useState, useContext } from 'react';
import { useLayoutState } from '../../store/LayoutContext';
import { useTranslation } from 'react-i18next';
import MenuProfile from './MenuProfile';
import '../../assets/style/header.scss';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import Bell from '../../assets/icone/svg/Bell';
import User from '../../assets/icone/svg/User';
import { useLocation } from 'react-router-dom';

// Utils
import AuthContext from 'store/Auth-context';

const Header = () => {
 
    const { t } = useTranslation();
    const { isSidebarOpened, setIsSidebarOpened } = useLayoutState();
    const { account } = useContext(AuthContext);
    const [profileMenu, setProfileMenu] = useState(false);
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/app/admin');
    const isOrganization = location.pathname.startsWith('/app/organization');
    console.log(account, 123);
    return (
        <AppBar
            position="sticky"
            className="appBar"
            sx={{
                backgroundColor: 'common.white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.03)',
                height: ' 6.7rem',
                zIndex: 1000,
            }}>
            <Toolbar p="0 1rem">
                <Box display="flex" width="100%" height="6.7rem" justifyContent="space-between">
                    {account.role === 'EMPLOYEE' && (
                        <Box
                            sx={{
                                p: '14px 0',
                                display: 'flex',
                                flex: '0 0 80px',
                                '& img': { width: '100%', height: '100%', objectFit: 'cover' },
                            }}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}/${account.company_logo}`} alt="" />
                        </Box>
                    )}

                    <Box
                        display="flex"
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            mr: 'auto',
                        }}>
                        {/* {!isAdmin && !isOrganization && (
                            <IconButton aria-haspopup="true" color="inherit" aria-controls="profile-menu">
                                <Bell />
                            </IconButton>
                        )} */}
                        <IconButton
                            aria-haspopup="true"
                            color="inherit"
                            aria-controls="profile-menu"
                            onClick={(e) => setProfileMenu(e.currentTarget)}>
                            <User />
                        </IconButton>
                    </Box>
                </Box>
                <MenuProfile profileMenu={profileMenu} setProfileMenu={setProfileMenu} t={t} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;

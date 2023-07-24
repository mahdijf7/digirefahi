import { List, ListItem, ListItemIcon, ListItemText, Collapse, useTheme, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function linkIsOpen(location, startPath) {
    return startPath && location.pathname.indexOf(startPath) > -1;
}

const SidebarLink = (props) => {
    const { isChildLink } = props;
    const { title, path, startPath, icon, children } = props.link;
    const { t } = useTranslation();
    const theme = useTheme();
    const location = useLocation();
    const isWelcomeRoute = location.pathname === '/app/welcome';

    const [open, setOpen] = useState(linkIsOpen(location, startPath));

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        setOpen(linkIsOpen(location, startPath));
    }, [location]);

    const styleListItem = {
        justifyContent: 'center',
        fill: theme.palette.common.black,
        stroke: theme.palette.common.black,
        minWidth: '44px',
    };
    const styleListButton = {
        justifyContent: open ? 'initial' : 'center',
        alignItems: 'center',
        marginBottom: '4px',
        padding: 0,
        '&:last-of-type': {
            margin: '0 !important',
        },

        '& a': {
            transition: 'all 0.3s',
        },
        '&>a, &>div': {
            borderRadius: isChildLink ? '5px 0 0 5px' : '10px',
        },
        '&>a:hover, &>a.active, &>div.active, &>div:hover': {
            background: '#EDFBFF',

            '& .MuiTypography-root': {
                color: '#0877BD',
                fontWeight: 600,
            },
            '& svg': {
                color: '#0877BD',
                stroke: '#0877BD',
            },
        },
    };
    const styleListText = {
        textAlign: 'start',
        color: 'common.black',
        paddingRight: isChildLink ? '22px !important' : '0px !important',
        '& .MuiTypography-root': {
            fontSize: isChildLink ? '12px !important' : '14px !important',
        },
    };
    const styleChildren = {
        padding: '8px 22px 8px 28px',
        '& .MuiListItem-root .active, & .MuiListItem-root>a:hover': {
            position: 'relative',
            '&:before': {
                content: `''`,
                position: 'absolute',
                top: '0px',
                right: '0px',
                height: '100%',
                borderRight: ' 2px solid #0877BD',
                zIndex: 1,
            },
        },
        '&:before': {
            content: `''`,
            position: 'absolute',
            top: '0px',
            right: '22px',
            height: '100%',
            borderRight: ' 1px solid #D9D9D9',
            zIndex: 1,
        },
    };
    const arrowStyles = {
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        display: 'flex',
        '& svg': {
            transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
        },
    };
    const CustomComponent = children ? 'div' : NavLink;

    return (
        <>
            <ListItem disabled={isWelcomeRoute} component="li" sx={styleListButton}>
                <CustomComponent
                    to={isWelcomeRoute ? isWelcomeRoute : path}
                    end={children && undefined}
                    className={(({ isActive }) => (isActive ? 'active' : undefined), open ? 'active' : undefined)}
                    onClick={handleClick}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        textDecoration: 'none',
                        height: isChildLink ? '28px' : '46px',
                        cursor: 'pointer',
                    }}>
                    {/* Icon */}
                    {!isChildLink && <ListItemIcon sx={styleListItem}>{icon}</ListItemIcon>}

                    {/* Text */}
                    <ListItemText primary={title} sx={styleListText} />

                    {children && (
                        <Box sx={arrowStyles}>
                            <ExpandMoreIcon />
                        </Box>
                    )}
                </CustomComponent>
            </ListItem>

            {/* Render children */}
            {children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List aria-disabled={isWelcomeRoute} sx={styleChildren} component="div" disablePadding>
                        {children.map((child) => (
                            <SidebarLink link={child} isChildLink={true} key={child.key} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};
export default SidebarLink;

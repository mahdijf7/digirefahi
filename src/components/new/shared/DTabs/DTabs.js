import { Tabs, Tab, Typography } from '@mui/material';

// Assets
import theme from 'assets/theme';

const DTabs = ({ tabs, underlineStyle = false, activeTabId, onTabChange }) => {
    return (
        <Tabs value={activeTabId} onChange={onTabChange} sx={tabPanelStyles}>
            {tabs
                .filter((tab) => !tab.hide)
                .map((tab) => (
                    <Tab
                        key={tab.id}
                        value={tab.id}
                        label={<Typography variant="body1"> {tab.title} </Typography>}
                        sx={underlineStyle ? underlineTabStyle : tabStyle}
                    />
                ))}
        </Tabs>
    );
};

const tabPanelStyles = {
    borderBottom: `0.1rem solid rgba(0,0,0,0.2)`,
    backgroundColor: 'white',
    minHeight: '32px !important',
    display: 'flex',
    direction: 'rtl',
    '& .MuiTabs-flexContainer': {
        gap: '10px',
    },
};

const tabStyle = {
    fontSize: '1.4rem',
    minHeight: '32px !important',
    height: '32px !important',
    '&.Mui-selected': {
        backgroundColor: '#0877BD',
        borderTopRightRadius: '0.5rem',
        borderTopLeftRadius: '0.5rem',
        color: theme.main.palette.common.white,
        borderBottom: '0rem',
    },
    '&.MuiTab-root': {
        width: 'max-content',
        minWidth: 'max-content',
    },
    '.MuiTabs-flexContainer': {
        borderBottom: '0.1rem solid',
        borderBottomColor: 'rgba(0,0,0,0.2)',
    },
};
const underlineTabStyle = {
    fontSize: '1.4rem',
    minHeight: 'auto !important',
    height: 'auto !important',
    padding: '0 12px 10px 12px',
    '&.Mui-selected': {
        color: theme.main.palette.primary.main,
        borderBottom: '0rem',
    },
    '&.MuiTab-root': {
        width: 'max-content',
        minWidth: 'max-content',
    },
    '.MuiTabs-flexContainer': {
        borderBottom: '0.1rem solid',
        borderBottomColor: 'rgba(0,0,0,0.2)',
    },
};

export default DTabs;

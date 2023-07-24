import { Box } from '@mui/material';

const DTabsPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box sx={{ direction: 'rtl', textAlign: 'right' }}>{children}</Box>}
        </div>
    );
};

export default DTabsPanel;

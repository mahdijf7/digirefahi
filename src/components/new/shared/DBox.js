import { Box } from '@mui/material';

const DBox = ({ sx, children, ...props }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            bgcolor="common.white"
            borderRadius="14px"
            boxShadow="0px 0px 12px 3px rgba(0, 0, 0, 0.05)"
            sx={sx}
            {...props}>
            {children}
        </Box>
    );
};

export default DBox;

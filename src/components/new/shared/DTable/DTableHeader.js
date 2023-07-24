import { Box, Typography } from '@mui/material';

const DTableHeader = ({ title, children }) => {
    return (
        <Box sx={wrapperStyles}>
            {/* Title */}
            {title && <Typography sx={titleStyles}>{title}</Typography>}

            {/* Actions */}
            {children && <Box sx={ationStyles}> {children}</Box>}
        </Box>
    );
};

const wrapperStyles = {
    marginBottom: '20px',
    display: 'flex',
};
const ationStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1, 
}
const titleStyles = {
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center'
};

export default DTableHeader;

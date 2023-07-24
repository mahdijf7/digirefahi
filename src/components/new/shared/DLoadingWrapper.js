import { Box, CircularProgress } from '@mui/material';

const DLoadingWrapper = ({ loading, sx, children }) => {
    return loading ? (
        <Box display="flex" justifyContent="center" sx={{ width: '100%', ...sx }}>
            <CircularProgress />
        </Box>
    ) : (
        children
    );
};

export default DLoadingWrapper;

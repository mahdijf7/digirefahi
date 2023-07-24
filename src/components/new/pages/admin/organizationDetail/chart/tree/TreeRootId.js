import { Box, Typography } from '@mui/material';

const TreeRootId = ({ id }) => {
    return (
        <Box
            sx={{
                padding: '0 8px',
                borderRadius: '5px',
                height: '24px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
            }}>
            <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>#{id}</Typography>
        </Box>
    );
};

export default TreeRootId;

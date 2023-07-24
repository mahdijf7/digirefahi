import { Box, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const DDialogHeader = ({ showCloseBtn = true, title, icon, onClose }) => {
    return (
        <Box sx={dialogHeaderStyles}>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '12px' }} fontSize="18px">
                {icon || ''} {title}
            </Typography>

            {showCloseBtn && (
                <Box mr="auto" display="flex">
                    <HighlightOffIcon fontSize="large" sx={{ color: '#147ec1', cursor: 'pointer' }} onClick={onClose} />
                </Box>
            )}
        </Box>
    );
};

const dialogHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
};

export default DDialogHeader;

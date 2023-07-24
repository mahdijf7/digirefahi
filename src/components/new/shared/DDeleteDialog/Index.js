import { Box, Divider, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';

const DDeleteDialog = ({ title, loading, onClose, onDelete }) => {
    return (
        <DDialogWrapper open strip size="sm" onClose={onClose} onClick={(e) => e.stopPropagation()}>
            <Box sx={wrapperStyles}>
                <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                    <Typography color="#E62929" sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        <WarningAmberIcon fontSize="large" />
                        حذف {title}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '18px',
                    }}>
                    <Typography fontSize="12px">آیا از حذف {title} اطمینان دارید؟</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px',
                        }}>
                        <Button
                            variant="outlined"
                            color="info"
                            sx={{ fontSize: '14px', width: '150px !important' }}
                            onClick={onClose}>
                            انصراف
                        </Button>
                        <LoadingButton
                            startIcon={<DeleteIcon sx={{ margin: '0 0 0 1rem' }} />}
                            variant="contained"
                            sx={{ fontSize: '14px', boxShadow: 'none', width: '150px !important' }}
                            color="error"
                            loading={loading}
                            onClick={onDelete}>
                            حذف
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </DDialogWrapper>
    );
};
const wrapperStyles = {
    borderRight: '8px solid #E62929',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 22px 16px 30px',
};
export default DDeleteDialog;

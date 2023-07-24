import { Box, Divider, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RejectAmberIcon from "../../../../assets/icone/svg/RejectReqIcon";
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import {ColorWhite} from "../../../../assets/theme/color";

const DRejectDialog = ({ title, loading, onClose, onReject }) => {
    return (
        <DDialogWrapper open strip size="sm" onClose={onClose} onClick={(e) => e.stopPropagation()}>
            <Box sx={wrapperStyles}>
                <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                    <Typography color="rgba(0, 0, 0, 1)" sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        <RejectAmberIcon fontSize="large" />
                        رد {title}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '18px',
                    }}>
                    <Typography fontSize="12px" color="rgba(0, 0, 0, 1)">آیا از رد {title} اطمینان دارید؟</Typography>
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
                            variant="contained"
                            sx={yellowButtonStyle}
                            color="error"
                            loading={loading}
                            onClick={onReject}>
                            رد درخواست
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </DDialogWrapper>
    );
};
const wrapperStyles = {
    borderRight: '8px solid #F7C906',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 22px 16px 30px',
};
const yellowButtonStyle = {
    width: '80%',
    height: '3.3rem',
    borderRaduis: '10px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontSize: '1.2rem',
    boxShadow: 'none !important',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(247, 201, 6, 1)',
        color: '#000',
    },
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};
export default DRejectDialog;

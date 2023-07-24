import { Box, Divider, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RejectAmberIcon from "../../../../assets/icone/svg/RejectReqIcon";
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import {ColorWhite} from "../../../../assets/theme/color";
import AcceptReqIcon from "../../../../assets/icone/svg/AcceptReqIcon";

const DAcceptDialog = ({ title, loading, onClose, onAccept }) => {
    return (
        <DDialogWrapper open strip size="sm" onClose={onClose} onClick={(e) => e.stopPropagation()}>
            <Box sx={wrapperStyles}>
                <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                    <Typography color="rgba(0, 0, 0, 1)" sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                        <AcceptReqIcon fontSize="large" />
                        تایید {title}
                    </Typography>
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '18px',
                    }}>
                    <Typography fontSize="12px" color="rgba(0, 0, 0, 1)">آیا از تایید {title} اطمینان دارید؟</Typography>
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
                            sx={blueBtnStyle}
                            color="error"
                            loading={loading}
                            onClick={onAccept}>
                            تایید درخواست
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </DDialogWrapper>
    );
};
const wrapperStyles = {
    borderRight: '8px solid #0877BD',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 22px 16px 30px',
};
const  blueBtnStyle = {
    padding: "4px 35px",
    backgroundColor:"rgba(8, 119, 189, 1)",
    border:"1px solid rgba(8, 119, 189, 1)",
    borderRadius:"5px",
    fontSize: 12,
    color: "#fff",
    textDecoration:"none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin:"0 5px",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor:"rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration:"none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor:"rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration:"none",
    },
};
export default DAcceptDialog;

import * as React from 'react';
import theme from 'assets/theme';
import DSnackbar from 'components/new/shared/DSnackbar';
import { Box, Divider, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import { ColorWhite } from '../../../../assets/theme/color';
import RejectAmberIcon from '../../../../assets/icone/svg/RejectReqIcon';
import adminService from 'service/api/adminService';

export default function RejectDialog({ commentId, onChange, refreshButton, disable }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState({ initial: true, refresh: false });
    const [color, setColor] = React.useState('theme.main.palette.secondary.main');
    const [snackBarData, setSnackBarData] = React.useState({
        show: false,
        data: {},
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
              <Button
                variant="outlined"
                sx={rejectButtonStyles}
                style={{ backgroundColor: disable ? '#fff' : '#f7c906' }}
                disabled={disable}
                onClick={handleClickOpen}>
                رد
            </Button>
            <DDialogWrapper open={open} strip size="sm" onClick={handleClickOpen} onClose={handleClose}>
                <Box sx={wrapperStyles}>
                    <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                        <Typography
                            color="rgba(0, 0, 0, 1)"
                            sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                            <RejectAmberIcon fontSize="large" />
                            رد
                        </Typography>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '18px',
                        }}>
                        <Typography fontSize="12px" color="rgba(0, 0, 0, 1)">
                            آیا از رد نظر اطمینان دارید؟
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                            }}>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                color="info"
                                sx={{ fontSize: '14px', width: '150px !important' }}>
                                انصراف
                            </Button>
                            <LoadingButton
                                onClick={async () => {
                                    await adminService
                                        .updateComment(commentId, 'REJECT')
                                        .then(() => {
                                            handleClose();
                                            setColor('white');
                                            refreshButton('disabled');
                                            setSnackBarData({
                                                show: true,
                                                data: {
                                                    text: 'نظر با موفقیت ثبت شد.',
                                                    type: 'success',
                                                },
                                            });
                                            onChange();
                                        })
                                        .catch(() => {});
                                }}
                                autoFocus
                                sx={blueBtnStyle}
                                type="button">
                                رد نظر
                            </LoadingButton>
                        </Box>
                    </Box>
                </Box>
            </DDialogWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
}

const rejectButtonStyles = {
    gap: '10px',
    width: '58px',
    height: '35px',
    borderRadius: '.5rem',
    fontSize: '1rem',
    color: theme.main.palette.common.black,
    border: '1px solid #f7c906',
};

const wrapperStyles = {
    borderRight: '8px solid #f7c906',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 22px 16px 30px',
};
const blueBtnStyle = {
    padding: '4px 35px',
    backgroundColor: '#f7c906',
    border: '1px solid #f7c906',
    borderRadius: '5px',
    fontSize: 12,
    color: '#fff',
    textDecoration: 'none',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: '0 5px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: '#f7c906',
        color: '#fff',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: '#f7c906',
        color: '#fff',
        textDecoration: 'none',
    },
};

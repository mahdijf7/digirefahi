import * as React from 'react';
import theme from 'assets/theme';
import DSnackbar from 'components/new/shared/DSnackbar';
import { Box, Divider, Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import { ColorWhite } from '../../../../assets/theme/color';
import AcceptReqIcon from '../../../../assets/icone/svg/AcceptReqIcon';
import adminService from 'service/api/adminService';

export default function AcceptDialog({ commentId, onChange, refreshButton, disable }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState({ initial: true, refresh: false });
    const [color, setColor] = React.useState('#0877BD');
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
                sx={acceptButtonStyles}
                style={{ backgroundColor: disable ? '#fff' : '#0877BD' }}
                disabled={disable}
                onClick={handleClickOpen}>
                تایید
            </Button>
            <DDialogWrapper open={open} strip size="sm" onClick={handleClickOpen} onClose={handleClose}>
                <Box sx={wrapperStyles}>
                    <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
                        <Typography
                            color="rgba(0, 0, 0, 1)"
                            sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                            <AcceptReqIcon fontSize="large" />
                            تایید
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
                            آیا از تایید نظر اطمینان دارید؟
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
                                        .updateComment(commentId, 'ACCEPT')
                                        .then(() => {
                                            onChange();
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
                                        })
                                        .catch(() => {});
                                }}
                                autoFocus
                                sx={blueBtnStyle}
                                type="button">
                                تایید نظر
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

const acceptButtonStyles = {
    gap: '10px',
    width: '58px',
    height: '35px',
    borderRadius: '.5rem',
    fontSize: '1rem',
    color: theme.main.palette.common.black,
};

const wrapperStyles = {
    borderRight: '8px solid #0877BD',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 22px 16px 30px',
};
const blueBtnStyle = {
    padding: '4px 35px',
    backgroundColor: 'rgba(8, 119, 189, 1)',
    border: '1px solid rgba(8, 119, 189, 1)',
    borderRadius: '5px',
    fontSize: 12,
    color: '#fff',
    textDecoration: 'none',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: '0 5px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
};

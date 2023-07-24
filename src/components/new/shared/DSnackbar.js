import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const DSnackbar = ({ open, info, onClose }) => {
    const closeAlert = (event, reason) => {
        if (reason == 'clickaway') return;
        onClose();
    };

    const CssAlert = styled(Alert)(({}) => ({
        '& .MuiAlert-icon': {
            margin: localStorage.getItem('lang') === 'fa' ? '0 0 0 12px' : '0 12px 0 0',
        },
        '& .MuiAlert-message .MuiTypography-root': {
            marginBottom: 0,
        },
    }));

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            open={open}
            onClose={closeAlert}>
            <CssAlert severity={info?.type || 'error'} variant="filled">
                <AlertTitle>{info?.title}</AlertTitle>
                {info?.text}
            </CssAlert>
        </Snackbar>
    );
};

export default DSnackbar;

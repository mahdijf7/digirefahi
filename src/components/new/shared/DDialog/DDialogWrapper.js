import { Box, Dialog, DialogContent } from '@mui/material';

const DDialogWrapper = ({ children, open, onClose, strip = false, bodyStyles = {}, size = 'md' }) => {
    const dialogWrapperStyles = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={'body'}
            fullWidth={true}
            maxWidth={size}
            dir="rtl"
            PaperProps={{
                sx: {
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: strip ? '10px' : '14px',
                },
            }}>
            <DialogContent sx={{ padding: 0 }}>
                <Box sx={{ ...dialogWrapperStyles, padding: strip ? '0px' : '28px 32px 60px 32px', ...bodyStyles }}>
                    {children}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DDialogWrapper;

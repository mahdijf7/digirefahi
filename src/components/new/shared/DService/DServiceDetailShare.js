import { Box, Button, Icon, Grid, Typography, TextField } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSearchParams } from 'react-router-dom';

const DServiceDetailShare = ({ onUrlCopied }) => {
    const [searchParams] = useSearchParams();

    const copyHandler = () => {
        navigator.clipboard.writeText(
            window.location.href + `${searchParams.get('order_id') ? '&' : '?'}redirect_after_login=true`
        );
        onUrlCopied();
    };
    return (
        <Box sx={{ borderTop: '1px solid #EEEEEE', p: '16px 0', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography fontSize="14px" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShareOutlinedIcon />
                اشتراک گذاری:
            </Typography>
            <Box
                bgcolor="rgba(238, 238, 238, 0.6)"
                sx={{
                    borderRadius: '5px',
                    border: '1px solid rgba(238, 238, 238, 1)',
                    p: '4px 4px 4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    mr: 'auto',
                    gap: '20px',
                }}>
                <Button variant="contained" size="large" sx={{ minWidth: '46px', p: '8px 0' }} onClick={copyHandler}>
                    <ContentCopyOutlinedIcon sx={{ color: 'common.white' }} />
                </Button>
                <Typography fontSize="12px" color="rgba(140, 140, 140, 1)">
                    {window.location.href}
                </Typography>
            </Box>
        </Box>
    );
};

export { DServiceDetailShare };

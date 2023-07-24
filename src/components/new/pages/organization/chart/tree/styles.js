import { Checkbox, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

export const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    padding: 0,
    fontSize: '16px',
    marginLeft: '10px',
}));
export const StyledBox = styled(Box)(({ theme }) => ({
    color: theme.palette.brandGray.main,
    '& svg': {
        fontSize: '14px',
    },
}));
export const StyledRootBox = styled(Box)(({ theme, isChecked }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: isChecked ? theme.palette.primary.light : theme.palette.info.input ,
    height: '46px',
    borderRadius: '8px',
    borderRight: `8px solid ${theme.palette.primary.main}`,
    padding: '0px 16px',
    '&:hover': {
        backgroundColor: isChecked ? theme.palette.primary.light : theme.palette.info.input,
    },
}));
export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-input ': {
        padding: '5px 8px',
        backgroundColor: 'transparent',
        fontSize: '12px',
        fontWeight: 600,
    },
}));
export const StyledButton = styled(LoadingButton)(({ theme }) => ({
    gap: '5px',
    fontSize: '12px',
    fontWeight: 600,
    padding: '3px 0',
    minWidth: 'auto',
    '& .MuiButton-startIcon ': {
        margin: 0,
    },
}));

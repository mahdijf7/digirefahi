import { Box, List, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import theme from 'assets/theme';

const lang = localStorage.getItem('lang');

const rightSideBorderForItems = {
    position: 'relative',
    '&:before': {
        content: `''`,
        position: 'absolute',
        bottom: '50%',
        right: 0,
        borderRight: `1px solid ${theme.main.palette.info.border}`,
        borderBottom: `1px solid ${theme.main.palette.info.border}`,
        height: '25px',
        width: '26px',
        borderRadius: '0px 0px 10px 0',
        zIndex: 4,
    },
};

export const StyledList = styled(List)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',

    '& .MuiButtonBase-root.MuiListItemButton-root': {
        paddingRight: '26px',
        ...rightSideBorderForItems,
    },
}));
export const StyledAddBox = styled(Box)(({ theme }) => ({
    paddingRight: '34px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...rightSideBorderForItems,
}));
export const StyledCategoryHeaderBox = styled(Box)(({ theme, color }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.palette.info.input,
    height: '46px',
    borderRadius: '8px',
    borderRight: `8px solid ${color}`,
    padding: '0px 16px',
    '&:hover': {
        backgroundColor: theme.palette.info.input,
    },
}));
export const StyledCategoryHeaderButton = styled(LoadingButton)(({ theme, buttonColor }) => ({
    color: `${buttonColor} !important`,
    gap: '5px',
    fontSize: '12px',
    fontWeight: 600,
    padding: '3px 0',
    minWidth: 'auto',
    '& .MuiButton-startIcon ': {
        margin: 0,
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

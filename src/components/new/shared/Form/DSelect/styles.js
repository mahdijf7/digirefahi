import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles'; 
const lang = localStorage.getItem('lang');

export const StyledSelect = styled(Select)(({ theme, ownerState }) => ({
    '&.MuiInputBase-root': {
        backgroundColor: '#fff',
        borderRadius: '6px',
        '&>svg':{
            display: 'none'
        },
        '& .MuiSelect-select': {
            minHeight: 'auto',
            padding: '0 22px',
            height: '36px'
        },
    },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme, ownerState }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    direction: lang === 'fa' ? 'rtl' : 'ltr',
    height: '38px',
    borderBottom: '1px solid #D9D9D9',
    margin: '0 10px',
    '&:last-of-type': {
        borderBottom: 'none',
    },

    '&.Mui-selected': {
        color: '#0877BD',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

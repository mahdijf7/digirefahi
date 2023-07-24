import Select from '@mui/material/Select';
import Popper from '@mui/material/Popper';
import InputBase from '@mui/material/InputBase';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

import { autocompleteClasses } from '@mui/material/Autocomplete';
const lang = localStorage.getItem('lang');

export const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    margin: '4px 0 0 0 ',
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        // margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: '#fff',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            direction: lang === 'fa' ? 'rtl' : 'ltr',
            textAlign: lang === 'fa' ? 'right' : 'left',
            height: '38px',
            borderBottom: '1px solid #D9D9D9',
            margin: '0 10px',
            '&:last-of-type': {
                borderBottom: 'none',
            },
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]: {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
    [`& .${autocompleteClasses.noOptions}`]: {
        direction: lang === 'fa' ? 'rtl !important' : 'ltr',
        textAlign: lang === 'fa' ? 'right !important' : 'left',
        padding: '8px 10px',
    },
    [`& .${autocompleteClasses.option}`]: {
        '&[aria-selected="true"]': {
            color: '#0877BD',
            backgroundColor: 'transparent !important',
            '&:hover': {
                backgroundColor: 'transparent !important',
            },
        },
    },
}));
export const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'}`,
    borderRadius: 6,
    margin: '4px 0 !important',
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
    '& input': {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: ' 0 10px',
        height: '30px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 12,
        direction: lang === 'fa' ? 'rtl' : 'ltr',
        textAlign: lang === 'fa' ? 'right' : 'left',
        '&:focus': {
            borderColor: '#000',
        },
    },
}));

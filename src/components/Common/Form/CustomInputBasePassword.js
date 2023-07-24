import { IconButton, InputAdornment, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useField } from 'formik';
import { useState } from 'react';
import CustomLable from './CustomLable';

const CustomInputBasePassword = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);
    const [visibility, setVisibility] = useState(true);
    const { showlabel, placeholder, icon, title } = otherProps;
    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',
        type: visibility ? 'password' : 'text',
    };
    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    const handleClick = () => {
        setVisibility(!visibility);
    };

    const inputIcone = icon && (
        <InputAdornment style={iconStyle} position="start">
            <Box sx={{ borderRadius: boxStyle }} bgcolor="primary.mainLight" className="inputIcone">
                {icon}
            </Box>
        </InputAdornment>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id={name} name={title || placeholder} />}

            <TextFieldCustom
                position="relative"
                FormHelperTextProps={{
                    style: {
                        fontSize: '1.2rem',
                        position: 'absolute',
                        top: 'calc(100% +  2px)',
                        left: 0,
                        margin: 0,
                    },
                }}
                InputProps={{
                    startAdornment: inputIcone,
                    style: {
                        borderRadius: '.5rem',
                        height: '4rem',
                        ...otherProps,
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClick}>
                                {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                {...configTextField}
            />
        </Box>
    );
};

const TextFieldCustom = styled(TextField)(({ theme }) => ({
    width: '100% !important',
    '& input': {
        '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0px 100rem ${theme.palette.background.default} inset !important`,
        },
    },
    '& .MuiInput-root:before': {
        borderBottom: `solid ${theme.palette.primary.main} 1px `,
    },
    '& input::placeholder': {
        [theme.breakpoints.down('md')]: {},
        fontSize: '1.2rem',
        paddingBottom: '.5rem',
    },
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
}));

const lang = localStorage.getItem('lang');
const iconStyle = { marginRight: '-1.5rem', marginLeft: '3rem' };

const boxStyle = '0 .4rem .4rem 0';

export default CustomInputBasePassword;

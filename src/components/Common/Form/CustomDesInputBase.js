import { TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import { Box, InputAdornment } from '@mui/material';
import CustomLable from './CustomLable';

import theme from 'assets/theme';

const CustomDesInputBase = ({ name, hasDefaultStyle = false, inputProps, ...otherProps }) => {
    const [field, meta] = useField(name);
    const { showlabel, placeholder, icon, title, weight } = otherProps;
    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',
    };
    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    const inputIcone = icon && (
        <InputAdornment style={{ ...iconStyle, display: 'flex' }} position="start">
            <Box sx={{ borderRadius: boxStyle }} bgcolor="primary.mainLight" className="inputIcone">
                {icon}
            </Box>
        </InputAdornment>
    );

    const defaultStyles = hasDefaultStyle ? inputStyle : {};

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id={name} weight={weight} name={title} />}

            <TextFieldCustom
                FormHelperTextProps={{
                    style: {
                        fontSize: '12px',
                        position: 'absolute',
                        top: 'calc(100% +  2px)',
                        zIndex: '100',
                        left: 0,
                        margin: 0,
                        ...otherProps.sx?.helper,
                    },
                }}
                InputProps={{
                    startAdornment: inputIcone,
                    style: {
                        borderRadius: '.5rem',
                        height: '4rem',
                        ...otherProps,
                    },
                    ...inputProps,
                }}
                {...configTextField}
                sx={{ ...otherProps.sx, ...defaultStyles }}
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
}));

const inputStyle = {
    backgroundColor: "#fff",
    borderRadius: '6px !important',
    '& .MuiOutlinedInput-root': {
        height: '80px !important',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `1px dashed #D9D9D9 `,
        },
        '& .MuiInputBase-input': {
            height: '80px !important',
            padding: '0 14px !important',
            '&:hover': {
                border: `1px dashed #D9D9D9 `,
            }
        },
    },

};

const lang = localStorage.getItem('lang');
const iconStyle = lang === 'fa' ? { marginRight: '0', marginLeft: '1.5rem' } : { marginRight: '3rem', marginLeft: '-1.4rem' };
const boxStyle = lang === 'fa' ? '0 .4rem .4rem 0' : '.4rem 0 0 .4rem';

export default CustomDesInputBase;

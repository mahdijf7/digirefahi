import { TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import { Box, InputAdornment } from '@mui/material';
import CustomLable from './CustomLable';

import theme from 'assets/theme';

const CustomInputBase = ({
    name,
    hasDefaultStyle = false,
    wrapperSx = {},
    inputProps,
    inputProvidedProps = {},
    weight = false,
    ...otherProps
}) => {
    const [field, meta] = useField(name);
    const { showlabel, placeholder, icon, title } = otherProps;
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...wrapperSx }}>
            {showlabel && <CustomLable id={name} weight={!!weight} name={title || placeholder} />}

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
                {...inputProvidedProps}
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
    backgroundColor: theme.main.palette.info.input,
    borderRadius: '.8rem !important',
    '& .MuiOutlinedInput-root': {
        height: '42px !important',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.main.palette.info.border} `,
        },
        '& .MuiInputBase-input': {
            height: '42px !important',
            padding: '0 14px !important',
        },
    },
};

const iconStyle = { marginRight: '0', marginLeft: '1.5rem' };
const boxStyle = '0 .4rem .4rem 0';

export default CustomInputBase;

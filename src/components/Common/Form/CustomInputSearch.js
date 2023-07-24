import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
import CustomLable from './CustomLable';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const CustomInputSearch = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);
    const { showlabel, placeholder, title, sx } = otherProps;
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id={name} name={title || placeholder} />}
            <TextFieldCustom
                id={name}
                name={name}
                FormHelperTextProps={{
                    style: {
                        marginBottom: '-1.5rem',
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon fontSize='large' />
                        </IconButton>
                    ),
                    style: {
                        borderRadius: '.5rem',
                        height: '4rem',
                        ...sx,
                    },
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
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.default} inset !important`,
        },
    },
    '& .MuiInput-root:before': {
        borderBottom: `solid ${theme.palette.primary.main} 1px `,
    },
    '& input::placeholder': {
        [theme.breakpoints.down('md')]: {
            fontSize: '.8rem',
        },
        fontSize: '1.2rem',
        paddingBottom: '.5rem',
    },
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
}));

export default CustomInputSearch;

import { TextField, Box } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';

import CustomLable from './CustomLable'; 

const CustomInputNumber = ({ name, sx, ...otherProps }) => {
    const { showlabel, placeholder, title, weight, price } = otherProps;
    const [field, meta, helpers] = useField(name);

    const handleChange = (event) => {
        const { value } = event.target;

        const newValue = value.replace(/[^0-9]/g, '');
        helpers.setValue(newValue);
        if (value !== newValue) {
            // Display an error if non-numeric characters were entered
            helpers.setError('لطفا عدد وارد کنید');
        } else {
            // Clear the error if the input is valid
            helpers.setError(null);
        }
    };

    const configTextField = {
        ...field,
        fullWidth: true,
        variant: 'outlined',
        type: 'number',
        ...otherProps,
        inputProps: {
            min: 0,
        },
        onChange: handleChange, // Add the onChange handler
    };

    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id={name} weight={weight} name={title || placeholder} />}

            <TextFieldCustom
                FormHelperTextProps={{
                    style: {
                        fontSize: '1.2rem',
                        position: 'absolute',
                        top: 'calc(100% +  2px)',
                        zIndex: '100',
                        left: 0,
                        margin: 0,
                        ...otherProps.sx?.helper,
                    },
                }}
                InputProps={{
                    style: {
                        flexDirection: 'row-reverse',
                    },
                }}
                {...configTextField}
                sx={sx}
            />
        </Box>
    );
};

export default CustomInputNumber;

const TextFieldCustom = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        height: '2.8rem',
        color: ` ${theme.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.palette.info.border} `,
        },
    },
}));

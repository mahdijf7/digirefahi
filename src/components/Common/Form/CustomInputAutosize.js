import React from 'react';
import { TextareaAutosize } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import CustomLable from './CustomLable';
let error;
function CustomInputAutosize({ name, ...otherProps }) {
    const { showlabel, placeholder, title } = otherProps;
    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
    };

    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    error = meta.touched && meta.error;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {showlabel && <CustomLable id={name} name={title || placeholder} />}
            <CustomTextareaAutosize aria-label="minimum height" {...otherProps} {...configTextField} />
            {meta.touched && meta.error && (
                <Box sx={{ color: '#d32f2f', fontSize: '1.2rem', textAlign: 'left', ...otherProps.sx?.helper }}>{meta.error}</Box>
            )}
        </Box>
    );
}

export default CustomInputAutosize;
const CustomTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
    width: '100% !important',
    borderRadius: '.5rem',
    border: `.1rem solid ${theme.palette.text.main}`,
    borderColor: error ? '#d32f2f !important' : theme.palette.text.main,
    direction: 'rtl',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: '1.2rem',
    padding: '.5rem',
    overflow: 'hidden',

    '&:focus': {
        outlineColor: `${theme.palette.primary.main} !important`,
    },

    '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: theme.palette.background.lightDark,
    },
}));

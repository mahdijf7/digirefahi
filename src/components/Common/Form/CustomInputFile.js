import * as React from 'react';
import { useField } from 'formik';
import { Box, Button, TextField } from '@mui/material';

import CustomLable from './CustomLable';

const CustomInputDocument = ({
    sx,
    name,
    accept,
    children,
    showlabel,
    weight,
    title,
    onSelect,
    placeholder,
    fileName,
    bg,
    ...props
}) => {
    const [field, meta, helpers] = useField(name);
    const fileInputRef = React.useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const configTextField = {
        ...field,
        ...props,
    };
    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    const handleInputChange = (event) => {
        const files = event.currentTarget.files;
        // const currentValue = field.value;

        // if (Array.isArray(currentValue)) {
        //     const updatedFiles = [...currentValue, ...Array.from(files)]; // Append new files to the existing array
        //     helpers.setValue(updatedFiles);
        //     onSelect(updatedFiles);
        // } else if (currentValue) {
        //     const updatedFiles = [currentValue, ...Array.from(files)]; // Convert single file to an array and append new files
        //     helpers.setValue(updatedFiles);
        //     onSelect(updatedFiles);
        // } else {
        helpers.setValue(files[0]); // Store single file as a single value
        onSelect(files[0]);
        // }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {showlabel && <CustomLable id={name} weight={!!weight} name={title || placeholder} />}
            <Box
                sx={{
                    ...simInputStyle,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'baseline',
                    justifyContent: 'flex-end',
                    backgroundColor: bg,
                }}>
                <p style={fileNameStyle}>{fileName}</p>
                <TextField
                    type="text"
                    value={field.value ? field.value.name : ''}
                    placeholder={placeholder}
                    disabled
                    FormHelperTextProps={{
                        style: {
                            fontSize: '1.2rem',
                            position: 'absolute',
                            top: 'calc(100% +  2px)',
                            zIndex: '100',
                            left: 0,
                            margin: 0,
                            ...sx?.helper,
                        },
                    }}
                    InputProps={{
                        style: {
                            display: 'none',
                            borderRadius: '.5rem',
                            height: '4rem',
                            ...props,
                        },
                        ...props,
                    }}
                    {...configTextField}
                />
                <input ref={fileInputRef} type="file" accept={accept} onChange={handleInputChange} style={{ display: 'none' }} />
                <Button sx={sx} type="button" onClick={handleButtonClick} {...props}>
                    {children}
                </Button>
            </Box>
        </Box>
    );
};
const simInputStyle = {
    textAlign: 'right',
    fontWeight: 400,
    width: '100%',
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    border: `.1rem solid rgba(209, 209, 214, 1)`,
    height: '4.2rem',
    borderRadius: '.8rem',
};
const fileNameStyle = {
    color: '#000',
    fontWeight: 300,
    fontSize: '13px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    marginRight: 15,
};
export default CustomInputDocument;

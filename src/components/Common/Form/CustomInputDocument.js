import * as React from 'react';
import { useField } from 'formik';
import { Button, Box, TextField } from '@mui/material';

import CustomLable from './CustomLable';

const CustomInputDocument = ({ sx, name, accept, children, showlabel, weight, title, onSelect, ...props }) => {
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
        const files = event.currentTarget.files[0];

        helpers.setValue(files);
        onSelect(files);
        // fileInputRef.current.value = '';
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id={name} weight={weight} name={title} />}
            <TextField
                type="text"
                value={field.value ? field.value.name : ''}
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
    );
};

export default CustomInputDocument;
